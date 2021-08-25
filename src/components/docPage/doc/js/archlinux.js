import React from "react";
import DocTemplate from "../docTemplate.js";
import doc from "../markdown/archlinux.md";

export default function() {
  return <DocTemplate doc={doc} />;
}
