// ==UserScript==
// @name         Bilibili IP Location
// @name:zh-TW   Bilibili IP Location
// @name:ja      Bilibili IP Location
// @name:en      Bilibili IP Location
// @namespace    bili.web.ip-location
// @version      1.0.0
// @author       Shirley Auspice
// @license      MIT
// @description  一个用于显示网页版哔哩哔哩评论区用户 IP 归属地的浏览器脚本。
// @description:zh-TW  一個用於顯示網頁版嗶哩嗶哩評論區用戶 IP 歸屬地的瀏覽器腳本。
// @description:ja  ウェブ版ビリビリのコメント欄にユーザーの IP 所在地を表示するためのブラウザスクリプトです。
// @description:en  A browser script for displaying the IP locations of users in the comment section of the Bilibili web version.
// @icon         https://www.bilibili.com/favicon.ico
// @match        https://www.bilibili.com/*
// @match        https://t.bilibili.com/*
// @match        https://live.bilibili.com/*
// @match        https://manga.bilibili.com/*
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const page = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;
  const LANG_SEGMENTS = new Set([
    "zh-Hans",
    "zh-Hant",
    "en",
    "ja",
    "th",
    "ar",
    "pt",
    "es",
    "id",
    "ms",
    "ru",
    "tr",
    "vi",
  ]);

  function pageKey(href) {
    const url = new URL(href, page.location.href);
    const parts = url.pathname.split("/").filter(Boolean);
    if (LANG_SEGMENTS.has(parts[0])) parts.shift();
    return `${url.origin}/${parts.join("/")}`;
  }

  function locationOf(reply) {
    const text = reply && reply.reply_control && reply.reply_control.location;
    return typeof text === "string" ? text.trim() : "";
  }

  function paintComment(host) {
    const root = host.shadowRoot;
    if (!root) return;
    const pubdate = root.querySelector("#pubdate");
    if (!pubdate) return;
    let node = root.querySelector("#location");
    const text = locationOf(host.data);
    if (!text) {
      if (node) node.remove();
      return;
    }
    if (node) {
      node.textContent = text;
      return;
    }
    node = document.createElement("div");
    node.id = "location";
    node.textContent = text;
    pubdate.insertAdjacentElement("afterend", node);
  }

  function patchActionButtons(Ctor) {
    if (
      !Ctor ||
      typeof Ctor !== "function" ||
      !Ctor.prototype ||
      Ctor.prototype.__ipPatched
    )
      return Ctor;
    const update = Ctor.prototype.update;
    if (typeof update !== "function") return Ctor;
    Ctor.prototype.update = new Proxy(update, {
      apply(target, thisArg, args) {
        const result = Reflect.apply(target, thisArg, args);
        try {
          paintComment(thisArg);
        } catch (_) {}
        return result;
      },
    });
    Ctor.prototype.__ipPatched = true;
    return Ctor;
  }

  function hookCommentComponent() {
    const registry = page.customElements;
    if (!registry || registry.__ipPatched) return;
    registry.__ipPatched = true;
    const existing = registry.get("bili-comment-action-buttons-renderer");
    if (existing) patchActionButtons(existing);
    const define = registry.define;
    registry.define = new Proxy(define, {
      apply(target, thisArg, args) {
        const [name, ctor, ...rest] = args;
        if (
          name === "bili-comment-action-buttons-renderer" &&
          typeof ctor === "function"
        ) {
          return Reflect.apply(target, thisArg, [
            name,
            patchActionButtons(ctor),
            ...rest,
          ]);
        }
        return Reflect.apply(target, thisArg, args);
      },
    });
  }

  function patchLegacy(Ctor, variation) {
    if (!Ctor || !Ctor.prototype || Ctor.prototype.__ipPatched) return;
    ["_createListCon", "_createSubReplyItem"].forEach((method) => {
      const original = Ctor.prototype[method];
      if (typeof original !== "function") return;
      Ctor.prototype[method] = new Proxy(original, {
        apply(target, thisArg, args) {
          const result = Reflect.apply(target, thisArg, args);
          const text = locationOf(args[0]);
          if (
            !text ||
            typeof result !== "string" ||
            result.includes('id="location"')
          )
            return result;
          if (variation) {
            return result.replace(
              /<span class="time">(.*?)<\/span>/,
              `<span class="time">$1&nbsp;&nbsp;${text}</span>`,
            );
          }
          return result.replace(
            /<span class="reply-time">(.*?)<\/span>/,
            `<span class="reply-time">$1</span><span class="reply-location" id="location">${text}</span>`,
          );
        },
      });
    });
    Ctor.prototype.__ipPatched = true;
  }

  function hookLegacy(variation) {
    if (page.bbComment) {
      patchLegacy(page.bbComment, variation);
      return;
    }
    let current;
    Object.defineProperty(page, "bbComment", {
      configurable: true,
      get() {
        return current;
      },
      set(value) {
        current = value;
        patchLegacy(value, variation);
      },
    });
  }

  function waitFor(selector) {
    const found = document.querySelector(selector);
    if (found) return Promise.resolve(found);
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const node = document.querySelector(selector);
        if (!node) return;
        observer.disconnect();
        resolve(node);
      });
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    });
  }

  async function articleLocation(cv) {
    try {
      const payload = await (
        await page.fetch(
          `https://api.bilibili.com/x/article/viewinfo?id=${cv}`,
          {
            credentials: "include",
          },
        )
      ).json();
      return payload && payload.data && payload.data.location;
    } catch (_) {
      return "";
    }
  }

  async function paintOpus(state) {
    const basic = state && state.detail && state.detail.basic;
    if (!basic || !basic.rid_str || basic.article_type !== 0) return;
    const text = await articleLocation(basic.rid_str);
    if (!text) return;
    const authorPub = await waitFor(".opus-module-author__pub");
    if (!authorPub || authorPub.querySelector("#location")) return;
    const node = document.createElement("span");
    node.id = "location";
    node.innerHTML = `${text} &middot;&nbsp;`;
    authorPub.insertAdjacentElement("afterbegin", node);
  }

  async function paintArticle(href) {
    const match = pageKey(href).match(/\/cv(\d+)/);
    const cv = match && match[1];
    if (!cv) {
      if (page.__INITIAL_STATE__) {
        paintOpus(page.__INITIAL_STATE__);
        return;
      }
      let state;
      Object.defineProperty(page, "__INITIAL_STATE__", {
        configurable: true,
        get() {
          return state;
        },
        set(value) {
          state = value;
          paintOpus(state);
        },
      });
      return;
    }
    const text = await articleLocation(cv);
    if (!text) return;
    const publish = (await waitFor(".article-detail"))?.querySelector(
      ".publish-text",
    );
    if (!publish || publish.parentElement?.querySelector("#location")) return;
    const node = document.createElement("span");
    node.id = "location";
    node.textContent = `${text} · `;
    publish.insertAdjacentElement("afterend", node);
  }

  function route(href) {
    const key = pageKey(href);
    const litPages = [
      "https://www.bilibili.com/video/",
      "https://www.bilibili.com/list/",
      "https://www.bilibili.com/bangumi/play/",
      "https://www.bilibili.com/cheese/play/",
      "https://www.bilibili.com/v/topic/detail",
      "https://manga.bilibili.com/detail/",
      "https://www.bilibili.com/festival/",
      "https://live.bilibili.com/",
      "https://t.bilibili.com/",
      "https://www.bilibili.com/opus/",
      "https://www.bilibili.com/read/",
    ];
    if (litPages.some((prefix) => key.startsWith(prefix)))
      hookCommentComponent();
    if (key.startsWith("https://www.bilibili.com/blackboard/feed-topic.html"))
      hookLegacy(false);
    else if (key.startsWith("https://www.bilibili.com/blackboard/"))
      hookLegacy(true);
    else if (key.startsWith("https://www.bilibili.com/blackroom/ban/"))
      hookLegacy(true);
    if (
      key.startsWith("https://www.bilibili.com/read/") ||
      key.startsWith("https://www.bilibili.com/opus/")
    ) {
      paintArticle(href);
    }
  }

  hookCommentComponent();
  route(page.location.href);
})();
