# Bilibili IP Location

一個用於顯示網頁版嗶哩嗶哩評論區用戶 IP 歸屬地的瀏覽器腳本。

[简体中文](README.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [English](README.en.md)

## 原理

嗶哩嗶哩網頁端的評論區不是沒有 IP 歸屬地，只是在頁面上沒有顯示出來，這個腳本所做的事情就是取得資料，然後在合適的位置顯示資料。

## 用法

1. 安裝 Tampermonkey、Violentmonkey 等腳本管理器；
2. 點擊安裝連結跳轉到腳本管理器的使用者腳本安裝介面；

- [從 Greasy Fork 安裝](https://greasyfork.org/scripts/599408)
- [從 Github Release 安裝](https://github.com/auspiceshirley/bili.web.ip-location/releases/latest/download/bili.web.ip-location.js)

3. 安裝腳本，然後重新整理帶有評論區的嗶哩嗶哩網站頁面。

## 功能

顧名思義，這個腳本就是用於在嗶哩嗶哩網頁版評論區顯示評論用戶的 IP 歸屬地的

除了面向中國大陸用戶的原版網頁（https://www.bilibili.com）外，本腳本還可在國際版的網頁上生效，以下是所有支援的語言版本<del><i>（其實這就是嗶哩嗶哩現有的語言選項）</del></i>：

|       語言       |               首頁                |
| :--------------: | :-------------------------------: |
|     简体中文     | https://www.bilibili.com/zh-Hans/ |
|     繁體中文     | https://www.bilibili.com/zh-Hant/ |
|     English      |   https://www.bilibili.com/en/    |
|      日本語      |   https://www.bilibili.com/ja/    |
|     ภาษาไทย      |   https://www.bilibili.com/th/    |
|     العربية      |   https://www.bilibili.com/ar/    |
|    Português     |   https://www.bilibili.com/pt/    |
|     Español      |   https://www.bilibili.com/es/    |
| Bahasa Indonesia |   https://www.bilibili.com/id/    |
|  Bahasa Melayu   |   https://www.bilibili.com/ms/    |
|     Русский      |   https://www.bilibili.com/ru/    |
|      Türkçe      |   https://www.bilibili.com/tr/    |
|    Tiếng Việt    |   https://www.bilibili.com/vi/    |

## 局限

1. 在 IP 歸屬地功能上線前的評論，本來就不帶有 IP 資訊，當然無法顯示；

2. 個人空間（space.bilibili.com）網頁資料介面不提供該用戶的 IP 屬地資訊，故而無法顯示；

3. 本腳本依據現有的網頁結構編寫，當嗶哩嗶哩網頁組件名稱和結構發生變化時，腳本功能可能會失效。
