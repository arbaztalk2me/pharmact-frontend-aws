import React, { useState } from 'react'
import Base from '../components/Base'
import {Card} from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { getCurrentUser, login } from '../services/UserServices';
import { toast } from 'react-toastify';
import { doLogin } from '../auth/index';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const navigate=useNavigate()
    let[loginData,setLoginData]=useState({
        "username":"",
        "password":""
    })
    let [error,setError]=useState({});
    const header = <div className="font-bold mb-3">Pick a password</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>At least one special character</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );
    
    let handleChange=(e)=>{
        setLoginData({...loginData,[e.target.name]:e.target.value})
    }

    let handleSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        if(loginData.password===""){
            errors={...errors,password:"password must be filled"}
        }
        if(loginData.username===""){
            errors={...errors,username:"username must be filled"}
        }
        if(Object.keys(errors).length!=0){
            setError(errors);
            return;
        }
        
        login(loginData).then((data)=>{
            localStorage.setItem("token",data.token)
            console.log(data.token)
            getCurrentUser().then((response)=>{
                console.log(response)
                doLogin(response,()=>{
                    console.log("save to local storage");
                    if(response.role==="ROLE_CUSTOMER"){
                        navigate("/customer/dashboard");
                    }else if(response.role==="ROLE_ADMIN"){
                        navigate("/admin/dashboard");
                    }else if(response.role==="ROLE_DISTRIBUTOR"){
                        navigate("/distributor/dashboard");
                    }
                     
                })
                toast.success("login success")
            }).catch((error)=>{
                console.log(error);
                toast.error("Something went wrong on server");
                
            })
           
        }).catch((error)=>{
            console.log(error);
            toast.error("Something went wrong on server");
           
        })
        
    }

  return (
    <Base>
        <div style={{height:"85vh"}} className='row g-0 d-flex justify-content-center align-items-center'>
            <div className='col-md-5'>
                <div className="card">
                    <Card  title="Login Here"  >
                        <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                            
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <InputText type='email' value={loginData.username} name='username' onChange={handleChange} style={{width:"300px"}}  id="email"  />
                                            <label htmlFor="email">Email</label>
                                        </span>
                                        <span className='mt-1 p-error'>{error?.username}</span>
                                    </div>
                                
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <Password value={loginData.password} name='password' onChange={handleChange} strongRegex='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$' id='password'  header={header} footer={footer} />
                                            <label htmlFor="password">password</label>
                                        </span>
                                        <span className='mt-1 p-error'>{error?.password}</span>
                                    </div>
                                        
                                
                                        <Button label="Login" icon="pi pi-user" rounded text raised/>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    </Base>
  )
}

export default Login