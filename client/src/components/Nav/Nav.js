import React from "react";

const Nav = () =>
  <nav className="navbar">
    <div className="container-fluid">
      <div className="navbar-header">
        <p className="navbar-text navbar-right">ROOLS</p>
      </div>
      <h1 className="welcome">Welcome Andrew23</h1>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="#"><span className="glyphicon glyphicon-user"></span></a>
        </li>
        <li>
          <a href="#"><span className="glyphicon glyphicon-plus"></span></a>
        </li>
        <li>
          <a href="#"><span className="glyphicon glyphicon-minus"></span></a>
        </li>
        <li>
          <a href="#">Log Out</a>
        </li>
      </ul>
    </div>
  </nav>;

export default Nav;
