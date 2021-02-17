import React, { Component } from "react";
import { Icon } from "antd";

export default class ContactCard extends Component {
  render() {
    return (
      <div>
        <h2>联系我们</h2>
        <p>
          <Icon type="link" theme="outlined"/> 新镜像申请及意见反馈:
          <br/>
          <a href="https://github.com/hitlug/issues">
            https://github.com/hitlug/issues
          </a>
        </p>
      </div>
    );
  }
}
