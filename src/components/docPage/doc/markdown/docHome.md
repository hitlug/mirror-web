# 欢迎来到帮助文档

## 本帮助文档目前仍在开发、编写中

- 文档位置: `/src/components/docPage`

- 目录结构:

  ```
  .
  ├── doc
  │   ├── js
  │   │   ├── docHome.js
  │   │   └── ...
  │   └── markdown
  │       ├── docHome.md
  │       └── ...
  ├── ...
  ```

- 目录说明:

  - `/doc/markdown`: 存放所有 `Markdown` 文档

  - `/doc/js`: 存放所有 `JavaScript` 代码

    - 请在 `.js` 中引入您的 `Markdown` 文档，方式为:

      ```js
      import doc from "../markdown/YourMarkdown.md";
      ```

    - 调用方式:
      ```html
      <DocTemplate doc={doc}/>
      ```

  - 其他说明:

    - 镜像站基于 `React` 和 `Ant Design` 构建，可以直接在 `.js` 文件中添加您的 `jsx` 代码，以获得 `Markdown` 没有的特性， 如按钮、级联选择、折叠面板等
