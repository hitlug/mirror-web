import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Divider, Row, Col } from "antd";
import { Link, withRouter } from "react-router-dom";
import docMenu from "./menu.json";
import "./docPage.css";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

/**
 * 帮助文档页面组件
 */
export default class DocPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 帮助文档正文内容
      docContent: undefined
    };
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this);
  }

  /**
   * 根据json文件递归生成文档导航菜单项目
   *
   * @param source 文档导航菜单json文件
   */
  generateMenuItems(source) {
    return source.map(menu => {
      if (menu.children) {
        return (
          <SubMenu key={menu.path} title={menu.title}>
            {this.generateMenuItems(menu.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={menu.path}>
            <Link to={menu.path}>{menu.title}</Link>
          </Menu.Item>
        );
      }
    });
  }

  /**
   * 动态导入文档并修改页面正文内容
   *
   * @param path 文档路由
   */
  importAndExecDoc(path) {
    this.setState({ docContent: undefined });
    import("./doc/js/" + path.split("/")[2] + ".js")
      .then(module => {
        this.setState({
          docContent: module.default()
        });
      })
      .catch(() => {
        console.log("import " + path + " failed");
        this.setState({
          docContent: <h1>No Document Here!</h1>
        });
      });
  }

  /**
   * 菜单项目被选中后的回调，修改帮助文档显示的正文内容
   *
   * @param info 选中Menu项的信息。
   *             其中.key是被选中的MenuItem的key
   */
  onMenuItemSelected(info) {
    this.importAndExecDoc(info.key);
  }

  componentDidMount() {
    this.importAndExecDoc("/doc/docHome");
  }

  render() {
    return (
      <Row className="doc-content">
        <Col flex={1} />
        <Col flex={22}>
          <Content style={{ padding: "50px 0" }}>
            <Layout>
              <Sider breakpoint="md" collapsedWidth="0">
                <Menu
                  mode="inline"
                  defaultOpenKeys={["/doc/docHome"]}
                  defaultSelectedKeys={["/doc/docHome"]}
                  onSelect={this.onMenuItemSelected}
                  style={{ height: "100%" }}
                >
                  {this.generateMenuItems(docMenu)}
                </Menu>
              </Sider>
              <Layout
                style={{
                  overflowX: "hidden"
                }}
              >
                <Header
                  style={{
                    padding: "12px 48px",
                    background: "white",
                    height: "auto"
                  }}
                >
                  <LinkedBreadcrumb />
                  <Divider />
                </Header>
                <Content
                  style={{
                    padding: "12px 48px 48px",
                    background: "white"
                  }}
                >
                  {this.state.docContent}
                </Content>
              </Layout>
            </Layout>
          </Content>
        </Col>
        <Col flex={1} />
      </Row>
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
          {this.breadcrumbNameMap[url]}
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/home">主页</Link>
      </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);
    return (
      <Breadcrumb style={{ margin: "20px" }}>{breadcrumbItems}</Breadcrumb>
    );
  });

  render() {
    return <this.Component />;
  }
}
