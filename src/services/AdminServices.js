import { myAxios, privateAxios } from "./helper";

export const getAllCustomer = () => {
  return myAxios
    .get("http://13.50.215.124:8989/api/user/getAllCustomer")
    .then((resp) => resp.data);
};

export const getAllDistributor = () => {
  return myAxios
    .get("http://13.50.215.124:8989/api/user/getAllDistributor")
    .then((resp) => resp.data);
};

export const deleteUserWithId = (id) => {
  return privateAxios
    .delete(`http://13.50.215.124:8989/api/user/deleteUserById/${id}`)
    .then((resp) => resp.data);
};

export const getAllMedicine = () => {
  return myAxios
    .get("http://13.50.215.124:8989/api/medicine/getAllMedicine")
    .then((resp) => resp.data);
};

export const addMedicine = (medicine) => {
  return privateAxios
    .post("http://13.50.215.124:8989/api/medicine/addMedicine", medicine)
    .then((resp) => resp.data);
};

export const handleMedicineDelete = (id) => {
  return privateAxios
    .delete(`http://13.50.215.124:8989/api/medicine/deleteMedicine/${id}`)
    .then((resp) => resp.data);
};

export const getMedicineById = (id) => {
  return myAxios
    .get(`http://13.50.215.124:8989/api/medicine/getMedicineById/${id}`)
    .then((respo) => respo.data);
};

export const updateMedicine = (medicine, medicineId) => {
  return privateAxios
    .put(
      `http://13.50.215.124:8989/api/medicine/updateMedicine/${medicineId}`,
      medicine
    )
    .then((resp) => resp.data);
};

export const updateOrderByAdmin = (id) => {
  return privateAxios
    .put(`http://13.50.215.124:8989/api/orders/updateOrderByAdmin/${id}`)
    .then((resp) => resp.data);
};

export const updateCancelOrderByAdmin = (id, mId) => {
  return privateAxios
    .put(
      `http://13.50.215.124:8989/api/orders/updateOrderByAdminCancel/${id}/admin/${mId}`
    )
    .then((resp) => resp.data);
};

export const getImageFile = (imageName) => {
  return myAxios.get(`http://13.50.215.124:8989/api/orders/${imageName}`);
};
