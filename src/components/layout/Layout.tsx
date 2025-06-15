import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./layout.scss";

const Layout = () => {
  const navigate = useNavigate()

  function handleLogout(){
    document.cookie = "token=; max-age=0; path=/;";
    navigate('/login')
  }

  return (
    <>
      <header className="layout">
        <p className="user-details">Elon Musk</p>
        <i className="fi fi-rr-leave logout-icon" onClick={handleLogout}></i>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
