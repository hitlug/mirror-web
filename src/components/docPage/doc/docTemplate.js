import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import rehypePrism from "@mapbox/rehype-prism";
import "prismjs/themes/prism.min.css"
import "./docTemplate.css";

/**
 * 帮助文档模板类
 */
export default class DocTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 导入文档的文本内容
      text: ""
    };
  }

  componentDidMount() {
    fetch(this.props.doc)
      .then(r => r.text())
      .then(text => {
        this.setState({
          text: text
        });
      })
      .catch(e => {
        console.log("fetch ERROR", e);
      });
  }

  render() {
    return (
      <ReactMarkdown
        className="doc"
        remarkPlugins={[gfm]}
        rehypePlugins={[rehypePrism]}
      >
        {this.state.text}
      </ReactMarkdown>
    );
  }
}
