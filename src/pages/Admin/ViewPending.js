import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { pendingOrder } from "../../services/CustomerServices";
import { Card } from "primereact/card";
import { Link, useNavigate } from "react-router-dom";
import {
  getImageFile,
  updateCancelOrderByAdmin,
  updateOrderByAdmin,
} from "../../services/AdminServices";
import { toast } from "react-toastify";

const ViewPending = () => {
  let [pendingData, setPendingData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    pendingOrder()
      .then((data) => {
        console.log(data);
        setPendingData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let handleConfirmOrder = (id) => {
    console.log(id);
    updateOrderByAdmin(id)
      .then((data) => {
        console.log(data);
        toast.success("order confirm successfully");
        navigate("/admin/medicine");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  let handleCancelPending = (id, mid) => {
    updateCancelOrderByAdmin(id, mid)
      .then((data) => {
        console.log(data);
        toast.success("order Cancel successfully");
        navigate("/admin/medicine");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
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
                  <th scope="col">Quantity</th>
                  <th scope="col">Prescription</th>
                  <th scope="col">Amount Paid</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingData.map((data) => {
                  return (
                    <tr key={data.id}>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.address}</td>
                      <td>{data.medicine.medicineName}</td>
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
                      <td>
                        <button
                          onClick={() => handleConfirmOrder(data.id)}
                          className="btn btn-outline-success btn-sm"
                        >
                          Confirm
                        </button>
                        |
                        <button
                          onClick={() =>
                            handleCancelPending(data.id, data.medicine.id)
                          }
                          className="btn btn-outline-danger btn-sm"
                        >
                          Cancel
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

export default ViewPending;
