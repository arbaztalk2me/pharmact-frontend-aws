import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Cart = () => {
  let [cartData, setCartData] = useState([]);
  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cart")));
  }, []);

  let handleClick = (id) => {
    let arr = cartData.filter((med) => med.id !== id);
    localStorage.setItem("cart", JSON.stringify(arr));
    setCartData(arr);
  };

  return (
    <Base>
      <div className="row g-0 offset-2 mt-5">
        <div className="col-md-8">
          <Card>
            <h2 className="text-center">Your Cart Items</h2>
            <table className="table  table-hover  px-2">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Medicine Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartData?.map((data) => {
                  return (
                    <tr key={data.id}>
                      <th scope="row">{data.id}</th>
                      <td>{data.medicineName}</td>
                      <td>{data.quantity}</td>
                      <td>{data.medicinePrice}</td>
                      <td>
                        <Button
                          size="small"
                          text
                          raised
                          severity="danger"
                          label="Remove"
                          onClick={() => handleClick(data.id)}
                        ></Button>
                        |
                        <Link
                          to={`/customer/add-orders/${data.id}/${data.quantity}`}
                        >
                          <Button
                            text
                            raised
                            size="small"
                            label="Order Now"
                          ></Button>
                        </Link>
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

export default Cart;
