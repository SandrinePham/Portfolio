// src/components/PostIt.jsx
import React from "react";
import "./PostIt.scss";

const PostIt = ({ index = 0, children }) => {
  return <div className={`postit color-${index % 4}`}>{children}</div>;
};

export default PostIt;
