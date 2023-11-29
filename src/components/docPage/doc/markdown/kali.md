# Kali 镜像使用帮助

## 1. 备份 sources.list

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
```

## 2. 编辑 sources.list

```shell
sudo vim /etc/apt/sources.list
```

复制以下内容到 `/etc/apt/sources.list` 以添加哈工大镜像源。

```text
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.hit.edu.cn/kali kali-rolling main non-free contrib
#deb-src https://mirrors.hit.edu.cn/kali kali-rolling main non-free contrib
```
