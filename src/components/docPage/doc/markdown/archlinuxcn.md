# ArchLinuxCN 镜像使用帮助

> Arch Linux 中文社区仓库是由 Arch Linux 中文社区驱动的非官方软件仓库，包含许多官方仓库未提供的额外的软件包，以及已有软件的 git 版本等变种。
>
> \- [Arch Linux 中文社区仓库](https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/)

## 1. 备份 pacman 配置文件

```shell
sudo cp /etc/pacman.conf /etc/pacman.conf_backup
```

## 2. 编辑 pacman.conf 文件

使用任意文本编辑器（如 vim、nano、emacs 等），编辑 `/etc/pacman.conf` 文件（需要 root 权限）。

将以下内容复制到 `/etc/pacman.conf` 文件的**末尾**

```
[archlinuxcn]
Server = https://mirrors.hit.edu.cn/archlinuxcn/$arch
```

## 3. 导入 archlinuxcn 钥匙环

```shell
sudo pacman -Sy archlinuxcn-keyring
```

随后将自动进行 GPG 签名。