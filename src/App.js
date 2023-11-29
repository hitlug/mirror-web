import React, { Component } from "react";
import { Route, Link, useLocation, Routes, Navigate } from "react-router-dom";
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
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/doc/*" element={<DocPage />} />
        </Routes>
        <PageFooter />
      </Layout>
    );
  }
}

/**
 * 页面顶部布局组件
 */
function PageHeader() {
  const location = useLocation();

  return (
    <Header className="page-header">
      <Menu
        className="navbar-menu"
        mode="horizontal"
        defaultSelectedKeys={["/home"]}
        selectedKeys={[location.pathname.split("/")[1]]}
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

/**
 * 页面底部布局组件
 */
function PageFooter() {
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
