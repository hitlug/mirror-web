import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import axios from "axios";
import MirrorsList from "./components/mirrorsList";
import SideCards from "./components/sideCards/sideCards";
import "./App.css";

const { Header, Footer, Content } = Layout;

export default class App extends Component {
  state = {
    // 镜像列表
    mirrorsList: null
  };

  /**
   * 获取镜像列表
   */
  fetch_mirrors_list = () => {
    this.setState({
      fetching_slots: true
    });
    axios({
      url: "/jobs",
      method: "get"
    }).then(response => {
      const mirrorsList = response.data;
      mirrorsList.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
      this.setState({
        mirrorsList: mirrorsList
      });
    });
  };

  componentWillMount() {
    this.fetch_mirrors_list();
  }

  render() {
    return (
      <Layout>
        <PageHeader/>
        <Content
          style={{
            padding: "24px",
            background: "white"
          }}
        >
          <Row type="flex" justify="center" gutter={40}>
            <Col md={12}>
              <MirrorsList mirrorsList={this.state.mirrorsList}/>
            </Col>
            <Col md={6}>
              <SideCards/>
            </Col>
          </Row>
        </Content>
        <PageFooter/>
      </Layout>
    );
  }
}

/**
 * 页面首组件
 */
class PageHeader extends React.Component {
  render() {
    return (
      <Header>
        <Col offset={3}>
          <div className="logo">哈尔滨工业大学开源镜像站</div>
        </Col>
      </Header>
    )
  }
}

/**
 * 页面尾组件
 */
class PageFooter extends React.Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: "center"
        }}
      >
        <p>哈尔滨工业大学开源镜像站</p>
        <p>
          本站由哈尔滨工业大学网络与信息中心支持创办，由哈尔滨工业大学Linux用户协会运行维护。
        </p>
      </Footer>
    )
  }
}
