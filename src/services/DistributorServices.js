import { myAxios, privateAxios } from "./helper";

export const getAllUndeliverOrders = (id) => {
  return myAxios
    .get(`http://13.50.215.124:8989/api/orders/getAllUndeliveredOrders/${id}`)
    .then((resp) => resp.data);
};

export const getAllDeliveredOrders = (id) => {
  return myAxios
    .get(`http://13.50.215.124:8989/api/orders/getAllDeliveredOrders/${id}`)
    .then((resp) => resp.data);
};

export const updateDelievery = (id, userId) => {
  return privateAxios
    .put(
      `http://13.50.215.124:8989/api/orders/updateOrderByDistributor/${id}/distributor/${userId}`
    )
    .then((resp) => resp.data);
};
