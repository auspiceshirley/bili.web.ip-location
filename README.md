# Bilibili IP Location

一个用于显示网页版哔哩哔哩评论区用户 IP 归属地的浏览器脚本。

[简体中文](README.md) | [繁體中文](README.zh-Hant.md) | [日本語](README.ja.md) | [English](README.en.md)

## 原理

哔哩哔哩网页端的评论区不是没有 IP 归属地，只是在页面上没有显示出来，这个脚本所做的事情就是获取数据，然后在合适的位置显示数据。

## 用法

1. 安装 Tampermonkey、Violentmonkey 等脚本管理器；
2. 点击安装链接跳转到脚本管理器的用户脚本安装界面；

- [从 Greasy Fork 安装](https://greasyfork.org/scripts/599408)
- [从 Github Release 安装](https://github.com/auspiceshirley/bili.web.ip-location/releases/latest/download/bili.web.ip-location.js)

3. 安装脚本，然后刷新带有评论区的哔哩哔哩网站页面。

## 功能

顾名思义，这个脚本就是用于在哔哩哔哩网页版评论区显示评论用户的 IP 归属地的

除了面向中国大陆用户的原版网页（https://www.bilibili.com）外，本脚本还可在国际版的网页上生效，以下是所有支持的语言版本<del><i>（其实这就是哔哩哔哩现有的语言选项）</del></i>：

|       语言       |               首页                |
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

1. 在 IP 归属地功能上线前的评论，本来就不带有 IP 信息，当然无法显示；

2. 个人空间（space.bilibili.com）网页数据接口不提供该用户的 IP 属地信息，故而无法显示；

3. 本脚本依据现有的网页结构编写，当哔哩哔哩网页组件名称和结构发生变化时，脚本功能可能会失效。
