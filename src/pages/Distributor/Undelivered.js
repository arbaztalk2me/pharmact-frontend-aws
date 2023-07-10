import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { getCurrentUserDetail } from "../../auth";
import {
  getAllUndeliverOrders,
  updateDelievery,
} from "../../services/DistributorServices";
import { Card } from "primereact/card";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Undelivered = () => {
  const navigate = useNavigate();
  let [undelivereData, setUndeliverData] = useState([]);
  let [user, setUser] = useState({});
  useEffect(() => {
    let user = getCurrentUserDetail();
    setUser(user);
    getAllUndeliverOrders(user.id)
      .then((data) => {
        console.log(data);
        setUndeliverData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let handleDeliever = (id) => {
    updateDelievery(id, user.id)
      .then((data) => {
        console.log(data);
        toast.success("Order Delivered");
        navigate("/distributor/delivered");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong");
      });
  };
  return (
    <Base>
      <div className="row offset-1 g-0 mt-5">
        <div className="col-md-10">
          <Card title="Undelivered Orders">
            <table className="table  table-hover  px-2">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Medicine Name</th>
                  <th scope="col">Medicine Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount Paid</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Delivery Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {undelivereData.map((data) => {
                  return (
                    <tr key={data.id}>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.address}</td>
                      <td>{data.medicine.medicineName}</td>
                      <td>{data.medicine.medicinePrice}</td>
                      <td>{data.quantity}</td>

                      <td>{data.amount}</td>
                      <td>{data.orderStatus}</td>
                      <td>{data.deliveredStatus}</td>
                      <td>
                        <button
                          onClick={() => handleDeliever(data.id)}
                          className="btn btn-outline-success"
                        >
                          Delivered
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </Base>
  );
};

export default Undelivered;
