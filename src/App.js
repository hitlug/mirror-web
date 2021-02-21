import React, { Component } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { Col, Layout, Menu, Row } from "antd";
import DocPage from "./components/docPage/docPage";
import { HomePage } from "./components/homePage/homePage";
import { ReactComponent as Logo } from "./assets/logo.svg";
import "./App.css";

const { Header, Footer } = Layout;

export default class App extends Component {
  render() {
    return (
      <Layout>
        <PageHeader />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={HomePage} />
        <Route path="/doc" component={DocPage} />
        <PageFooter />
      </Layout>
    );
  }
}

/**
 * 页面顶部布局组件
 */
class PageHeader extends Component {
  render() {
    return (
      <Header className="page-header">
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
class PageFooter extends Component {
  render() {
    return (
      <Footer className="page-footer">
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
