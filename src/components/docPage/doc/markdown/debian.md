# Debian 镜像使用帮助

## 0. 备份软件源配置文件

Debian 的软件源配置文件位于 `/etc/apt/sources.list`。为了保证安全，请将其备份后再进行以下操作。

如：

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list_backup
```

## 1. 编辑配置文件

将上文中的配置文件替换为以下内容即可使用哈尔滨工业大学提供的镜像源服务，请根据你的 Debian 版本进行操作。

+ buster

  ```
  # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
  # 目前还未提供debian-security，请注意添加
  deb https://mirrors.hit.edu.cn/debian/ buster main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ buster main contrib non-free
  deb https://mirrors.hit.edu.cn/debian/ buster-updates main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ buster-updates main contrib non-free
  deb https://mirrors.hit.edu.cn/debian/ buster-backports main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ buster-backports main contrib non-free
  ```

+ stretch

  ```
  # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
  # 目前还未提供debian-security，请注意添加
  deb https://mirrors.hit.edu.cn/debian/ stretch main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ stretch main contrib non-free
  deb https://mirrors.hit.edu.cn/debian/ stretch-updates main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ stretch-updates main contrib non-free
  deb https://mirrors.hit.edu.cn/debian/ stretch-backports main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ stretch-backports main contrib non-free
  ```

+ jessie

  ```
  # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
  # 目前还未提供debian-security，请注意添加
  deb https://mirrors.hit.edu.cn/debian/ stretch main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ stretch main contrib non-free
  deb https://mirrors.hit.edu.cn/debian/ stretch-updates main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ stretch-updates main contrib non-free
  deb https://mirrors.hit.edu.cn/debian/ stretch-backports main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ stretch-backports main contrib non-free
  ```

+ bullseye

  ```
  # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
  # 目前还未提供debian-security，请注意添加
  deb https://mirrors.hit.edu.cn/debian/ bullseye main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ bullseye main contrib non-free
  deb https://mirrors.hit.edu.cn/debian/ bullseye-updates main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ bullseye-updates main contrib non-free
  deb https://mirrors.hit.edu.cn/debian/ bullseye-backports main contrib non-free
  # deb-src https://mirrors.hit.edu.cn/debian/ bullseye-backports main contrib non-free
  ```

