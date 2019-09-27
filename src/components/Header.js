import React from "react";
import logo from "../images/logo.png";
import "../styles/Header.css";

function Header(props) {
  return (
    <header
      className="d-flex justify-content-between align-items-center container"
      style={{ margin: "auto", height: "100px" }}
    >
      <img src={logo} alt="PuppersPlz Logo" style={{ width: "200px" }} />
      <div>
        <button
          type="button"
          className="btn btn-light btn-md rounded-pill mr-4"
          onClick={props.onClick}
        >
          Breed List
        </button>
        <button
          type="button"
          className="btn btn-md rounded-pill searchBtn"
          onClick={props.onClick}
          style={{
            backgroundColor: "#C52B2B",
            border: "3px solid #fff",
            color: "#fff"
          }}
        >
          Search
        </button>
      </div>
    </header>
  );
}

export default Header;
