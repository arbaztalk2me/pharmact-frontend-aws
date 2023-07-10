import { myAxios, privateAxios } from "./helper"


export const singupUser=(data)=>{
    return myAxios.post("/api/user/addUser",data).then((response)=>response.data)
}

export const login=(user)=>{
    return myAxios.post("/generate-token",user).then((response)=>response.data)
}

export const getCurrentUser=()=>{
    return privateAxios.get("/current-user").then((response)=>response.data)
}

export const updateUserInfo=(data,id)=>{
    return privateAxios.put(`/api/user/updateUser/${id}`,data).then((response)=>response.data);
}

export const getCurrentUserById=(id)=>{
    return myAxios.get(`/api/user/getUserById/${id}`).then((response)=>response.data);
}