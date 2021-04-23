# Ubuntu 镜像使用帮助

## 1. 备份 sources.list

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
```

## 2. 编辑 sources.list

```shell
sudo vim /etc/apt/sources.list
```

复制以下内容到 `/etc/apt/sources.list` 以添加哈工大镜像源。
(**_此处以 Ubuntu 20.04 LTS 为例_**，具体请根据您的版本在 [主页](#/home) > 配置生成器 > Ubuntu 中选择)

---

```
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb http://mirrors.hit.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src http://mirrors.hit.edu.cn/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.hit.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src http://mirrors.hit.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.hit.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src http://mirrors.hit.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb http://mirrors.hit.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src http://mirrors.hit.edu.cn/ubuntu/ focal-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb http://mirrors.hit.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src http://mirrors.hit.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
```

---
