# Gentoo 镜像使用帮助

## 1. 备份软件源配置文件

Gentoo 的软件源配置文件位于 `/etc/portage/make.conf`。为了保证安全，请将其备份后再进行以下操作。

```shell
sudo cp /etc/portage/make.conf /etc/portage/make.conf_backup
```

## 2. 编辑配置文件

复制以下内容到 `/etc/portage/make.conf` 以添加哈工大镜像源。

---

```
GENTOO_MIRRORS="http://mirrors.hit.edu.cn/gentoo/"
```

---
