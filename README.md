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
