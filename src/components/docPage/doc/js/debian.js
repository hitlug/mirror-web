import React from "react";
import DocTemplate from "../docTemplate.js";
import doc from "../markdown/debian.md";

export default function() {
  return <DocTemplate doc={doc} />;
}
