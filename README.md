# my-vue-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


axios clipboard codemirror core-js driver.js dropzone echarts element-ui file-saver fuse.js js-cookie jsonlint jszip normalize.css nprogress path-to-regexp 
screenfull script-loader sortablejs tui-editor vue vue-count-to vue-router vue-splitpane vuedraggable vuex xlsx
---------------D---------------------
@vue/cli-plugin-babel @vue/cli-plugin-eslint @vue/cli-plugin-unit-jest @vue/cli-service @vue/test-utils autoprefixer babel-eslint babel-jest babel-plugin-dynamic-import-node chalk chokidar connect eslint eslint-plugin-vue html-webpack-plugin husky lint-staged mockjs plop runjs sass 
sass-loader script-ext-html-webpack-plugin serve-static svg-sprite-loader svgo vue-template-compiler
1. error  in ./src/styles/element-variables.scss
Syntax Error: TypeError: this.getOptions is not a function  --->  sass-loader版本太高

2.in ./src/components/CommonGlobal/CommonSelect.vue?vue&type=style&index=0&id=92192430&lang=less&scoped=true&
Syntax Error: TypeError: this.getOptions is not a function  
运行报错： 像这种有可能是依赖版本过高引起的，比如，这个可能是less