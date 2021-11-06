# crates.io-index.git 镜像使用帮助

编辑 ~/.cargo/config 文件，添加以下内容。因为 mirrors.hit.edu.cn 只支持 [Dumb HTTP protocol](https://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols#_dumb_http)，所以设置 `net.git-fetch-with-cli`。([rust-lang/cargo#8918](https://github.com/rust-lang/cargo/issues/8918))

```toml
[net]
git-fetch-with-cli = true # use the `git` executable for git operations

[source.crates-io]
replace-with = "hit"

[source.hit]
registry = "https://mirrors.hit.edu.cn/crates.io-index.git"
```
