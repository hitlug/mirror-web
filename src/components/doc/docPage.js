import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Row, Col } from "antd";
import { Link, withRouter } from "react-router-dom";
import docMenu from "./menu.json";
import "./docPage.css";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class DocPage extends Component {
  /**
   * 根据json文件递归生成文档导航菜单项目
   *
   * @param source 文档导航菜单json文件
   */
  generateMenuItems(source) {
    return source.map(menu => {
      if (menu.children) {
        return (
          <SubMenu key={menu.key} title={menu.title}>
            {this.generateMenuItems(menu.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={menu.key}>
            <Link to={menu.path}>{menu.title}</Link>
          </Menu.Item>
        );
      }
    });
  }

  render() {
    return (
      <Content style={{ padding: "0 50px" }}>
        <LinkedBreadcrumb />
        <Row>
          <Col md={4}>
            <Layout className="site-layout-background" style={{ padding: "0" }}>
              <Sider
                className="site-layout-background"
                width={"100%"}
                breakpoint={"md"}
                collapsedWidth={0}
              >
                <Menu
                  mode="inline"
                  defaultOpenKeys={["0"]}
                  defaultSelectedKeys={["0"]}
                  style={{ height: "100%" }}
                >
                  {this.generateMenuItems(docMenu)}
                </Menu>
              </Sider>
            </Layout>
          </Col>
          <Col md={20}>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
                background: "white"
              }}
            >
              Content
            </Content>
          </Col>
        </Row>
      </Content>
    );
  }
}

/**
 * 可导航的面包屑组件
 */
class LinkedBreadcrumb extends React.Component {
  /**
   * 路由路径和面包屑标题的对应关系
   */
  breadcrumbNameMap = {
    "/home": "主页",
    "/doc": "帮助文档"
  };

  /**
   * 根据json文件递归生成面包屑导航项目
   *
   * @param source 文档导航菜单json文件
   */
  generateBreadcrumbNameMap(source) {
    for (let index in source) {
      if (source.hasOwnProperty(index)) {
        this.breadcrumbNameMap[source[index].path] = source[index].title;
        if (source[index].children) {
          this.generateBreadcrumbNameMap(source[index].children);
        }
      }
    }
  }

  componentDidMount() {
    this.generateBreadcrumbNameMap(docMenu);
  }

  /**
   * 面包屑导航组件
   */
  Component = withRouter(props => {
    const { location } = props;
    const pathSnippets = location.pathname.split("/").filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{this.breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/home">主页</Link>
      </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);
    return (
      <Breadcrumb style={{ margin: "16px 0" }}>{breadcrumbItems}</Breadcrumb>
    );
  });

  render() {
    return <this.Component />;
  }
}
