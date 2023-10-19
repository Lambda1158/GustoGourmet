import React from "react";
import "./spiner.css";

export default function Spinner() {
  return (
    <div style={{ marginLeft: "50%", marginTop: "20%" }}>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
