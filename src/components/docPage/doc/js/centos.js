import React from "react";
import DocTemplate from "../docTemplate.js";
import doc from "../markdown/centos.md";

export default function() {
    return <DocTemplate doc={doc} />;
}
