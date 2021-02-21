import axios from "axios";
import { Col, Row, Layout, Tag, Table } from "antd";
import SideCards from "./sideCards/sideCards";
import React, { Component } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./homePage.css";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";

const { Content } = Layout;

/**
 * 镜像列表主页组件
 */
export class HomePage extends Component {
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
 * 镜像列表组件
 */
class MirrorsList extends Component {
  render() {
    const columns = [
      {
        title: "镜像名称",
        dataIndex: "name",
        render: text => <a href={"/" + text}>{text}</a>
      },
      {
        title: "同步状态",
        dataIndex: "status",
        render: status => {
          let statusIcon, statusTagColor, statusLable;
          switch (status) {
            case "success":
              statusIcon = <CheckCircleOutlined />;
              statusTagColor = "success";
              statusLable = "Success";
              break;
            case "syncing":
              statusIcon = <SyncOutlined spin />;
              statusTagColor = "processing";
              statusLable = "Syncing";
              break;
            case "failed":
            case "fail":
              statusIcon = <CloseCircleOutlined />;
              statusTagColor = "error";
              statusLable = "Failed";
              break;
            default:
              statusIcon = <ExclamationCircleOutlined />;
              statusTagColor = "warning";
              statusLable = "Unknown";
              break;
          }
          return (
            <Tag icon={statusIcon} color={statusTagColor}>
              {statusLable}
            </Tag>
          );
        }
      },
      {
        title: "Last Update",
        dataIndex: "last_update",
        render: text =>
          text
            .split(" ")
            .slice(0, 2)
            .join(" ")
      }
    ];
    const data = this.props.mirrorsList;
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="name"
      />
    );
  }
}
