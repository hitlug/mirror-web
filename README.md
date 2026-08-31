# 哈尔滨工业大学开源镜像站主页

本页面使用 create-react-app 和 ant design 构建。

## 构建

需要 Node.js 20 和 GNU Make。执行：

```shell
make build
```

命令会按照 `yarn.lock` 自动安装依赖，并将生产产物输出到 `dist/`。

站点信息可以通过 Make 变量覆盖，例如：

```shell
make build \
  REACT_APP_SITE_TITLE="自定义镜像站" \
  REACT_APP_ORG_NAME="维护组织"
```

清理构建产物：

```shell
make clean
```

## 发布新闻

新闻索引位于 `public/news/index.json`，正文位于
`public/news/articles/`。发布一条新闻时：

1. 在 `public/news/articles/` 中创建以新闻 `slug` 命名的 Markdown 文件。
2. 在 `public/news/index.json` 中添加对应的元数据。
3. 执行 `make build`，通过内容校验后生成新的 `dist/`。

索引记录示例：

```json
{
  "slug": "2026-08-23-cernet-mirrors-launch",
  "title": "教育网联合镜像站正式发布",
  "publishedAt": "2026-08-23",
  "author": "MirrorZ 项目",
  "summary": "教育网联合镜像站正式发布。",
  "tags": ["开源动态"],
  "pinned": true
}
```

`slug` 只能包含小写字母、数字和连字符，发布日期使用
`YYYY-MM-DD` 格式，`author` 用于标注新闻作者。可选的 `pinned`
用于置顶，`draft` 为 `true` 时不在页面中展示。构建会检查重复
`slug`、日期格式、缺失正文和孤立正文文件。
