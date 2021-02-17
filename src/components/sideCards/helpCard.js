import React, { Component } from "react";
import { LinkOutlined } from "@ant-design/icons";

export default class HelpCard extends Component {
  render() {
    return (
      <div>
        <h2>相关链接</h2>
        <p>
          <LinkOutlined/> Github:
          <br/>
          <a href="https://github.com/hitlug">https://github.com/hitlug</a>
        </p>
      </div>
    );
  }
}
