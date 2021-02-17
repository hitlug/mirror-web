import React, { Component } from "react";
import { Button, Form, Modal, Row, Col, Cascader } from "antd";

/**
 * 下载链接组件
 */
export default class DownloadForm extends Component {
  state = {
    // 下载链接对话框可见性
    downloadFormVisible: false,
    // 选择的发行版的下载链接地址
    selectDistrib: undefined
  };

  /**
   * 显示下载链接对话框
   */
  showDownloadForm = () => {
    this.setState({ downloadFormVisible: true });
  };

  /**
   * 退出下载链接对话框
   */
  handleDownloadFormCancel = () => {
    this.setState({ downloadFormVisible: false });
  };

  /**
   * 确认选择发行版和版本
   *
   * @param selectedOptions 级联选择器各级的值。
   *        其中[0]为发行版名称，[1]为下载链接地址
   */
  onDownloadLinkChange = (selectedOptions) => {
    console.log(selectedOptions);
    this.setState({ selectDistrib: selectedOptions[1] });
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
