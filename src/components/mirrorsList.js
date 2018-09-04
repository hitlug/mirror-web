import React, { Component } from "react";
import { Table } from "antd";

export default class MirrorsList extends Component {
  render() {
    const columns = [
      {
        title: "镜像名称",
        dataIndex: "name",
        render: text => <a href={"/" + text}>{text}</a>
      },
      {
        title: "同步状态",
        dataIndex: "status"
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
