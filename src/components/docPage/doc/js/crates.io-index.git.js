import React from "react";
import DocTemplate from "../docTemplate.js";
import doc from "../markdown/crates.io-index.git.md";

export default function() {
  return <DocTemplate doc={doc} />;
}
