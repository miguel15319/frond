import React from "react";
import "../styles/Login.css"

const ButtonLogin = ({fnInicioSession, label}) => {
  return (
    <button className="btn btn-primary btn-sm" onClick={fnInicioSession}>
      {label}
    </button>
  );
};

export default ButtonLogin;
