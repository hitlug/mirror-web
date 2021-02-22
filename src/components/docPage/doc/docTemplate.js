import React from "react";
import ReactMarkdown from "react-markdown";

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
    return <ReactMarkdown>{this.state.text}</ReactMarkdown>;
  }
}
