import React, { Component } from "react";
import { Table, Tag } from "antd";

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
          let color
          switch (status) {
            case 'success':
              color = 'green'
              break
            case 'syncing':
              color = 'blue'
              break
            case 'failed':
              color = 'red'
              break
            case 'fail':
              color = 'red'
              break
            default:
              break
          }
          return (
            <Tag color={color}>{status}</Tag>
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
