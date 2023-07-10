import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { useNavigate, useParams } from "react-router-dom";
import { getMedicineById } from "../../services/AdminServices";
import { toast } from "react-toastify";
import { getCurrentUserDetail } from "../../auth";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import {
  createOrders,
  getAllDistributor,
} from "../../services/CustomerServices";
import { Button } from "primereact/button";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { mid, qty } = useParams();
  let [medicines, setMedicines] = useState({});
  let [users, setUsers] = useState({});
  let [distributor, setDistributors] = useState([]);
  let [amount, setAmount] = useState(0);
  let [orderData, setOrderData] = useState({
    name: "",
    mobileNo: "",
    address: "",
    distributorId: "",
    quantity: qty,
    user: {},
    medicine: {},
  });
  let [prescription, setPrescription] = useState(null);
  useEffect(() => {
    getMedicineById(mid)
      .then((resp) => {
        setMedicines(resp);
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong!");
      });
    setUsers(getCurrentUserDetail());
    getAllDistributor()
      .then((data) => {
        setDistributors(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong on server!!");
      });
  }, []);

  useEffect(() => {
    setOrderData({ ...orderData, user: { id: users.id }, medicine: medicines });
    setAmount(qty * medicines.medicinePrice);
    amount = qty * medicines.medicinePrice;
  }, [users, medicines]);

  let handleSubmit = (e) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("orders", JSON.stringify(orderData));
    bodyFormData.append("prescription", prescription);
    createOrders(bodyFormData)
      .then((data) => {
        console.log(data);
        localStorage.removeItem("cart");
        toast.success("Order completed successfully");
        navigate("/customer/view-medicine");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!!");
      });
    console.log(bodyFormData.get("orders"));
    console.log(bodyFormData.get("prescription"));
  };

  return (
    <Base>
      <div className="row g-0 offset-2 mt-5">
        <div className="col-md-8">
          <Card className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="text-body-secondary">Enter Your Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <span className="p-float-label">
                  <InputText
                    value={orderData.name}
                    name="name"
                    style={{ width: "300px" }}
                    id="name"
                    onChange={(e) =>
                      setOrderData({ ...orderData, name: e.target.value })
                    }
                  />
                  <label htmlFor="name">Name</label>
                  <br />
                </span>
              </div>
              <div className="my-4">
                <span className="p-float-label">
                  <InputText
                    onChange={(e) =>
                      setOrderData({ ...orderData, mobileNo: e.target.value })
                    }
                    value={orderData.mobileNo}
                    name="mobileNo"
                    style={{ width: "300px" }}
                    id="mobileNo"
                  />
                  <label htmlFor="mobileNo">MobileNo</label>
                  <br />
                </span>
              </div>
              <div className="my-4">
                <span className="p-float-label">
                  <InputText
                    onChange={(e) =>
                      setOrderData({ ...orderData, address: e.target.value })
                    }
                    value={orderData.address}
                    name="address"
                    style={{ width: "300px" }}
                    id="address"
                  />
                  <label htmlFor="address">Address</label>
                  <br />
                </span>
              </div>
              <div className="my-4">
                <span className="p-float-label">
                  <InputText
                    type="file"
                    accept="image.png,image/jpeg,image/jpg,image/gif"
                    onChange={(e) => setPrescription(e.target.files[0])}
                    name="prescription"
                    style={{ width: "300px" }}
                    id="prescription"
                  />

                  <br />
                </span>
              </div>
              <div className="my-4">
                <span className="p-float-label">
                  <InputText
                    disabled
                    name="amount"
                    style={{ width: "300px" }}
                    value={amount}
                    id="amount"
                  />
                  <label htmlFor="prescription">Amount</label>
                  <br />
                </span>
              </div>
              <div className="mb-4">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setOrderData({
                      ...orderData,
                      distributorId: e.target.value,
                    })
                  }
                >
                  <option defaultValue={null}>
                    ----Select Delivery Partner----
                  </option>
                  {distributor.map((data) => {
                    return (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <Button
                label="Pay & Order Now"
                severity="success"
                text
                raised
              ></Button>
            </form>
          </Card>
        </div>
      </div>
    </Base>
  );
};

export default OrderDetails;
