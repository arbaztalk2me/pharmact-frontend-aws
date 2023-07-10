import React, { useState } from "react";
import Base from "../components/Base";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { singupUser } from "../services/UserServices";
import { toast } from "react-toastify";

const Signup = () => {
  let [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  let [error, setError] = useState({});
  const Roles = [{ name: "CUSTOMER", code: "ROLE_CUSTOMER" }];
  let handleCahnge = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (signupData.name.trim() === "") {
      errors = { ...errors, name: "name must be enter" };
    }
    if (signupData.email.trim() === "") {
      errors = { ...errors, email: "email must be enter" };
    }
    if (signupData.password.trim() === "") {
      errors = { ...errors, password: "password must be enter" };
    }
    if (signupData.role?.name?.trim() === "") {
      errors = { ...errors, role: "role must be selected" };
    }
    if (Object.keys(errors).length != 0) {
      console.log(errors);
      setError(errors);
      return;
    }
    singupUser({ ...signupData, role: signupData.role.code })
      .then(() => {
        setSignupData({
          name: "",
          email: "",
          password: "",
          role: "",
        });
        setError({});
        toast.success("🦄 Signup Success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(JSON.stringify(error.response.data));
      });
  };
  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>At least one special character</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );
  return (
    <Base>
      {}
      <div
        style={{ height: "85vh" }}
        className="row g-0 d-flex justify-content-center align-items-center"
      >
        <div className="col-md-5">
          <div className="card">
            <Card className="text-center" title="SignUp Here">
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <div className="mb-4">
                  <span className="p-float-label">
                    <InputText
                      className={error.name && "p-invalid"}
                      onChange={handleCahnge}
                      value={signupData.name}
                      name="name"
                      style={{ width: "300px" }}
                      id="name"
                    />
                    <label htmlFor="name">Your Name</label>
                    <br />
                  </span>
                  <span className="mt-1 p-error">{error?.name}</span>
                </div>
                <div className="mb-4">
                  <span className="p-float-label">
                    <InputText
                      className={error.email && "p-invalid"}
                      type="email"
                      onChange={handleCahnge}
                      value={signupData.email}
                      name="email"
                      style={{ width: "300px" }}
                      id="email"
                    />
                    <label htmlFor="email">Email</label>
                    <br />
                  </span>
                  <span className="mt-1 p-error">{error?.email}</span>
                </div>

                <div className="mb-4">
                  <span className="p-float-label">
                    <Password
                      className={error.password && "p-invalid"}
                      onChange={handleCahnge}
                      name="password"
                      value={signupData.password}
                      strongRegex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
                      id="password"
                      header={header}
                      footer={footer}
                    />
                    <label htmlFor="password">password</label>
                    <br />
                  </span>
                  <span className="mt-1 p-error">{error?.password}</span>
                </div>
                <div className="mb-4">
                  <Dropdown
                    className={
                      (error.role && "p-invalid") || "w-full md:w-14rem"
                    }
                    name="role"
                    value={signupData.role}
                    onChange={handleCahnge}
                    style={{ width: "300px" }}
                    options={Roles}
                    optionLabel="name"
                    placeholder="Select Your Role"
                  />
                  <br />
                  <span className="mt-1 p-error">{error?.password}</span>
                </div>

                <Button
                  label="SignUp"
                  icon="pi pi-user-plus"
                  rounded
                  text
                  raised
                />
              </form>
            </Card>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Signup;
