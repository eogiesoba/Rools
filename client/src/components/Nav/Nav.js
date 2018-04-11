import React from "react";

const Nav = props =>
  <nav className="navbar">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <p className="navbar-text">ROOLS</p>
        </div>
        <div className="col-md-4 col-sm-12">
          <h1 className="welcome">Welcome {props.username}</h1>
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="btn-Group">
            <button name={props.plusName} onClick={props.plusClick} className="glyphicon glyphicon-plus nav-icon-1">
            </button>
            <button name={props.minusName} onClick={props.minusClick} className="glyphicon glyphicon-minus nav-icon-2">
            </button>
            <button onClick={props.logOut} className="btn nav-icon-4">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  </nav>;

export default Nav;
