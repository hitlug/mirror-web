# Termux 镜像使用帮助

> Termux 是一个运行于 Android 上的 terminal, 可以用来运行 Linux 应用。它不需要 root 权限，但因此它的所有文件都存储于 SD 卡上。

Termux 自带了 `apt` 包管理器，但是官方并不推荐直接使用 `apt` ，而是推荐 `pkg` 进行操作。

## 更换镜像

### 修改 sources.list

修改以下文件：

- $PREFIX/etc/apt/sources.list
- $PREFIX/etc/apt/sources.list.d/game.list
- $PREFIX/etc/apt/sources.list.d/science.list

> 因 Termux 运行于 SD 卡，所以无权访问真实的 `/` 目录，只能访问自己的“根目录”（ $PREFIX/ ）

```text
# sources.list
deb https://mirrors.hit.edu.cn/termux/apt/termux-main stable main

# game.list
deb https://mirrors.hit.edu.cn/termux/apt/termux-games games stable

# science.list
deb https://mirrors.hit.edu.cn/termux/apt/termux-science science stable 
```

## 社区源

镜像站还提供了如下社区维护的源，如需使用请自行添加：

* https://mirrors.hit.edu.cn/termux/x11-packages
* https://mirrors.hit.edu.cn/termux/unstable-packages
* https://mirrors.hit.edu.cn/termux/termux-root-packages-24
