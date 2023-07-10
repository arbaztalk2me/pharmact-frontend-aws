import { myAxios, privateAxios } from "./helper";

export const getAllMedicine = () => {
  return myAxios
    .get("http://13.50.215.124:8989/api/medicine/getAllMedicine")
    .then((resp) => resp.data);
};

export const getAllDistributor = () => {
  return myAxios
    .get("http://13.50.215.124:8989/api/user/getAllDistributor")
    .then((resp) => resp.data);
};

export const createOrders = (orderData) => {
  return privateAxios
    .post("http://13.50.215.124:8989/api/orders/addOrders", orderData)
    .then((resp) => resp.data);
};

export const pendingOrder = () => {
  return myAxios
    .get("http://13.50.215.124:8989/api/orders/getAllOrderByPending")
    .then((resp) => resp.data);
};

export const findOrdersByUser = (id) => {
  return myAxios
    .get(`http://13.50.215.124:8989/api/orders/getAllOrderByUser/${id}`)
    .then((resp) => resp.data);
};

export const updateOrderByCustomerCancel = (id, mid) => {
  return privateAxios
    .put(
      `http://13.50.215.124:8989/api/orders/updateOrderByCustomer/${id}/customer/${mid}`
    )
    .then((resp) => resp.data);
};
