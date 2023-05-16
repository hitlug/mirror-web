# Anaconda 镜像使用帮助

Anaconda 是一个用于科学计算的 Python 发行版，支持 Linux, Mac, Windows, 包含了众多流行的科学计算、数据分析的 Python 包。

Anaconda 安装包可以到 https://mirrors.hit.edu.cn/anaconda/archive/ 下载。

TUNA 还提供了 Anaconda 仓库与第三方源（conda-forge、msys2、pytorch等，[查看完整列表](https://mirrors.hit.edu.cn/anaconda/cloud/)，更多第三方源可以前往[校园网联合镜像站](https://mirrors.cernet.edu.cn/list/anaconda)查看）的镜像，各系统都可以通过修改用户目录下的 `.condarc` 文件来使用 TUNA 镜像源。Windows 用户无法直接创建名为 `.condarc` 的文件，可先执行 `conda config --set show_channel_urls yes` 生成该文件之后再修改。

注：由于更新过快难以同步，我们不同步 `pytorch-nightly`, `pytorch-nightly-cpu`, `ignite-nightly` 这三个包。

```yaml
channels:
- defaults
show_channel_urls: true
default_channels:
- https://mirrors.hit.edu.cn/anaconda/pkgs/main
- https://mirrors.hit.edu.cn/anaconda/pkgs/r
- https://mirrors.hit.edu.cn/anaconda/pkgs/msys2
custom_channels:
conda-forge: https://mirrors.hit.edu.cn/anaconda/cloud
msys2: https://mirrors.hit.edu.cn/anaconda/cloud
bioconda: https://mirrors.hit.edu.cn/anaconda/cloud
menpo: https://mirrors.hit.edu.cn/anaconda/cloud
pytorch: https://mirrors.hit.edu.cn/anaconda/cloud
pytorch-lts: https://mirrors.hit.edu.cn/anaconda/cloud
simpleitk: https://mirrors.hit.edu.cn/anaconda/cloud
```

即可添加 Anaconda Python 免费仓库。

运行 `conda clean -i` 清除索引缓存，保证用的是镜像站提供的索引。

运行 `conda create -n myenv numpy` 测试一下吧。

## Miniconda 镜像使用帮助

Miniconda 是一个 Anaconda 的轻量级替代，默认只包含了 python 和 conda，但是可以通过 pip 和 conda 来安装所需要的包。

Miniconda 安装包可以到 <https://mirrors.hit.edu.cn/anaconda/miniconda/> 下载。

