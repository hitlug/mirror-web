import React, { Component } from "react";
import { Layout, Row, Col } from "antd";
import axios from "axios";
import MirrorsList from "./components/mirrorsList";
import DownloadForm from "./components/downloadForm";
import "./App.css";

const { Header, Footer, Content } = Layout;

export default class App extends Component {
  state = {
    mirrorsList: null,
    isoLinks: null
  };

  fetch_mirrors_list = (params = {}) => {
    this.setState({
      fetching_slots: true
    });
    axios({
      url: "/jobs",
      method: "get",
      data: {
        ...params
      }
    }).then(response => {
      const mirrorsList = response.data;
      this.setState({
        mirrorsList: mirrorsList
      });
    });
  };

  fetch_iso_links = (params = {}) => {
    this.setState({
      fetching_slots: true
    });
    axios({
      url: "/static/isoLinks.json",
      method: "get",
      data: {
        ...params
      }
    }).then(response => {
      const isoLinks = response.data;
      console.log(isoLinks);
      this.setState({
        isoLinks: isoLinks
      });
    });
  };

  componentWillMount() {
    this.fetch_mirrors_list();
    this.fetch_iso_links();
  }

  render() {
    return (
      <Layout>
        <Header>
          <Col offset={3}>
            <div className="logo"> 哈尔滨工业大学开源镜像站 </div>
          </Col>
        </Header>
        <Content
          style={{
            padding: "24px",
            background: "white"
          }}
        >
          <Row type="flex" justify="center" gutter={40}>
            <Col md={12}>
              <MirrorsList mirrorsList={this.state.mirrorsList} />
            </Col>
            <Col md={6}>
              <DownloadForm isoLinks={this.state.isoLinks} />
            </Col>
          </Row>
        </Content>
        <Footer
          style={{
            textAlign: "center"
          }}
        >
          哈尔滨工业大学开源镜像站
        </Footer>
      </Layout>
    );
  }
}
