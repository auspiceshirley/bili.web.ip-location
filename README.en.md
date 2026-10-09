# Bilibili IP Location

A browser script for displaying the IP location of users in the comment section of the Bilibili web version.

[简体中文](README.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [English](README.en.md)

## Principle

The comment section on the Bilibili web version does not lack IP locations; they are simply not displayed on the page. What this script does is retrieve the data and then display it in an appropriate location.

## Usage

1. Install a script manager such as Tampermonkey or Violentmonkey;
2. Click the installation link to jump to the script manager's userscript installation page;

- [Install from Greasy Fork](https://greasyfork.org/scripts/599408)
- [Install from Github Release](https://github.com/auspiceshirley/bili.web.ip-location/releases/latest/download/bili.web.ip-location.js)

3. Install the script, then refresh the Bilibili website page that has a comment section.

## Features

As the name suggests, this script is used to display the IP location of comment users in the comment section of the Bilibili web version.

In addition to the original webpage for users in mainland China (https://www.bilibili.com), this script also works on the international version of the webpage. Below are all supported language versions <del><i>(in fact, these are just Bilibili's existing language options)</del></i>:

|     Language     |             Homepage              |
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

## Limitations

1. Comments made before the IP location feature was launched did not contain IP information in the first place, so they naturally cannot be displayed;

2. The personal space (space.bilibili.com) webpage data interface does not provide the user's IP location information, so it cannot be displayed;

3. This script is written based on the existing webpage structure. When the names and structures of Bilibili's webpage components change, the script's functionality may become ineffective.
