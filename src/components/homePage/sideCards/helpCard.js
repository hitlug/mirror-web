import React, { Component } from "react";
import { LinkOutlined } from "@ant-design/icons";
import "./sideCards.css";

export default class HelpCard extends Component {
  render() {
    return (
      <div>
        <h2>相关链接</h2>
        <p>
          <LinkOutlined /> {process.env.REACT_APP_ORG_NAME}:
          <br />
          <a href={process.env.REACT_APP_ORG_LINK}>
            {process.env.REACT_APP_ORG_LINK}
          </a>
        </p>
        <p>
          <LinkOutlined /> 新镜像申请及意见反馈:
          <br />
          <a href={process.env.REACT_APP_ORG_LINK + "/issues"}>
            {process.env.REACT_APP_ORG_LINK + "/issues"}
          </a>
        </p>
        <p>
          <LinkOutlined /> 镜像站前端仓库:
          <br />
          <a href="https://github.com/hitlug/mirror-web">
            https://github.com/hitlug/mirror-web
          </a>
        </p>
      </div>
    );
  }
}
