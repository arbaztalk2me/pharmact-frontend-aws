import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import {
  findOrdersByUser,
  updateOrderByCustomerCancel,
} from "../../services/CustomerServices";
import { getCurrentUserDetail } from "../../auth";
import { Card } from "primereact/card";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewOrders = () => {
  const navigate = useNavigate();
  let [orderUser, setOrderUser] = useState([]);
  useEffect(() => {
    let user = getCurrentUserDetail();
    findOrdersByUser(user.id)
      .then((resp) => {
        console.log(resp);
        setOrderUser(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let handleClick = (mid, oid) => {
    console.log(mid);
    console.log(oid);
    updateOrderByCustomerCancel(oid, mid)
      .then((data) => {
        console.log(data);
        toast.success("Your orders is cancelled");
        navigate("/customer/view-medicine");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Base>
      <div className="row offset-1 g-0 mt-5">
        <div className="col-md-10">
          <Card>
            <table className="table  table-hover  px-2">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Medicine Name</th>
                  <th scope="col">Medicine Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Prescription</th>
                  <th scope="col">Amount Paid</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Delivery Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orderUser.map((data) => {
                  return (
                    <tr key={data.id}>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.address}</td>
                      <td>{data.medicine.medicineName}</td>
                      <td>{data.medicine.medicinePrice}</td>
                      <td>{data.quantity}</td>
                      <td>
                        <a
                          target="_blank"
                          href={`http://13.50.215.124:8989/api/orders/${data.prescription}`}
                        >
                          See Prescription
                        </a>
                      </td>
                      <td>{data.amount}</td>
                      <td>{data.orderStatus}</td>
                      <td>{data.deliveredStatus}</td>
                      <td>
                        {data.orderStatus === "pending" ? (
                          <button
                            onClick={() =>
                              handleClick(data.medicine.id, data.id)
                            }
                            className="btn btn-outline-danger"
                          >
                            Cancel Order
                          </button>
                        ) : (
                          <button disabled className="btn btn-outline-danger">
                            Cancel Order
                          </button>
                        )}
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

export default ViewOrders;
