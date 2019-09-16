import React from "react";
import "./style.css";

function Navbar() {
  return(
    <nav className="navbar navbar-expand-lg mb-2">
      <h1 className="navbar-brand">React Books</h1>
        <ul className="list-inline d-inline-block navbar-nav ml-auto">
            <li className="nav-item list-inline-item">
            <a className="nav-link" href="/">Search</a>
            </li>
            <li className="nav-item list-inline-item">
            <a className="nav-link" href="/saved">Saved</a>
            </li>
        </ul>
    </nav>
  )
};

export default Navbar;