import React from "react";

const Nav = () =>
  <nav className="navbar">
    <div className="container-fluid">
      <div className="navbar-header">
        <p className="navbar-text navbar-left">ROOLS</p>
      </div>
      <h1 className="welcome">Welcome Andrew23</h1>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="#"><span className="glyphicon glyphicon-user nav-icon-3"></span></a>
        </li>
        <li>
          <a href="#"><span className="glyphicon glyphicon-plus nav-icon-1"></span></a>
        </li>
        <li>
          <a href="#"><span className="glyphicon glyphicon-minus nav-icon-2"></span></a>
        </li>
        <li>
          <a href="#" className="nav-icon-4">Log Out</a>
        </li>
      </ul>
    </div>
  </nav>;

export default Nav;
