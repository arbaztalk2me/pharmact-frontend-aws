import React from "react";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerHome from "./pages/customer/CustomerHome";
import CustomerPrivateRoute from "./components/CustomerPrivateRoute";
import AdminHome from "./pages/Admin/AdminHome";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import DistributorPrivateRoute from "./components/DistributorPrivateRoute";
import DistributorHome from "./pages/Distributor/DistributorHome";
import UserInfo from "./components/UserInfo";
import Customers from "./pages/Admin/Customers";
import Distributor from "./pages/Admin/Distributor";
import PendingOrders from "./pages/Admin/PendingOrders";
import Medicine from "./pages/Admin/Medicine";
import UpdateMedicine from "./pages/Admin/UpdateMedicine";
import ViewMedicine from "./pages/customer/ViewMedicine";
import Cart from "./pages/customer/Cart";
import AddToCart from "./pages/customer/AddToCart";
import OrderDetails from "./pages/customer/OrderDetails";
import ViewPending from "./pages/Admin/ViewPending";
import ViewOrders from "./pages/customer/ViewOrders";
import Delivered from "./pages/Distributor/Delivered";
import Undelivered from "./pages/Distributor/Undelivered";

const App = ({ children }) => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-profile" element={<UserInfo />} />
        <Route path="/customer" element={<CustomerPrivateRoute />}>
          <Route path="dashboard" element={<CustomerHome />} />
          <Route path="view-medicine" element={<ViewMedicine />} />
          <Route path="view-cart" element={<Cart />} />
          <Route path="add-to-cart/:id" element={<AddToCart />} />
          <Route path="add-orders/:mid/:qty" element={<OrderDetails />} />
          <Route path="view-orders" element={<ViewOrders />} />
        </Route>
        <Route path="/admin" element={<AdminPrivateRoute />}>
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="view-customer" element={<Customers />} />
          <Route path="view-distributor" element={<Distributor />} />
          <Route path="pending-orders" element={<PendingOrders />} />
          <Route path="medicine" element={<Medicine />} />
          <Route path="updateMedicine/:id" element={<UpdateMedicine />} />
          <Route path="view-pending" element={<ViewPending />} />
        </Route>
        <Route path="/distributor" element={<DistributorPrivateRoute />}>
          <Route path="dashboard" element={<DistributorHome />} />
          <Route path="delivered" element={<Delivered />} />
          <Route path="undelivered" element={<Undelivered />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
