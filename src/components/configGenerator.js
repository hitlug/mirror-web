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

  onConfigChange = (selectedOptions, value) => {
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
