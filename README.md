<!--
 * @Author: BlackJoken
 * @Date: 2022-01-10 14:45:33
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-01-12 13:12:00
-->

# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 关于报错

ref等报错
yarn add eslint@7.32.0
yarn add eslint-plugin-vue@8.0.0
参考链接：https://blog.csdn.net/zhanye88/article/details/121644706

https://blog.csdn.net/qq_43869822/article/details/121637066

https://blog.csdn.net/sirodeng/article/details/105431664

## 关于项目搭建

1."dayjs": "^1.10.7", 时间格式化工具。 https://dayjs.gitee.io/docs/zh-CN/installation/installation
2."screenfull": "4.0.0",   全屏工具   https://github.com/sindresorhus/screenfull
"autoprefixer": "^10.4.2",
"axios": "^0.24.0",
"element-plus": "^1.3.0-beta.4",
"eslint": "7.32.0",
"eslint-plugin-vue": "8.0.0",
"less": "^4.1.2",
"moment": "^2.29.1",
"postcss-pxtorem": "^6.0.0",

"vue": "^3.2.25",
"vue-router": "^4.0.12",
"vuex": "^4.0.2"