import React, { Component } from "react";
import { Icon } from "antd";

export default class HelpCard extends Component {
  render() {
    return (
      <div>
        <h2>相关链接</h2>
        <p>
          <Icon type="link" theme="outlined" /> Github:
          <br />
          <a href="https://github.com/hitlug">https://github.com/hitlug</a>
        </p>
      </div>
    );
  }
}
