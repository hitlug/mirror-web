import React, { Component } from "react";
import { Button, Form, Modal, Row, Col, Cascader } from "antd";

export default class DownloadForm extends Component {
  state = {
    downloadFormVisible: false,
    selectDistrib: undefined
  };

  showDownloadForm = () => {
    this.setState({ downloadFormVisible: true });
  };

  handleDownloadFormCancel = () => {
    this.setState({ downloadFormVisible: false });
  };

  onDownloadLinkChange = value => {
    console.log(value);
    this.setState({ selectDistrib: value[1] });
  };

  render() {
    return (
      <div>
        <h2>下载链接</h2>
        <p>各大主流Linux发行版的ISO文件下载</p>
        <Button type="primary" icon="download" onClick={this.showDownloadForm}>
          获取下载链接
        </Button>
        <Modal
          visible={this.state.downloadFormVisible}
          title={"下载链接"}
          onCancel={this.handleDownloadFormCancel}
          footer={null}
        >
          <Form layout="vertical">
            <Form.Item>
              <Row gutter={8}>
                <Col span={20}>
                  <Cascader
                    expandTrigger="hover"
                    placeholder="请选择发行版"
                    options={this.props.isoLinks}
                    onChange={this.onDownloadLinkChange}
                  />
                </Col>
                <Col span={4}>
                  <Button
                    type="primary"
                    icon="download"
                    href={this.state.selectDistrib}
                  >
                    下载
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
