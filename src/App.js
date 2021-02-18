import React, { Component } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import axios from "axios";
import MirrorsList from "./components/mirrorsList";
import SideCards from "./components/sideCards/sideCards";
import DocPage from "./components/doc/docPage";
import "./App.css";

const { Header, Footer, Content } = Layout;

export default class App extends Component {
  render() {
    return (
      <Layout>
        <PageHeader/>
        <Route path={'/'}>
          <Redirect to={'/home'}/>
        </Route>
        <Route path={'/home'} component={HomePage}/>
        <Route path={'/doc'} component={DocPage}/>
        <PageFooter/>
      </Layout>
    );
  }
}

/**
 * 镜像列表主页组件
 */
class HomePage extends React.Component {
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
            <br/>
          </Col>
        </Row>
      </Content>
    )
  }
}

/**
 * 页面导航菜单组件
 */
class PageHeader extends React.Component {
  render() {
    return (
      <Header>
        <Row>
          <Col offset={3}>
            <Link className="logo" to={'/home'}>哈尔滨工业大学开源镜像站</Link>
          </Col>
        </Row>
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
