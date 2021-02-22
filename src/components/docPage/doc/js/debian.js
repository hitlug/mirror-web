import React from "react";
import doc from "../markdown/debian.md";
import DocTemplate from "../docTemplate";

export default function() {
  return <DocTemplate doc={doc} />;
}
