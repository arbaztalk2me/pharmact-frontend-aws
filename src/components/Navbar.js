import React, { useEffect, useState } from "react";
import medicineImg from "../static/medicine-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";

const Navbar = () => {
  const navigate = useNavigate();
  let [login, setLogin] = useState(false);
  let [user, setUser] = useState(null);
  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, []);

  let logout = () => {
    doLogout(() => {
      setLogin(false);
      setUser(null);
      navigate("/login");
    });
  };

  return (
    <nav
      className="navbar nvabarbg navbar-expand-lg"
      style={{ borderBottom: "black 1px solid" }}
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <img
            src={medicineImg}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          Pharmacy Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!login && (
              <li className="nav-item">
                <Link
                  to={"/login"}
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  <i
                    className="pi pi-user me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Login
                </Link>
              </li>
            )}
            {!login && (
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>
                  <i
                    className="pi pi-user-plus me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Signup
                </Link>
              </li>
            )}
            {login && user.role === "ROLE_ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/dashboard"}>
                  <i
                    className="pi pi-shield me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Home
                </Link>
              </li>
            )}
            {login && user.role === "ROLE_CUSTOMER" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/customer/dashboard"}>
                  <i
                    className="pi pi-shield me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Home
                </Link>
              </li>
            )}
            {login && user.role === "ROLE_DISTRIBUTOR" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/distributor/dashboard"}>
                  <i
                    className="pi pi-shield me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Home
                </Link>
              </li>
            )}
            {login && (
              <li className="nav-item">
                <Link className="nav-link" to={"/user-profile"}>
                  <i
                    className="pi pi-prime me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  {user.name}
                </Link>
              </li>
            )}
            {login && user.role === "ROLE_ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/view-customer"}>
                  <i
                    className="pi pi-users me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Customers
                </Link>
              </li>
            )}
            {login && user.role === "ROLE_ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/view-distributor"}>
                  <i
                    className="pi pi-sitemap me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Distributor
                </Link>
              </li>
            )}
            {login && user.role === "ROLE_ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/view-pending"}>
                  <i
                    className="pi pi-box me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Pending Orders
                </Link>
              </li>
            )}
            {login && user.role === "ROLE_ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/admin/medicine"}>
                  <i
                    className="pi pi-shield me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Medicine
                </Link>
              </li>
            )}

            {login && user.role === "ROLE_CUSTOMER" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/customer/view-medicine"}>
                  <i
                    className="pi pi-shield me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  View Medicine
                </Link>
              </li>
            )}
            {login && user.role === "ROLE_CUSTOMER" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/customer/view-cart"}>
                  <i
                    className="pi pi-cart-plus me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  View Cart
                </Link>
              </li>
            )}
            {login && user.role === "ROLE_CUSTOMER" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/customer/view-orders"}>
                  <i
                    className="pi pi-shopping-bag me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  View Your Orders
                </Link>
              </li>
            )}

            {login && user.role === "ROLE_DISTRIBUTOR" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/distributor/undelivered"}>
                  <i
                    className="pi pi-shopping-cart me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  View All Undelivered Orders
                </Link>
              </li>
            )}

            {login && user.role === "ROLE_DISTRIBUTOR" && (
              <li className="nav-item">
                <Link className="nav-link" to={"/distributor/delivered"}>
                  <i
                    className="pi pi-shopping-bag me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  View All Delivered Orders
                </Link>
              </li>
            )}

            {login && (
              <li className="nav-item">
                <span className="nav-link" onClick={logout}>
                  <i
                    className="pi pi-lock me-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                  Logout
                </span>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to={"/about"}>
                <i
                  className="pi pi-code me-1"
                  style={{ fontSize: "0.9rem" }}
                ></i>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
