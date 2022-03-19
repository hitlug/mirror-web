# Alpine 镜像使用帮助

## 1. 备份 repositories

```shell
sudo cp /etc/apk/repositoies /etc/apt/repositories_backup
```

## 2. 编辑 repositories

```shell
sudo vim /etc/apk/repositories
```

复制以下内容到 `/etc/apt/sources.list` 以添加哈工大镜像源。
(**_此处以 Alpine Linux v3.15 为例_**，具体请根据您的版本在 [主页](#/home) > 配置生成器 > Alpine 中选择)

---

  ```
  https://mirrors.hit.edu.cn/alpine/v3.15/main
  https://mirrors.hit.edu.cn/alpine/v3.15/community
  ```

---
