import axios from "axios";
import { Col, Row, Layout, Menu } from "antd";
import MirrorsList from "./mirrorsList";
import SideCards from "./sideCards/sideCards";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./homePageLayout.css";

const { Header, Footer, Content } = Layout;

/**
 * 镜像列表主页组件
 */
export class HomePageContent extends Component {
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

  componentDidMount() {
    this.fetch_mirrors_list();
  }

  render() {
    return (
      <Content className="home-page-content">
        <Row type="flex" justify="center">
          <Col>
            <Logo className="home-title-logo" />
          </Col>
          <Col>
            <h1 className="home-title-text">哈尔滨工业大学开源镜像站</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={40}>
          <Col md={12}>
            <MirrorsList mirrorsList={this.state.mirrorsList} />
          </Col>
          <Col md={6}>
            <SideCards />
          </Col>
        </Row>
      </Content>
    );
  }
}

/**
 * 页面顶部布局组件
 */
export class HomePageHeader extends Component {
  render() {
    return (
      <Header className="home-page-header">
        <Menu
          className="navbar-menu"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
        >
          <Menu.Item className="navbar-menuitem" key={0}>
            <Link to="/home">主页</Link>
          </Menu.Item>
          <Menu.Item className="navbar-menuitem" key={1}>
            <Link to="/doc/docHome">帮助文档</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

/**
 * 页面底部布局组件
 */
export class HomePageFooter extends Component {
  render() {
    return (
      <Footer className="home-page-footer">
        <Row type="flex" justify="center">
          <Col md={6} style={{ padding: "64px 24px", textAlign: "end" }}>
            <h1 style={{ fontWeight: "bolder" }}>哈尔滨工业大学开源镜像站</h1>
          </Col>
          <Col md={6}>
            <Logo className="footer-logo" />
          </Col>
          <Col md={6} style={{ padding: "64px 24px", textAlign: "start" }}>
            <p>本站由哈尔滨工业大学网络与信息中心支持创办</p>
            <p>由哈尔滨工业大学Linux用户协会运行维护</p>
          </Col>
        </Row>
      </Footer>
    );
  }
}
