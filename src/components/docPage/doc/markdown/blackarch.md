# BlackArch 镜像使用帮助

## 1. 编辑 pacman.conf 文件

使用任意文本编辑器（如 vim、nano、emacs 等），编辑 `/etc/pacman.conf` 文件（需要 root 权限）。

将以下内容复制到 `/etc/pacman.conf` 文件的末尾：

```text
[blackarch]
Server = https://mirrors.hit.edu.cn/blackarch/$repo/os/$arch
```

**mirrorlist 文件中可能已经配置了多个镜像源，pacman 会根据文件中镜像源的顺序自动选择。**

**可以使用井号（#）注释掉不需要的镜像源而不必在 mirrorlist 文件中删除它。**

## 2. 更新 pacman 本地软件包数据库

```shell
# 强制从镜像源同步软件包数据库
sudo pacman -Syy
```

或者

```shell
# 强制从镜像源同步软件包数据库并且更新系统
sudo pacman -Syyu
```

## 3.安装密钥环

```shell
sudo pacman -Sy blackarch-keyring
```
