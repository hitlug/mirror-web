import axios from "axios";
import { Col, Row, Layout, Tag, Table, Spin, Space } from "antd";
import SideCards from "./sideCards/sideCards";
import React, { Component } from "react";
import { ReactComponent as Logo } from "../../../public/favicon.svg";
import "./homePage.css";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";
import docMenu from "../docPage/menu.json";
import { Link } from "react-router-dom";

const { Content } = Layout;

/**
 * 镜像列表主页组件
 */
export class HomePage extends Component {
  state = {
    // 镜像列表
    mirrorsList: null,
    // 是否已经获取了镜像列表
    loaded: false
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
      console.log(docMenu);
      const docs = new Set();
      docMenu.forEach(cur => {
        if (cur.name !== undefined) {
          docs.add(cur.name);
        }
      });
      console.log(docs);

      const mirrorsList = response.data.map(m =>
        Object.assign(m, {
          render_name_data: {
            name: m.name,
            has_doc: docs.has(m.name)
          }
        })
      );
      console.log(mirrorsList);
      mirrorsList.sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      });
      this.setState({
        mirrorsList: mirrorsList,
        loaded: true
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
            <h1 className="home-title-text">
              {process.env.REACT_APP_SITE_TITLE}
            </h1>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={40}>
          <Col md={12}>
            <MirrorsList
              mirrorsList={this.state.mirrorsList}
              loaded={this.state.loaded}
            />
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
    if (!this.props.loaded) {
      return (
        <div style={{ textAlign: "center", margin: "50px" }}>
          <Spin size="large" />
        </div>
      );
    }

    const columns = [
      {
        title: "镜像名称",
        dataIndex: "render_name_data",
        render: data => (
          <Space>
            <a href={`/${data.name}`}>{data.name}</a>
            {data.has_doc ? (
              <Link to={`/doc/${data.name}`}>
                <QuestionCircleOutlined />
              </Link>
            ) : null}
          </Space>
        )
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
