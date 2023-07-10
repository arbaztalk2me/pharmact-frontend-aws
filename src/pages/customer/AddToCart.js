import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { useNavigate, useParams } from "react-router-dom";
import { getMedicineById } from "../../services/AdminServices";
import { toast } from "react-toastify";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { getAllDistributor } from "../../services/CustomerServices";

const AddToCart = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let [medicine, setMedicine] = useState({});
  let [addquantity, setAddQuantity] = useState(0);

  useEffect(() => {
    getMedicineById(id)
      .then((data) => {
        console.log(data);
        setMedicine(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong on server!!");
      });
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();

    if (addquantity > medicine.quantity) {
      toast.error("qty not available");
      return;
    }
    let val = {
      ...medicine,
      quantity: addquantity,
    };
    let cartObj = JSON.parse(localStorage.getItem("cart"));
    if (cartObj === null) {
      localStorage.setItem("cart", JSON.stringify([val]));
    } else {
      cartObj.push(val);
      localStorage.setItem("cart", JSON.stringify(cartObj));
    }
    toast.success("added to cart");
    navigate("/customer/view-medicine");
  };
  return (
    <Base>
      <div className="row offset-2 g-0 mt-5">
        <div className="col-md-8">
          <Card>
            <h2 className="text-center mb-3">Available Medicine</h2>
            <form
              onSubmit={handleSubmit}
              className=" mt-5 d-flex flex-column justify-content-center align-items-center"
            >
              <div className="mb-4">
                <span className="p-float-label">
                  <InputText
                    value={medicine.id}
                    name="id"
                    style={{ width: "300px" }}
                    disabled
                    id="id"
                  />
                  <label htmlFor="id">Medicine Id</label>
                  <br />
                </span>
              </div>
              <div className="mb-4">
                <span className="p-float-label">
                  <InputText
                    value={medicine.medicineName}
                    name="medicineName"
                    style={{ width: "300px" }}
                    disabled
                    id="medicineName"
                  />
                  <label htmlFor="medicineName">Medicine Name</label>
                  <br />
                </span>
              </div>
              <div className="mb-4">
                <span className="p-float-label">
                  <InputText
                    value={medicine.medicinePrice}
                    name="medicinePrice"
                    style={{ width: "300px" }}
                    disabled
                    id="medicinePrice"
                  />
                  <label htmlFor="medicinePrice">Medicine price</label>
                  <br />
                </span>
              </div>
              <div className="mb-4">
                <span className="p-float-label">
                  <InputText
                    value={medicine.quantity}
                    name="quantity"
                    style={{ width: "300px" }}
                    disabled
                    id="quantity"
                  />
                  <label htmlFor="quantity">Available Quantity</label>
                  <br />
                </span>
              </div>
              <div className="mb-4">
                <span className="p-float-label">
                  <InputText
                    value={addquantity}
                    name="addquantity"
                    style={{ width: "300px" }}
                    id="addquantity"
                    onChange={(e) => setAddQuantity(e.target.value)}
                  />
                  <label htmlFor="addquantity">Add Quantity</label>
                  <br />
                </span>
              </div>

              <Button>Add</Button>
            </form>
          </Card>
        </div>
      </div>
    </Base>
  );
};

export default AddToCart;
