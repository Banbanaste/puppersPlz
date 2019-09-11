import React from "react";
import logo from "../images/logo.png";
import "../styles/Header.css";

function Header(props) {
  return (
    <header
      className="d-flex justify-content-between align-items-center pt-3"
      style={{ maxWidth: "1120px", margin: "auto", padding: "0 20px" }}
    >
      <img
        src={logo}
        alt="PuppersPlz Logo"
        style={{ width: "150px", height: "100%" }}
      />
      <div>
        <button
          type="button"
          className="btn btn-primary btn-sm rounded-pill"
          onClick={props.onClick}
        >
          Breed List
        </button>
      </div>
    </header>
  );
}

export default Header;
