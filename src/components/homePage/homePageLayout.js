import axios from "axios";
import { Col, Row, Layout } from "antd";
import MirrorsList from "./mirrorsList";
import SideCards from "./sideCards/sideCards";
import { Link } from "react-router-dom";
import React, { Component } from "react";
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
      <Header>
        <Row>
          <Col offset={3}>
            <Link className="logo" to={"/home"}>
              哈尔滨工业大学开源镜像站
            </Link>
          </Col>
        </Row>
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
        <p>哈尔滨工业大学开源镜像站</p>
        <p>
          本站由哈尔滨工业大学网络与信息中心支持创办，
          由哈尔滨工业大学Linux用户协会运行维护。
        </p>
      </Footer>
    );
  }
}
