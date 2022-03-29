# RubyGems 镜像使用帮助

## gem

添加哈工大源并移除默认源

```shell
gem sources --add https://mirrors.hit.edu.cn/rubygems/ --remove https://rubygems.org/
```

使用以下命令查看确保只有哈工大源：

```shell
gem sources -l
```

## bundler

```shell
bundle config mirror.https://rubygems.org https://mirrors.hit.edu.cn/rubygems
```
