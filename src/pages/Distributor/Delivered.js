import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { getAllDeliveredOrders } from "../../services/DistributorServices";
import { getCurrentUserDetail } from "../../auth";
import { Card } from "primereact/card";

const Delivered = () => {
  let [delivereData, setDeliverData] = useState([]);
  useEffect(() => {
    let user = getCurrentUserDetail();
    getAllDeliveredOrders(user.id)
      .then((data) => {
        console.log(data);
        setDeliverData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Base>
      <div className="row offset-1 g-0 mt-5">
        <div className="col-md-10">
          <Card
            title={
              <span>
                Delivered Orders
                {
                  <i
                    className="pi pi-send  mx-1"
                    style={{ fontSize: "0.9rem" }}
                  ></i>
                }
              </span>
            }
          >
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
                </tr>
              </thead>
              <tbody>
                {delivereData.map((data) => {
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

export default Delivered;
