import React from "react";
import loader from "../assets/loader.svg";
import "./loader.scss";

export default function Loader(props) {
  let styleData = {};
  if (props.type === "component") {
    styleData = {
      position: "static",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "400px"
    };
  } else if (props.type === "jabba") {
    styleData = { position: "absolute" };
  } else {
    styleData = {
      position: "fixed"
    };
  }
  return (
    <div style={styleData} className="container-fluid1">
      <div className="container11">
        <img src={loader} alt="" />
      </div>
    </div>
  )}