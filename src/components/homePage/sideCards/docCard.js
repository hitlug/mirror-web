import React, { Component } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { BulbOutlined } from "@ant-design/icons";

export default class DocCard extends Component {
  render() {
    return (
      <div>
        <h2>帮助文档</h2>
        <p>配置文件使用方法</p>
        <Link to={"/doc/docHome"}>
          <Button type="primary" icon={<BulbOutlined />}>
            帮助文档
          </Button>
        </Link>
      </div>
    );
  }
}
