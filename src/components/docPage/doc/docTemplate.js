import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import htmlParser from "react-markdown/plugins/html-parser";
import "./docTemplate.css";

/**
 * 代码高亮渲染器
 */
const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={coy} language={language} children={value} />
    );
  }
};

/**
 * HTML解析器
 */
const parse = htmlParser({
  isValidNode: node => node.type !== "script",
  processingInstructions: [
    /* ... */
  ]
});

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
        plugins={[gfm]}
        renderers={renderers}
        htmlParser={parse}
        allowDangerousHtml
      >
        {this.state.text}
      </ReactMarkdown>
    );
  }
}
