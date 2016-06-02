# i18n-demo
Demo code for i18n(internationalization) for web application.

### Overview
In the world of web application the internationalization(i18n) means:
* Display different label/text in UI, let's call it *Resource*.
* Display right format for date-time, number and currency.
* Even some time we need display different layout in UI.
On the other side in technique view we hope:
* Have a clear structure to organize the resources for different language, don't mixing it with business code.
* Have a convenient way to use expression and template in the definition of resource.
* Have a simple method to support the plural forms
* Have a unify way to use different layout for different language.

### Concept & Solution
Actually, the modern language and framework all have good support for i18n and have same concepts:
* Locale(地区)
The locale used to describe the locale-dependent information including currency symbols, number format and date/time format.
Generally a locale represents a country or region and have unique code,
for example: AU: Australia, CN: Chinese mainland, HK: Hong Kong, TW: Tai Wan, NZ: New Zealand

* Language(语言)
It is very clear there are a lot of language you known and have unique code too:
for example: ZH: Chinese, EN: English, FR: French, DE: German
We usually use language + locale(zh_CN, en_AU) to recognize specific resource and information.

The goal of this repo is show the solution for i18n in different platform:
* [PHP](https://github.com/wangwii/i18n-demo/tree/master/php)
* [Java]
* [JavaScript]()
* [Android]()
* [Swift]()
