import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { deleteUserWithId, getAllCustomer } from '../../services/AdminServices'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Card} from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

import { toast } from 'react-toastify';
import { singupUser } from '../../services/UserServices';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


const Customers = () => {
  const navigate=useNavigate();
  let [newCustomer,setNewCustomer]=useState({
    name:"",
    email:"",
    password:"",
    role:"ROLE_CUSTOMER"
  })

  let [error,setError]=useState({});

  let[customer,setCustomer]=useState([]);
  useEffect(()=>{
    getAllCustomer().then((data)=>{
      console.log(data);
      setCustomer(data);
    }).catch((error)=>{
      console.log(error);
    })
  },[error])
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

    let handleSubmit=(e)=>{
      e.preventDefault();
      let errors={};
        if(newCustomer.name.trim()===""){
            errors={...errors,name:"name must be enter"}
        }
        if(newCustomer.email.trim()===""){
            errors={...errors,email:"email must be enter"}
        }
        if(newCustomer.password.trim()===""){
            errors={...errors,password:"password must be enter"}
        }
        if(Object.keys(errors).length!=0){
            
            setError(errors)
            return;
        }
        singupUser(newCustomer).then(()=>{
          setNewCustomer({
              "name":"",
              "email":"",
              "password":"",
              "role":"ROLE_CUSTOMER"
          })
          setError({})
          toast.success('🦄 Customer Added Success!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
              });
      }).catch((error)=>{
          console.log(error);
      })
    }

    

    let handleCahnge=(e)=>{
      setNewCustomer({...newCustomer,[e.target.name]:e.target.value})
    }

    let handleClick=(id)=>{
      console.log(id)
      swal({
        title:"Are you sure ?",
        text: "Delete Customer With Id "+id,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteUserWithId(id).then((data)=>{
            console.log(data);
            swal("Customer is deleted with id "+id, {
              icon: "success",
            });
            setError({})
          }).catch((error)=>{
            console.log(error);
            toast.error("something went wrong on server")
          })
          
        } else {
          swal("Customer Not Deleted");
        }
      });
    }

  return (
    <Base>
        <div className='row g-0 mt-5 offset-1'>
          <div className='col-md-4 '>
          <Card className='text-center' title="Add new Customer">
                        <form onSubmit={handleSubmit}  className='d-flex flex-column justify-content-center align-items-center'>
                                        <div className='mb-4'>
                                            <span className="p-float-label">
                                                <InputText className={error.name&&"p-invalid"} onChange={handleCahnge}  value={newCustomer.name} name='name' style={{width:"300px"}}  id="name"  />
                                            <label htmlFor="name">Your Name</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.name}</span>
                                    </div>
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <InputText className={error.name&&"p-invalid"} onChange={handleCahnge}  type='email'  value={newCustomer.email} name='email' style={{width:"300px"}}  id="email"  />
                                            <label htmlFor="email">Email</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.name}</span>
                                    </div>
                                
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <Password className={error.name&&"p-invalid"} onChange={handleCahnge}  name='password' value={newCustomer.password} strongRegex='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$' id='password'  header={header} footer={footer} />
                                            <label htmlFor="password">password</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.name}</span>
                                    </div>
                                    
                                
                                        <Button label="Add Customer" icon="pi pi-user-plus" rounded text raised/>
                        </form>
                    </Card>
          </div>
          
          <div className='col-md-6 ms-5'>
          <h2 className='text-center'>Customers Data</h2>
            <div className="card px-2">
              <table className="table  table-hover  px-2">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {customer.map((data)=>{
                  
                  return <tr key={data.id}>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.role}</td>
                    <td><button onClick={()=>handleClick(data.id)}  className='btn btn-outline-danger'>delete</button></td>
                </tr>
              })}
              </tbody>
              </table>
              
            </div>
          </div>
        </div>
    </Base>
  )
}

export default Customers