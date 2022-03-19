import React from "react";
import DocTemplate from "../docTemplate.js";
import doc from "../markdown/alpine.md";

export default function() {
  return <DocTemplate doc={doc} />;
}
