import React, { Component } from "react";
import { Route, Redirect, Link, withRouter } from "react-router-dom";
import { Col, Layout, Menu, Row } from "antd";
import DocPage from "./components/docPage/docPage";
import { HomePage } from "./components/homePage/homePage";
import { ReactComponent as Logo } from "../public/favicon.svg";
import "./App.css";
import PropTypes from "prop-types";

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
class PageHeaderWithoutRouter extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <Header className="page-header">
        <Menu
          className="navbar-menu"
          mode="horizontal"
          defaultSelectedKeys={["/home"]}
          selectedKeys={[this.props.location.pathname.split("/")[1]]}
        >
          <Menu.Item className="navbar-menuitem" key="home">
            <Link to="/home">主页</Link>
          </Menu.Item>
          <Menu.Item className="navbar-menuitem" key="doc">
            <Link to="/doc/docHome">帮助文档</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

const PageHeader = withRouter(PageHeaderWithoutRouter);

/**
 * 页面底部布局组件
 */
class PageFooter extends Component {
  render() {
    return (
      <Footer>
        <Row type="flex" justify="center">
          <Col md={12} className="footer-text">
            <p>
              <strong>{process.env.REACT_APP_SITE_TITLE}</strong>
              <br />
              <br />
              本站由{process.env.REACT_APP_SPONSOR_NAME}支持创办
              <br />由{process.env.REACT_APP_ORG_NAME}运行维护
            </p>
          </Col>
          <Col md={6}>
            <Logo className="footer-logo" />
          </Col>
        </Row>
      </Footer>
    );
  }
}
