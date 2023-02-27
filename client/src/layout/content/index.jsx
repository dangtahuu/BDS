import React from "react";
import { Layout } from "antd";
import "./styles.scss";
const { Content } = Layout;

function Contents({ children }) {
  return <Content className="app-content">{children}</Content>;
}
export default Contents;