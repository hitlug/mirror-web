import React, { Component } from 'react'
import { Button } from "antd";
import { Link } from "react-router-dom";

export default class DocCard extends Component {
  render() {
    return (
      <div>
        <h2>帮助文档</h2>
        <p>配置文件使用方法</p>
        <Button type="primary">
          <Link to={'/doc'}>帮助文档</Link>
        </Button>
      </div>
    )
  }
}
