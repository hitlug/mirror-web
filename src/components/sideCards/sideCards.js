import React, { Component } from 'react';
import DownloadFormCard from "./downloadFormCard";
import ConfigGeneratorCard from "./configGeneratorCard";
import ContactCard from "./contactCard";
import HelpCard from "./helpCard";
import DocCard from "./docCard";
import axios from "axios";

export default class SideCards extends Component {
  state = {
    // ISO下载链接
    isoLinks: null,
    // 发行版的版本名，及对应的版本号或版本别名
    config: null
  }

  /**
   * 获取ISO下载链接
   */
  fetch_iso_links = () => {
    this.setState({
      fetching_slots: true
    });
    axios({
      url: "/static/isoLinks.json",
      method: "get"
    }).then(response => {
      const isoLinks = response.data;
      console.log(isoLinks);
      this.setState({
        isoLinks: isoLinks
      });
    });
  };

  /**
   * 获取发行版的版本名，及对应的版本号或版本别名
   */
  fetch_config = () => {
    this.setState({
      fetching_slots: true
    });
    axios({
      url: "/static/config.json",
      method: "get"
    }).then(response => {
      const config = response.data;
      console.log(config);
      this.setState({
        config: config
      });
    });
  };

  componentDidMount() {
    this.fetch_iso_links()
    this.fetch_config()
  }

  render() {
    return (
      <div>
        <div className="side-card">
          <DownloadFormCard isoLinks={this.state.isoLinks}/>
        </div>
        <div className="side-card">
          <ConfigGeneratorCard config={this.state.config}/>
        </div>
        <div className="side-card">
          <DocCard/>
        </div>
        <div className="side-card">
          <ContactCard/>
        </div>
        <div className="side-card">
          <HelpCard/>
        </div>
      </div>
    );
  }
}
