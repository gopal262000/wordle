import React from "react";

function Alert({ type, children }) {
  return <div className={`${type} banner`}>{children}</div>;
}

export default Alert;
