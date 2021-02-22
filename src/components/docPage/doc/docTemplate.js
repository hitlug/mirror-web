import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/src/styles/hljs";
import "./docTemplate.css";

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={github} language={language} children={value} />
    );
  }
};

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
      <ReactMarkdown className="doc" plugins={[gfm]} renderers={renderers}>
        {this.state.text}
      </ReactMarkdown>
    );
  }
}
