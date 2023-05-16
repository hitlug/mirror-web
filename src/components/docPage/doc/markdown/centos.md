# CentOS 镜像使用帮助

## 0. 备份软件源配置文件

CentOS 的软件源配置文件位于 `/etc/yum.repos.d/`。为了保证安全，请将其备份后再进行以下操作。

如：

```shell
sudo cp -r /etc/yum.repos.d/ /etc/yum.repos.d.bak/
```

## 1. 编辑配置文件

将上文中的配置文件替换为以下内容即可使用哈尔滨工业大学提供的镜像源服务，请根据你的 CentOS 版本进行操作。

+ CentOS 7

```shell
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
-e 's|^#baseurl=http://mirror.centos.org/centos|baseurl=https://mirrors.hit.edu.cn/centos|g' \
-i.bak \
/etc/yum.repos.d/CentOS-*.repo
```

+ CentOS 8

```shell
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
-e 's|^#baseurl=http://mirror.centos.org/$contentdir|baseurl=https://mirrors.hit.edu.cn/centos|g' \
-i.bak \
/etc/yum.repos.d/CentOS-*.repo
```

注意其中的 `*` 通配符，如果只需要替换一些文件中的源，请自行增删。

注意，如果需要启用其中一些 repo，需要将其中的 `enabled=0` 改为 `enabled=1`。

最后，更新软件包缓存

```shell
sudo yum makecache
```
