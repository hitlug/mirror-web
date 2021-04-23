# 欢迎来到帮助文档

> 本帮助文档目前仍在开发、编写中

## 文档贡献指南

### 文档位置

`/src/components/docPage`

### 目录结构

```
.
├── doc
│   ├── ...
│   ├── js
│   │   ├── docHome.js
│   │   └── ...
│   └── markdown
│       ├── docHome.md
│       └── ...
├── ...
└── menu.json
```

### 结构说明

- `./doc/markdown`: 存放所有 `Markdown` 文档

- `./doc/js`: 存放所有 `JavaScript` 代码

  - 命名规则: 请检查 `./menu.json` 文件中对应的 `path` 项。若 `path` 为 `/doc/MyDoc` ，则 `js` 文件应命名为 `MyDoc.js`

  - 请在 `js` 中引入您的 `Markdown` 文档，方式为:

    ```js
    import doc from "../markdown/YourMarkdown.md";
    ```

  - 调用方式:

    ```html
    <DocTemplate doc={doc}/>
    ```

- `./menu.json`: 目录文件，存放文档页面左侧的导航栏相关信息

  - `key`: 可选，会将提供 `key` 的项目排序后置顶；若不提供，则按照 `title` 的字典序显示在下面

  - `title`: 将作为导航栏 `MenuItem` 的标题

  - `path`: 将作为帮助文档的路由路径，形式上为 `/doc/*` ，应该和对应的 `js` 文件名相匹配

    ```json
    [
      {
        "key": 0,
        "title": "欢迎来到帮助文档",
        "path": "/doc/docHome"
      },
      ...
    ]
    ```

### 示例

以本文档为例

- `./menu.json`

  ```json
  [
    {
      "key": 0,
      "title": "欢迎来到帮助文档",
      "path": "/doc/docHome"
    },
    ...
  ]
  ```

- `./doc/markdown/docHome.md`

  ```markdown
  # 欢迎来到帮助文档

  > 本帮助文档目前仍在开发、编写中

  ...
  ```

- `./doc/js/docHome.js`

  ```js
  import React from "react";
  import DocTemplate from "../docTemplate.js";
  import doc from "../markdown/docHome.md";

  export default function() {
    return <DocTemplate doc={doc} />;
  }
  ```

### 其他说明:

- 镜像站基于 `React` 和 `Ant Design` 构建，您可以直接在 `js` 文件中添加您的 `jsx` 代码， 以获得 `Markdown` 没有的特性， 如按钮、级联选择、折叠面板等

- 帮助文档基于 `react-markdown` 构建，将通过插件陆续补充对 GFM 的支持

## 相关链接

[镜像站仓库](https://github.com/hitlug/mirror-web)

[Ant Design 组件库](https://ant.design/components/overview-cn/)
