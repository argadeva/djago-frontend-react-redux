import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import Axios from "axios";
import menu from "../images/menu.png";
import fork from "../images/fork.png";
import clipboard from "../images/clipboard.png";
import add from "../images/add.png";
import logout from "../images/logout.png";
import categories from "../images/categories.png";
import staff from "../images/staff.png";

const Sidebar = props => {
  const logOut = e => {
    e.preventDefault();
    Axios.post(
      process.env.REACT_APP_URL_API + "/users/logout",
      { token: localStorage.usertoken },
      {
        headers: { "x-access-token": localStorage.usertoken }
      }
    ).then(() => {
      localStorage.removeItem("usertoken");
      window.location.reload();
    });
  };

  return (
    <>
      <ul id="sidebar" className="nav flex-column text-center">
        <li className="p-4 border-bottom">
          <Link to="#">
            <img src={menu} alt="Menu" className="icon" />
          </Link>
        </li>
        <li className="py-4">
          <NavLink exact to="/">
            <img src={fork} alt="Menu" className="icon" />
          </NavLink>
        </li>
        <li className="py-4">
          <NavLink exact to="/history">
            <img src={clipboard} alt="Menu" className="icon" />
          </NavLink>
        </li>
        <li className="py-4">
          <NavLink exact to="/products/1">
            <img src={add} alt="Menu" className="icon" />
          </NavLink>
        </li>
        <li className="py-4">
          <NavLink exact to="/categories">
            <img src={categories} alt="Menu" className="icon" />
          </NavLink>
        </li>
        <li className="py-4">
          <NavLink exact to="/users">
            <img src={staff} alt="Menu" className="icon" />
          </NavLink>
        </li>
        <li className="py-4">
          <Link to="/logout" onClick={e => logOut(e)}>
            <img src={logout} alt="Menu" className="icon" />
          </Link>
        </li>
      </ul>
    </>
  );
};

export default withRouter(Sidebar);
