import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { deleteUserWithId, getAllDistributor } from '../../services/AdminServices';
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

const Distributor = () => {
  let [newDistributor,setNewDistributor]=useState({
    name:"",
    email:"",
    password:"",
    role:"ROLE_DISTRIBUTOR"
  })
  let[distributor,setDistributor]=useState([]);
  let[error,setError]=useState({});
  useEffect(()=>{
    getAllDistributor().then((data)=>{
      console.log(data);
      setDistributor(data);
    }).catch((error)=>{
      console.log(error);
    })
  },[error])

  let handleCahnge=(e)=>{
    setNewDistributor({...newDistributor,[e.target.name]:e.target.value})
  }

  let handleSubmit=(e)=>{
    e.preventDefault();
    let errors={};
    if(newDistributor.email.trim()===""){
      errors={...errors,email:"email must be enter"}
    }if(newDistributor.name.trim()===""){
      errors={...errors,name:"name must be enter"}
    }if(newDistributor.password.trim()===""){
      errors={...errors,password:"password must be enter"}
    }if(Object.keys(errors).length!=0){
      setError(errors);
      return;
    }

    singupUser(newDistributor).then(()=>{
      setNewDistributor({
          "name":"",
          "email":"",
          "password":"",
          "role":"ROLE_DISTRIBUTOR"
      })
      setError({})
      toast.success('🦄 Distributor Added Success!', {
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
    let handleClick=(id)=>{
      console.log(id)
      swal({
        title:"Are you sure ?",
        text: "Delete Distributor With Id "+id,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteUserWithId(id).then((data)=>{
            console.log(data);
            swal("Distributor is deleted with id "+id, {
              icon: "success",
            });
            setError({})
          }).catch((error)=>{
            console.log(error);
            toast.error("something went wrong on server")
          })
          
        } else {
          swal("Distributor Not Deleted");
        }
      });
    }
  return (
    <Base>
        <div className='row g-0 mt-5 offset-1'>
          <div className='col-md-4 '>
          <Card className='text-center' title="Add New Distributor">
                        <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                                        <div className='mb-4'>
                                            <span className="p-float-label">
                                                <InputText onChange={handleCahnge} className={error.name&&"p-invalid"}  value={newDistributor.name} name='name' style={{width:"300px"}}  id="name"  />
                                            <label htmlFor="name">Your Name</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.name}</span>
                                    </div>
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <InputText onChange={handleCahnge} className={error.name&&"p-invalid"} type='email'  value={newDistributor.email} name='email' style={{width:"300px"}}  id="email"  />
                                            <label htmlFor="email">Email</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.email}</span>
                                        
                                    </div>
                                
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <Password onChange={handleCahnge} className={error.name&&"p-invalid"}  name='password' value={newDistributor.password} strongRegex='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$' id='password'  header={header} footer={footer} />
                                            <label htmlFor="password">password</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.password}</span>
                                    </div>
                                    
                                
                                        <Button label="Add Distributor" icon="pi pi-user-plus" rounded text raised/>
                        </form>
                    </Card>
          </div>
          
          <div className='col-md-6 ms-5'>
          <h2 className='text-center'>Distributors Data</h2>
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
              {distributor.map((data)=>{
                  
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

export default Distributor