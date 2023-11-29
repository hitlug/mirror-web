import React, { Component } from "react";
import { Route, useLocation, Routes, Navigate, useNavigate } from "react-router-dom";
import { Col, Layout, Menu, Row } from "antd";
import DocPage from "./components/docPage/docPage";
import { HomePage } from "./components/homePage/homePage";
import { ReactComponent as Logo } from "../public/favicon.svg";
import "./App.css";

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
  const navigate = useNavigate();

  const hrefMap = new Map([
    ["home", "/home"],
    ["doc", "/doc/docHome"],
  ]);

  return (
    <Header className="page-header">
      <Menu
        className="navbar-menu"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        selectedKeys={[location.pathname.split("/")[1]]}
        onClick={({key}) => navigate(hrefMap.get(key))}
        items={[
          {
            key: "home",
            label: "主页",
          },
          {
            key: "doc",
            label: "帮助文档",
          },
        ]}
      />
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
