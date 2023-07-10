import React from 'react'
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminPrivateRoute = () => {
    const user=getCurrentUserDetail();
    if(isLoggedIn()&&user?.role=="ROLE_ADMIN"){
        console.log(user);
        return <Outlet/>
    }else{
        doLogout(()=>{
            toast.error("logged out because of unethical doing")
        })
        return <Navigate to="/login"/>
    }
  
}

export default AdminPrivateRoute