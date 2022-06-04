# Deepin 镜像使用帮助

## 0. 备份软件源配置文件

Deepin 的软件源配置文件位于 `/etc/apt/sources.list`。为了保证安全，请将其备份后再进行以下操作。

如：

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
```

## 1. 编辑配置文件

将上文中的配置文件替换为以下内容即可使用哈尔滨工业大学提供的镜像源服务，仅支持**Deepin V20**。

---

```
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb [by-hash=force] https://mirrors.hit.edu.cn/deepin/ apricot main contrib non-free
# deb-src https://mirrors.hit.edu.cn/deepin/ apricot main contrib non-free
```

---
