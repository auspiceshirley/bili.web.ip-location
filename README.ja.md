# Bilibili IP Location

ウェブ版ビリビリのコメント欄にユーザーの IP 所在地を表示するためのブラウザスクリプトです。

[简体中文](README.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [English](README.en.md)

## 原理

ビリビリのウェブ版コメント欄に IP 所在地がないわけではなく、ページ上に表示されていないだけです。このスクリプトが行うことは、データを取得し、適切な位置にデータを表示することです。

## 使い方

1. Tampermonkey、Violentmonkey などのスクリプトマネージャーをインストールします；
2. インストールリンクをクリックして、スクリプトマネージャーのユーザースクリプトインストール画面に移動します；

- [Greasy Fork からインストール](https://greasyfork.org/scripts/599408)
- [Github Release からインストール](https://github.com/auspiceshirley/bili.web.ip-location/releases/latest/download/bili.web.ip-location.js)

3. スクリプトをインストールし、コメント欄があるビリビリのウェブサイトページを更新します。

## 機能

名前の通り、このスクリプトはビリビリのウェブ版コメント欄にコメントユーザーの IP 所在地を表示するためのものです。

中国大陸向けのオリジナルページ（https://www.bilibili.com）以外に、本スクリプトは国際版のページでも動作します。以下は対応しているすべての言語バージョンです<del><i>（実際にはこれはビリビリの既存の言語オプションです）</del></i>：

|       言語       |              ホーム               |
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

## 制限

1. IP 所在地機能が導入される前のコメントには、そもそも IP 情報が含まれていないため、当然表示できません；

2. 個人スペース（space.bilibili.com）のウェブデータインターフェースは、そのユーザーの IP 所在地情報を提供していないため、表示できません；

3. 本スクリプトは既存のウェブ構造に基づいて作成されているため、ビリビリのウェブコンポーネントの名称や構造が変更された場合、スクリプトの機能が失效する可能性があります。
