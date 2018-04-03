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
         
          <button name={props.plusName} onClick={props.plusClick} className="glyphicon glyphicon-plus nav-icon-1">
          </button>
       
        </li>
        <li>

          <button name={props.minusName} onClick={props.minusClick} className="glyphicon glyphicon-minus nav-icon-2">
          </button>
    
        </li>
        <li>
          
          <button onClick={props.logOut} className="btn nav-icon-4">
          <a href="">Log Out</a>
          </button>

        </li>
      </ul>
    </div>
  </nav>;

export default Nav;
