import React from "react";

const Nav = props =>
  <nav className="navbar">
    <div className="container-fluid">
      <div className="navbar-header">
        <p className="navbar-text navbar-left">ROOLS</p>
      </div>
      <h1 className="welcome">Welcome {props.username}</h1>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="#">
          <button name={props.plusName} onClick={props.plusClick} className="glyphicon glyphicon-plus nav-icon-1">
          </button>
          </a>
        </li>
        <li>
          <a href="#">
          <button name={props.minusName} onClick={props.minusClick} className="glyphicon glyphicon-minus nav-icon-2">
          </button>
          </a>
        </li>
        <li>
          <a href="" className="nav-icon-4">
          <button onClick={props.logOut} className="btn">
          Log Out
          </button>
          </a>
        </li>
      </ul>
    </div>
  </nav>;

export default Nav;
