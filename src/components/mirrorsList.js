import React, { Component } from "react";
import { Table, Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";

/**
 * 镜像列表组件
 */
export default class MirrorsList extends Component {
  render() {
    const columns = [
      {
        title: "镜像名称",
        dataIndex: "name",
        render: (text) => <a href={"/" + text}>{text}</a>
      },
      {
        title: "同步状态",
        dataIndex: "status",
        render: (status) => {
          let statusIcon, statusTagColor, statusLable
          switch (status) {
            case 'success':
              statusIcon = <CheckCircleOutlined/>
              statusTagColor = 'success'
              statusLable = 'Success'
              break
            case 'syncing':
              statusIcon = <SyncOutlined spin/>
              statusTagColor = 'processing'
              statusLable = 'Syncing'
              break
            case 'failed':
            case 'fail':
              statusIcon = <CloseCircleOutlined/>
              statusTagColor = 'error'
              statusLable = 'Failed'
              break
            default:
              statusIcon = <ExclamationCircleOutlined/>
              statusTagColor = 'warning'
              statusLable = 'Unknown'
              break
          }
          return (
            <Tag icon={statusIcon} color={statusTagColor}>
              {statusLable}
            </Tag>
          )
        }
      },
      {
        title: "Last Update",
        dataIndex: "last_update",
        render: (text) => text.split(" ").slice(0, 2).join(" ")
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
