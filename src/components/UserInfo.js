import React, { useEffect, useState } from 'react'
import Base from './Base'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserDetail } from '../auth'
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { getCurrentUserById, updateUserInfo } from '../services/UserServices';
import { toast } from 'react-toastify';


const UserInfo = () => {
    
    let [userData,setUserData]=useState(null);
    let[error,setError]=useState({});
    const navigate=useNavigate();
    useEffect(()=>{
        const user=getCurrentUserDetail();
        getCurrentUserById(user.id).then((resp)=>{
          setUserData(resp);
        }).catch((error)=>{
          console.log(error);
          toast.error("semething went wrong on server");
        })
        
        console.log(userData)
        if(user===null || user===undefined){
           navigate("/login")
        }
    },[])
    let handleChange=(e)=>{
      setUserData({...userData,[e.target.name]:e.target.value});
      
    }
    let handleSubmit=(e)=>{
      e.preventDefault();
      let errors={};
        if(userData.password===""){
            errors={...errors,password:"password must be filled"}
        }
        if(userData.name===""){
            errors={...errors,name:"name must be filled"}
        }
        if(userData.email===""){
          errors={...errors,email:"email must be filled"}
      }
        if(Object.keys(errors).length!=0){
            setError(errors);
            return;
        }
      console.log(userData);
      updateUserInfo({name:userData.name,password:userData.password,email:userData.email},userData.id).then((resp)=>{
        console.log(resp);
        toast.success("Successfully update your info");
        
        navigate("/user-profile");
      }).catch((error)=>{
        toast.error("something went wrong");
        console.log(error);
      })
    }

  return (
    <Base>
        <div className='row g-0 offset-3 mt-5'>
          <div className='col-md-8'>
            <div className="card">
              <Card title="Your Profile Information ">
                  <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                  <div className='mb-4'>
                    <span className="p-float-label">
                        <InputText value={userData?.name} onChange={handleChange} type='text'  name='name'  style={{width:"300px"}}  id="name"  />
                        <label htmlFor="name">Your Name</label>
                    </span>
                    <span className='mt-1 p-error'>{error?.name}</span>
                  </div>
                  <div className='mb-4'>
                    <span className="p-float-label">
                        <InputText type='email' onChange={handleChange} value={userData?.email}  name='email'  style={{width:"300px"}}  id="email"  />
                        <label htmlFor="email">Email</label>
                        
                    </span>
                    <span className='mt-1 p-error'>{error?.email}</span>
                  </div>
                  <div className='mb-4'>
                    <span className="p-float-label">
                        <InputText type='password' onChange={handleChange} value={userData?.password}  name='password'  style={{width:"300px"}}  id="password"  />
                        <label htmlFor="password">password</label>
                    </span>
                    <span className='mt-1 p-error'>{error?.password}</span>
                  </div>
                  <div className='mb-4'>
                    <span className="p-float-label">
                        <InputText type='text' onChange={handleChange} disabled value={userData?.role}  name='role'  style={{width:"300px"}}  id="role"  />
                        <label htmlFor="role">role</label>
                    </span>
                  </div>
                  <Button>Update Info</Button>
                  </form>
              </Card>
          </div>
          </div>
        </div>
    </Base>
  )
}

export default UserInfo