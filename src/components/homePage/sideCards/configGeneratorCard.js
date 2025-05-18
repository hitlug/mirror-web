import React, { Component } from "react";
import {
  Tooltip,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Cascader,
  message
} from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
    let configBlock = undefined;

    switch (this.state.selectDistrib) {
      case "ubuntu":
        configBlock = buildUbuntuBlock(this.state.selectVersion);
        break;
      case "ubuntu-ports":
        configBlock = buildUbuntuportsBlock(this.state.selectVersion);
        break;
      case "ubuntu-deb822":
        configBlock = buildUbuntuDeb822Block(this.state.selectVersion);
        break;
      case "ubuntu-ports-deb822":
        configBlock = buildUbuntuPortsDeb822Block(this.state.selectVersion);
        break;
      case "debian":
        configBlock = buildDebianBlock(this.state.selectVersion);
        break;
      case "debian-deb822":
        configBlock = buildDebianDeb822Block(this.state.selectVersion);
        break;
      case "archlinux":
        configBlock = buildArchBlock();
        break;
      case "centos":
        configBlock = buildCentosBlock(this.state.selectVersion);
        break;
      case "opensuse":
        configBlock = buildOpensuseBlock(this.state.selectVersion);
        break;
      case "alpine":
        configBlock = buildAlpineBlock(this.state.selectVersion);
        break;
      default:
        break;
    }

    if (configBlock !== undefined) {
      this.setState({ showConfigBlock: true, configBlock: configBlock });
    }
  };

  render() {
    return (
      <>
        <h2>配置生成</h2>
        <p>生成发行版的配置文件</p>
        <Button
          type="primary"
          icon={<ThunderboltOutlined />}
          onClick={this.showDownloadForm}
        >
          配置生成器
        </Button>
        <Modal
          open={this.state.configGeneratorVisible}
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
                {/* 配置生成器的软件源文本块组件 */}
                <Col className="config-block" span={24}>
                  {this.state.showConfigBlock ? (
                    <Tooltip placement="bottom" title="点击文本即可复制">
                      <CopyToClipboard
                        text={this.state.configBlock}
                        onCopy={() => message.success("复制成功", 1)}
                      >
                        <pre style={{ margin: 0 }}>
                          {this.state.configBlock}
                        </pre>
                      </CopyToClipboard>
                    </Tooltip>
                  ) : null}
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      </>
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
 * 构建Ubuntu-ports软件源配置的一行
 *
 * @param val 软件包格式
 * @param version 版本别名
 * @returns {string} 返回Ubuntu-ports配置的一行
 */
function buildUbuntuportsLine(val, version) {
  return (
    val +
    " http://mirrors.hit.edu.cn/ubuntu-ports/ " +
    version +
    " main restricted universe multiverse\n"
  );
}

/**
 * 构建Ubuntu-Ports软件源配置的文本块
 *
 * @param version 版本别名
 * @returns {string} 返回Ubuntu-Ports软件源配置的文本块
 */
function buildUbuntuportsBlock(version) {
  return (
    "# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释\n" +
    buildUbuntuportsLine("deb", version) +
    buildUbuntuportsLine("# deb-src", version) +
    buildUbuntuportsLine("deb", version + "-updates") +
    buildUbuntuportsLine("# deb-src", version + "-updates") +
    buildUbuntuportsLine("deb", version + "-backports") +
    buildUbuntuportsLine("# deb-src", version + "-backports") +
    buildUbuntuportsLine("deb", version + "-security") +
    buildUbuntuportsLine("# deb-src", version + "-security") +
    "\n# 预发布软件源，不建议启用\n" +
    buildUbuntuportsLine("# deb", version + "-proposed") +
    buildUbuntuportsLine("# deb-src", version + "-proposed")
  );
}

/**
 * 构建Ubuntu deb822格式软件源配置的文本块
 *
 * @param version 版本别名
 * @returns {string} 返回Ubuntu deb822格式软件源配置的文本块
 */
function buildUbuntuDeb822Block(version) {
  return (
    "# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释\n" +
    "Types: deb\n" +
    "URIs: http://mirrors.hit.edu.cn/ubuntu/\n" +
    "Suites: " + version + " " + version + "-updates " + version + "-backports\n" +
    "Components: main universe restricted multiverse\n" +
    "Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "# Types: deb-src\n" +
    "# URIs: http://mirrors.hit.edu.cn/ubuntu/\n" +
    "# Suites: " + version + " " + version + "-updates " + version + "-backports\n" +
    "# Components: main universe restricted multiverse\n" +
    "# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "Types: deb\n" +
    "URIs: http://mirrors.hit.edu.cn/ubuntu/\n" +
    "Suites: " + version + "-security\n" +
    "Components: main universe restricted multiverse\n" +
    "Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "# Types: deb-src\n" +
    "# URIs: http://mirrors.hit.edu.cn/ubuntu/\n" +
    "# Suites: " + version + "-security\n" +
    "# Components: main universe restricted multiverse\n" +
    "# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "# 预发布软件源，不建议启用\n" +
    "# Types: deb\n" +
    "# URIs: http://mirrors.hit.edu.cn/ubuntu/\n" +
    "# Suites: " + version + "-proposed\n" +
    "# Components: main universe restricted multiverse\n" +
    "# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "# 预发布软件源，不建议启用\n" +
    "# Types: deb-src\n" +
    "# URIs: http://mirrors.hit.edu.cn/ubuntu/\n" +
    "# Suites: " + version + "-proposed\n" +
    "# Components: main universe restricted multiverse\n" +
    "# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n"
  );
}

/**
 * 构建Ubuntu-ports deb822格式软件源配置的文本块
 *
 * @param version 版本别名
 * @returns {string} 返回Ubuntu-ports deb822格式软件源配置的文本块
 */
function buildUbuntuPortsDeb822Block(version) {
  return (
    "# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释\n" +
    "Types: deb\n" +
    "URIs: http://mirrors.hit.edu.cn/ubuntu-ports/\n" +
    "Suites: " + version + " " + version + "-updates " + version + "-backports\n" +
    "Components: main universe restricted multiverse\n" +
    "Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "# Types: deb-src\n" +
    "# URIs: http://mirrors.hit.edu.cn/ubuntu-ports/\n" +
    "# Suites: " + version + " " + version + "-updates " + version + "-backports\n" +
    "# Components: main universe restricted multiverse\n" +
    "# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "Types: deb\n" +
    "URIs: http://mirrors.hit.edu.cn/ubuntu-ports/\n" +
    "Suites: " + version + "-security\n" +
    "Components: main universe restricted multiverse\n" +
    "Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "# Types: deb-src\n" +
    "# URIs: http://mirrors.hit.edu.cn/ubuntu-ports/\n" +
    "# Suites: " + version + "-security\n" +
    "# Components: main universe restricted multiverse\n" +
    "# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "# 预发布软件源，不建议启用\n" +
    "# Types: deb\n" +
    "# URIs: http://mirrors.hit.edu.cn/ubuntu-ports/\n" +
    "# Suites: " + version + "-proposed\n" +
    "# Components: main universe restricted multiverse\n" +
    "# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n\n" +
    "# 预发布软件源，不建议启用\n" +
    "# Types: deb-src\n" +
    "# URIs: http://mirrors.hit.edu.cn/ubuntu-ports/\n" +
    "# Suites: " + version + "-proposed\n" +
    "# Components: main universe restricted multiverse\n" +
    "# Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg\n"
  );
}

/**
 * 构建Alpine软件源配置的一行
 *
 * @param val 版本别名
 * @returns {string} 返回Alpine配置的一行
 */
function buildAlpineLine(val) {
  return (
    " http://mirrors.hit.edu.cn/alpine/v" +
    val +
    "/main\n" +
    " http://mirrors.hit.edu.cn/alpine/v" +
    val +
    "/community\n"
  );
}

/**
 * 构建Alpine软件源配置的文本块
 *
 * @param val 版本别名
 * @returns {string} 返回Alpine软件源配置的文本块
 */
function buildAlpineBlock(version) {
  return (
    buildAlpineLine(version)
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
    buildDebianLine("deb", version) +
    buildDebianLine("# deb-src", version) +
    buildDebianLine("deb", version + "-updates") +
    buildDebianLine("# deb-src", version + "-updates") +
    buildDebianLine("deb", version + "-backports") +
    buildDebianLine("# deb-src", version + "-backports") +
    "\n# 目前还未提供 debian-security 镜像，请注意添加\n" +
    "deb http://deb.debian.org/debian-security " + version + "-security main contrib non-free\n" +
    "deb-src http://deb.debian.org/debian-security " + version + "-security main contrib non-free\n"
  );
}

function buildDebianDeb822Block(version) {
  return ( // 12 才有 non-free-firmware，10 没有 backports
    `Types: deb\n` +
    `URIs: http://mirrors.hit.edu.cn/debian\n` +
    `Suites: ${version} ${version}-updates ${version}-backports\n` +
    `Components: main contrib non-free non-free-firmware\n` +
    `Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg\n\n` +
    `# Types: deb-src\n` +
    `# URIs: http://mirrors.hit.edu.cn/debian\n` +
    `# Suites: ${version} ${version}-updates ${version}-backports\n` +
    `# Components: main contrib non-free non-free-firmware\n` +
    `# Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg\n\n` +
    `Types: deb\n` +
    `URIs: http://security.debian.org/debian-security\n` +
    `Suites: ${version}-security\n` +
    `Components: main contrib non-free non-free-firmware\n` +
    `Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg\n\n` +
    `# Types: deb-src\n` +
    `# URIs: http://security.debian.org/debian-security\n` +
    `# Suites: ${version}-security\n` +
    `# Components: main contrib non-free non-free-firmware\n` +
    `# Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg\n`
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
 * 构建OpenSUSE软件源配置的文本块的一个段落
 *
 * @param handle
 * @param name
 * @param path
 * @returns {string} 返回OpenSUSE软件源配置的文本块的一个段落
 */
function buildOpensuseSubBlock(handle, name, path) {
  return (
    `[HIT:${handle}]\n` +
    `name=HIT:${name}\n` +
    `enabled=1\n` +
    `autorefresh=0\n` +
    `baseurl=https://mirrors.hit.edu.cn/opensuse/\n` +
    `path=${path}\n` +
    `type=rpm-md\n` +
    `keeppackages=0\n`
  );
}
/**
 * 构建OpenSUSE软件源配置的文本块
 *
 * @param version 版本号
 * @returns {string} 返回OpenSUSE软件源配置的文本块
 */
function buildOpensuseBlock(version) {
  let header = `## How-to:
## 帮助：
## Run sudo zypper modifyrepo -ad to disable all repositories first
## 首先运行 sudo zypper modifyrepo -ad 来禁用所有软件源
## Save the content as HIT.repo file under /etc/zypp/repos.d/
## 将内容保存在 /etc/zypp/repos.d/ 下的 HIT.repo 中
## Note that autorefresh is disabled by default,run sudo zypper ref to refresh
## 注意自动刷新被默认禁用，运行 sudo zypper ref 来刷新
`;
  var result = "";
  switch (version) {
    case "Leap 15.3+":
      result =
        buildOpensuseSubBlock(
          `repo-backports-update`,
          `Update repository of openSUSE Backports`,
          `/update/leap/$releasever/backports/`
        ) +
        buildOpensuseSubBlock(
          `repo-sle-update`,
          `Update repository with updates from SUSE Linux Enterprise 15`,
          `/update/leap/$releasever/sle/`
        );
    //For Leap 15.3+ ,append the content for Leap 15.2-
    case "Leap 15.2-":
      result +=
        buildOpensuseSubBlock(
          `repo-non-oss`,
          `Non-OSS Repository`,
          `/distribution/leap/$releasever/repo/non-oss/`
        ) +
        buildOpensuseSubBlock(
          `repo-oss`,
          `OSS Repository`,
          `/distribution/leap/$releasever/repo/oss/`
        ) +
        buildOpensuseSubBlock(
          `repo-update-non-oss`,
          `Update for non-oss software`,
          `/update/leap/$releasever/non-oss/`
        ) +
        buildOpensuseSubBlock(
          `repo-update`,
          `Main update repo`,
          `/update/leap/$releasever/oss`
        );
      return header + result;
    case "Tumbleweed":
      return (
        header +
        buildOpensuseSubBlock(
          `repo-oss`,
          `OSS Repository`,
          `/tumbleweed/repo/oss/`
        ) +
        buildOpensuseSubBlock(
          `repo-non-oss`,
          `Non-OSS Repository`,
          `/tumbleweed/repo/non-oss/`
        ) +
        buildOpensuseSubBlock(
          `repo-update`,
          `Update for OSS Repository`,
          `/update/tumbleweed/`
        ) +
        buildOpensuseSubBlock(
          `repo-update-non-oss`,
          `Update for Non-OSS Repository`,
          `/update/tumbleweed-non-oss/`
        )
      );
    default:
      return "";
  }
}
