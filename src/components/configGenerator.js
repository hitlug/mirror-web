import React, { Component } from "react";
import { Button, Form, Modal, Row, Col, Cascader } from "antd";
import "./configGenerator.css";

export default class ConfigGenerator extends Component {
  state = {
    configGeneratorVisible: false,
    selectDistrib: undefined,
    selectVersion: undefined,
    showConfigBlock: false,
    configBlock: undefined
  };

  showDownloadForm = () => {
    this.setState({ configGeneratorVisible: true });
  };

  handleConfigGeneratorCancel = () => {
    this.setState({ configGeneratorVisible: false });
  };

  onConfigChange = (selectedOptions) => {
    this.setState({
      selectDistrib: selectedOptions[0],
      selectVersion: selectedOptions[1]
    });
  };

  handleGenerateConfig = () => {
    let configBlock;
    switch (this.state.selectDistrib) {
      case "ubuntu":
        configBlock = build_ubuntu_block(this.state.selectVersion);
        this.setState({ showConfigBlock: true, configBlock: configBlock });
        break;
      case "debian":
        configBlock = build_debian_block(this.state.selectVersion);
        this.setState({ showConfigBlock: true, configBlock: configBlock });
        break;
      case "archlinux":
        configBlock = build_arch_block();
        this.setState({ showConfigBlock: true, configBlock: configBlock });
        break;
      case "centos":
        configBlock = build_centos_block(this.state.selectVersion);
        this.setState({ showConfigBlock: true, configBlock: configBlock });
        break;
      case "opensuse":
        configBlock = build_opensuse_block(this.state.selectVersion);
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

class ConfigBlock extends Component {
  render() {
    let block = null;
    if (this.props.showConfigBlock) {
      console.log(this.props.configBlock);
      block = this.props.configBlock.split("\n").map(function(item) {
        return (
          <span>
            {item}
            <br />
          </span>
        );
      });
    }
    return (
      <div className="config-block">
        <pre>
          <code>{block}</code>
        </pre>
      </div>
    );
  }
}

function build_ubuntu_line(val, version) {
  return (
    val +
    " http://mirrors.hit.edu.cn/ubuntu/ " +
    version +
    " main restricted universe multiverse\n"
  );
}

function build_ubuntu_block(version) {
  return (
    "# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释\n" +
    build_ubuntu_line("deb", version) +
    build_ubuntu_line("# deb-src", version) +
    build_ubuntu_line("deb", version + "-updates") +
    build_ubuntu_line("# deb-src", version + "-updates") +
    build_ubuntu_line("deb", version + "-backports") +
    build_ubuntu_line("# deb-src", version + "-backports") +
    build_ubuntu_line("deb", version + "-security") +
    build_ubuntu_line("# deb-src", version + "-security") +
    "\n# 预发布软件源，不建议启用\n" +
    build_ubuntu_line("# deb", version + "-proposed") +
    build_ubuntu_line("# deb-src", version + "-proposed")
  );
}

function build_debian_line(val, version) {
  return (
    val +
    " http://mirrors.hit.edu.cn/debian/ " +
    version +
    " main contrib non-free\n"
  );
}

function build_debian_block(version) {
  return (
    "目前还未提供debian-security，请注意添加\n" +
    build_debian_line("deb", version) +
    build_debian_line("# deb-src", version) +
    build_debian_line("deb", version + "-updates") +
    build_debian_line("# deb-src", version + "-updates") +
    build_debian_line("deb", version + "-backports") +
    build_debian_line("# deb-src", version + "-backports")
  );
}

function build_arch_block() {
  return "Server = http://mirrors.hit.edu.cn/archlinux/$repo/os/$arch";
}

function build_centos_subblock(
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

function build_centos_block(version) {
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
        build_centos_subblock(
          `base`,
          `Base`,
          `https://mirrors.hit.edu.cn/centos/$releasever/os/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`,
          1,
          ``
        ) +
        "\n" +
        build_centos_subblock(
          `updates`,
          `Updates`,
          `https://mirrors.hit.edu.cn/centos/$releasever/updates/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`,
          1,
          `released updates`
        ) +
        "\n" +
        build_centos_subblock(
          `extras`,
          `Extras`,
          `https://mirrors.hit.edu.cn/centos/$releasever/extras/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`,
          1,
          `additional packages that may be useful`
        ) +
        "\n" +
        build_centos_subblock(
          `centosplus`,
          `Plus`,
          `https://mirrors.hit.edu.cn/centos/$releasever/centosplus/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=centosplus`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-6`,
          0,
          `additional packages that extend functionality of existing packages`
        ) +
        "\n" +
        build_centos_subblock(
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
        build_centos_subblock(
          `base`,
          `Base`,
          `https://mirrors.hit.edu.cn/centos/$releasever/os/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7`,
          1,
          ``
        ) +
        "\n" +
        build_centos_subblock(
          `updates`,
          `Updates`,
          `https://mirrors.hit.edu.cn/centos/$releasever/updates/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7`,
          1,
          `released updates`
        ) +
        "\n" +
        build_centos_subblock(
          `extras`,
          `Extras`,
          `https://mirrors.hit.edu.cn/centos/$releasever/extras/$basearch/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7`,
          1,
          `additional packages that may be useful`
        ) +
        "\n" +
        build_centos_subblock(
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
        build_centos_subblock(
          `BaseOS`,
          `Base`,
          `https://mirrors.hit.edu.cn/centos/$releasever/BaseOS/$basearch/os/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=BaseOS&infra=$infra`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial`,
          1,
          ``
        ) +
        "\n" +
        build_centos_subblock(
          `AppStream`,
          `AppStream`,
          `https://mirrors.hit.edu.cn/centos/$releasever/AppStream/$basearch/os/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=AppStream&infra=$infra`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial`,
          1,
          ``
        ) +
        "\n" +
        build_centos_subblock(
          `PowerTools`,
          `PowerTools`,
          `https://mirrors.hit.edu.cn/centos/$releasever/PowerTools/$basearch/os/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=PowerTools&infra=$infra`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial`,
          0,
          ``
        ) +
        "\n" +
        build_centos_subblock(
          `extras`,
          `Extras`,
          `https://mirrors.hit.edu.cn/centos/$releasever/extras/$basearch/os/`,
          `http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras`,
          `file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial`,
          1,
          `additional packages that may be useful`
        ) +
        "\n" +
        build_centos_subblock(
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

function build_opensuse_block(version) {
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
