import React from "react";
import Base from "../../components/Base";
import AdminImage from "../../static/admin.webp";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <Base>
      <div className="container">
        <h2 className="text-center mt-3">Welcome Back</h2>
        <div className="d-flex justify-content-center">
          <div
            className=""
            style={{
              width: "30%",
              borderBottom: "2px solid #003049",
              height: "1px",
            }}
          ></div>
        </div>
        <div className="row g-0 " style={{ height: "80vh" }}>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <div className="card">
              <Card className="text-center " title="Welcome To Admin Home">
                <Link className="text-decoration-none">Check Profile</Link>
                <br />
                <Link className="text-decoration-none">Check Customers</Link>
                <br />
                <Link className="text-decoration-none">Check Distributors</Link>
                <br />
                <Link className="text-decoration-none">
                  Check Pending Orders
                </Link>
                <br />
                <Link className="text-decoration-none">Check Medicines</Link>
                <br />
              </Card>
            </div>
          </div>
          <div className="col-md-8 d-flex justify-content-center align-items-center">
            <div class="card" style={{ width: "28rem" }}>
              <img src={AdminImage} class="card-img-top" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AdminHome;
