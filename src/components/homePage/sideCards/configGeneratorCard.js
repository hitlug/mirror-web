import React, { Component } from "react";
import { Button, Form, Modal, Row, Col, Cascader } from "antd";
import "./configGeneratorCard.css";

/**
 * 配置生成器组件
 */
export default class ConfigGeneratorCard extends Component {
  state = {
    // 配置生成器可见性
    configGeneratorVisible: false,
    // 选择发行版
    selectDistrib: undefined,
    // 选择的发行版的版本号或版本别名
    selectVersion: undefined,
    // 是否显示软件源配置文本块
    showConfigBlock: false,
    // 软件源配置文本块
    configBlock: undefined
  };

  /**
   * 显示配置生成器对话框
   */
  showDownloadForm = () => {
    this.setState({ configGeneratorVisible: true });
  };

  /**
   * 退出配置生成器对话框
   */
  handleConfigGeneratorCancel = () => {
    this.setState({ configGeneratorVisible: false });
  };

  /**
   * 确认选择发行版和版本
   *
   * @param selectedOptions 级联选择器各级的值。
   *        其中[0]为发行版名称，[1]为版本别名
   */
  onConfigChange = selectedOptions => {
    this.setState({
      selectDistrib: selectedOptions[0],
      selectVersion: selectedOptions[1]
    });
  };

  /**
   * 生成配置
   */
  handleGenerateConfig = () => {
    let configBlock;
    switch (this.state.selectDistrib) {
      case "ubuntu":
        configBlock = buildUbuntuBlock(this.state.selectVersion);
        this.setState({ showConfigBlock: true, configBlock: configBlock });
        break;
      case "debian":
        configBlock = buildDebianBlock(this.state.selectVersion);
        this.setState({ showConfigBlock: true, configBlock: configBlock });
        break;
      case "archlinux":
        configBlock = buildArchBlock();
        this.setState({ showConfigBlock: true, configBlock: configBlock });
        break;
      case "centos":
        configBlock = buildCentosBlock(this.state.selectVersion);
        this.setState({ showConfigBlock: true, configBlock: configBlock });
        break;
      case "opensuse":
        configBlock = buildOpensuseBlock(this.state.selectVersion);
        this.setState({ showConfigBlock: true, configBlock: configBlock });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <h2>配置生成</h2>
        <p>生成发行版的配置文件</p>
        <Button type="primary" onClick={this.showDownloadForm}>
          配置生成器
        </Button>
        <Modal
          visible={this.state.configGeneratorVisible}
          title={"配置生成器"}
          onCancel={this.handleConfigGeneratorCancel}
          footer={null}
          width={800}
        >
          <Form layout="vertical">
            <Form.Item>
              <Row gutter={8}>
                <Col span={20}>
                  <Cascader
                    expandTrigger="hover"
                    placeholder="请选择发行版"
                    options={this.props.config}
                    onChange={this.onConfigChange}
                  />
                </Col>
                <Col span={4}>
                  <Button type="primary" onClick={this.handleGenerateConfig}>
                    生成
                  </Button>
                </Col>
              </Row>
              <Row>
                <ConfigBlock
                  showConfigBlock={this.state.showConfigBlock}
                  configBlock={this.state.configBlock}
                />
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

/**
 * 配置生成器的软件源文本块组件
 */
class ConfigBlock extends Component {
  render() {
    let block = null;
    if (this.props.showConfigBlock) {
      block = this.props.configBlock.split("\n").map(function(item, id) {
        return (
          <span key={id}>
            {item}
            <br />
          </span>
        );
      });
    }
    return (
      <Col className="config-block" span={24}>
        <pre style={{ margin: 0 }}>
          <code>{block}</code>
        </pre>
      </Col>
    );
  }
}

/**
 * 构建Ubuntu软件源配置的一行
 *
 * @param val 软件包格式
 * @param version 版本别名
 * @returns {string} 返回Ubuntu配置的一行
 */
function buildUbuntuLine(val, version) {
  return (
    val +
    " http://mirrors.hit.edu.cn/ubuntu/ " +
    version +
    " main restricted universe multiverse\n"
  );
}

/**
 * 构建Ubuntu软件源配置的文本块
 *
 * @param version 版本别名
 * @returns {string} 返回Ubuntu软件源配置的文本块
 */
function buildUbuntuBlock(version) {
  return (
    "# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释\n" +
    buildUbuntuLine("deb", version) +
    buildUbuntuLine("# deb-src", version) +
    buildUbuntuLine("deb", version + "-updates") +
    buildUbuntuLine("# deb-src", version + "-updates") +
    buildUbuntuLine("deb", version + "-backports") +
    buildUbuntuLine("# deb-src", version + "-backports") +
    buildUbuntuLine("deb", version + "-security") +
    buildUbuntuLine("# deb-src", version + "-security") +
    "\n# 预发布软件源，不建议启用\n" +
    buildUbuntuLine("# deb", version + "-proposed") +
    buildUbuntuLine("# deb-src", version + "-proposed")
  );
}

/**
 * 构建Debian软件源配置的一行
 *
 * @param val 软件包格式
 * @param version 版本别名
 * @returns {string} 返回Debian配置的一行
 */
function buildDebianLine(val, version) {
  return (
    val +
    " http://mirrors.hit.edu.cn/debian/ " +
    version +
    " main contrib non-free\n"
  );
}

/**
 * 构建Debian软件源配置的文本块
 *
 * @param version 版本别名
 * @returns {string} 返回Debian软件源配置的文本块
 */
function buildDebianBlock(version) {
  return (
    "目前还未提供debian-security，请注意添加\n" +
    buildDebianLine("deb", version) +
    buildDebianLine("# deb-src", version) +
    buildDebianLine("deb", version + "-updates") +
    buildDebianLine("# deb-src", version + "-updates") +
    buildDebianLine("deb", version + "-backports") +
    buildDebianLine("# deb-src", version + "-backports")
  );
}

/**
 * 构建ArchLinux软件源配置的文本块
 *
 * @returns {string} 返回ArchLinux软件源配置的文本块
 */
function buildArchBlock() {
  return "Server = http://mirrors.hit.edu.cn/archlinux/$repo/os/$arch";
}

/**
 * 构建CentOS软件源配置的文本块的一个段落
 *
 * @param handle
 * @param name
 * @param baseurl
 * @param mirrorlist
 * @param gpgkey
 * @param enabled
 * @param comment
 * @returns {string} 返回CentOS软件源配置的文本块的一个段落
 */
function buildCentosSubBlock(
  handle,
  name,
  baseurl,
  mirrorlist,
  gpgkey,
  enabled,
  comment
) {
  return (
    `#${comment}\n` +
    `[${handle}]\n` +
    `name=CentOS-$releasever - ${name}\n` +
    `baseurl=${baseurl}\n` +
    `#mirrorlist=${mirrorlist}\n` +
    `enabled=${enabled}\ngpgcheck=1\n` +
    `gpgkey=${gpgkey}\n`
  );
}

/**
 * 构建CentOS软件源配置的文本块
 *
 * @param version 版本号
 * @returns {string} 返回CentOS软件源配置的文本块
 */
function buildCentosBlock(version) {
  let header = `# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client.  You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
# If the mirrorlist= does not work for you, as a fall back you can try the
# remarked out baseurl= line instead.
#
#
`;
  switch (version) {
    case 6:
      return (
        header +
        buildCentosSubBlock(
          `base`,
          `Base`,
          `https://mirrors.hit.edu.cn/centos/$releasever/os/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`,
          1,
          ``
        ) +
        "\n" +
        buildCentosSubBlock(
          `updates`,
          `Updates`,
          `https://mirrors.hit.edu.cn/centos/$releasever/updates/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`,
          1,
          `released updates`
        ) +
        "\n" +
        buildCentosSubBlock(
          `extras`,
          `Extras`,
          `https://mirrors.hit.edu.cn/centos/$releasever/extras/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`,
          1,
          `additional packages that may be useful`
        ) +
        "\n" +
        buildCentosSubBlock(
          `centosplus`,
          `Plus`,
          `https://mirrors.hit.edu.cn/centos/$releasever/centosplus/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=centosplus`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`,
          0,
          `additional packages that extend functionality of existing packages`
        ) +
        "\n" +
        buildCentosSubBlock(
          `contrib`,
          `Contrib`,
          `https://mirrors.hit.edu.cn/centos/$releasever/contrib/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=contrib`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`,
          0,
          `contrib - packages by Centos Users`
        ) +
        "\n"
      );
    case 7:
      return (
        header +
        buildCentosSubBlock(
          `base`,
          `Base`,
          `https://mirrors.hit.edu.cn/centos/$releasever/os/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7`,
          1,
          ``
        ) +
        "\n" +
        buildCentosSubBlock(
          `updates`,
          `Updates`,
          `https://mirrors.hit.edu.cn/centos/$releasever/updates/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7`,
          1,
          `released updates`
        ) +
        "\n" +
        buildCentosSubBlock(
          `extras`,
          `Extras`,
          `https://mirrors.hit.edu.cn/centos/$releasever/extras/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7`,
          1,
          `additional packages that may be useful`
        ) +
        "\n" +
        buildCentosSubBlock(
          `centosplus`,
          `Plus`,
          `https://mirrors.hit.edu.cn/centos/$releasever/centosplus/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=centosplus`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7`,
          0,
          `additional packages that extend functionality of existing packages`
        ) +
        "\n"
      );
    case 8:
      return (
        header +
        buildCentosSubBlock(
          `BaseOS`,
          `Base`,
          `https://mirrors.hit.edu.cn/centos/$releasever/BaseOS/$basearch/os/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=BaseOS&infra=$infra`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial`,
          1,
          ``
        ) +
        "\n" +
        buildCentosSubBlock(
          `AppStream`,
          `AppStream`,
          `https://mirrors.hit.edu.cn/centos/$releasever/AppStream/$basearch/os/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=AppStream&infra=$infra`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial`,
          1,
          ``
        ) +
        "\n" +
        buildCentosSubBlock(
          `PowerTools`,
          `PowerTools`,
          `https://mirrors.hit.edu.cn/centos/$releasever/PowerTools/$basearch/os/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=PowerTools&infra=$infra`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial`,
          0,
          ``
        ) +
        "\n" +
        buildCentosSubBlock(
          `extras`,
          `Extras`,
          `https://mirrors.hit.edu.cn/centos/$releasever/extras/$basearch/os/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial`,
          1,
          `additional packages that may be useful`
        ) +
        "\n" +
        buildCentosSubBlock(
          `centosplus`,
          `Plus`,
          `https://mirrors.hit.edu.cn/centos/$releasever/centosplus/$basearch/os/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=centosplus`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial`,
          0,
          `additional packages that extend functionality of existing packages`
        ) +
        "\n"
      );
    default:
      return "";
  }
}

/**
 * 构建OpenSUSE软件源配置的文本块
 *
 * @param version 版本号
 * @returns {string} 返回OpenSUSE软件源配置的文本块
 */
function buildOpensuseBlock(version) {
  switch (version) {
    case 15.2:
      return `
# Please run on cli or save as shell script file
# 请运行在 shell 终端或复制生成内容保存至 shell 脚本

# Disable all sources
# 禁用所有软件源
sudo zypper mr -da

# Add sources
# 添加工大镜像源，以 openSUSE Leap 15.2 为例：
# 命令中最后一个参数为每一个源指定了一个 alias （别称），可以根据个人喜好更改
sudo zypper ar -fcg https://mirrors.hit.edu.cn/opensuse/distribution/leap/15.2/repo/oss HIT:15.2:OSS
sudo zypper ar -fcg https://mirrors.hit.edu.cn/opensuse/distribution/leap/15.2/repo/non-oss HIT:15.2:NON-OSS
sudo zypper ar -fcg https://mirrors.hit.edu.cn/opensuse/update/leap/15.2/oss HIT:15.2:UPDATE-OSS
sudo zypper ar -fcg https://mirrors.hit.edu.cn/opensuse/update/leap/15.2/non-oss HIT:15.2:UPDATE-NON-OSS

# Manually refresh the software source
# 手动刷新软件源
sudo zypper ref
      `;
    default:
      return "";
  }
}
