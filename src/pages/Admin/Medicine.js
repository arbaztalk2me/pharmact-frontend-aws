import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { addMedicine, getAllMedicine, handleMedicineDelete } from '../../services/AdminServices'
import {Card} from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const Medicine = () => {
  let[medicine,setMedicine]=useState([]);
  let [medData,setMedData]=useState({
    medicineName:"",
    quantity:"",
    medicinePrice:""
  })
  let[error,setError]=useState({});
  useEffect(()=>{
    getAllMedicine().then((data)=>{
      console.log(data)
      setMedicine(data)
    }).catch((error)=>{
      console.log(error)
    })
  },[error])

  let handleCahnge=(e)=>{
    setMedData({...medData,[e.target.name]:e.target.value})
  }

  let handleClick=(id)=>{
    console.log(id)
    swal({
      title:"Are you sure ?",
      text: "Delete Medicine With Id "+id,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleMedicineDelete(id).then((data)=>{
          console.log(data);
          swal("Medicine is deleted with id "+id, {
            icon: "success",
          });
          setError({})
        }).catch((error)=>{
          console.log(error);
          toast.error("something went wrong on server")
        })
        
      } else {
        swal("Medicine Not Deleted");
      }
    });
  }

  let handleSubmit=(e)=>{
    e.preventDefault();
    let errors={};
    if(medData.medicineName.trim()===""){
      errors={...errors,medicineName:"must not be blank"}
    }
    if(medData.medicinePrice.trim()===""){
      errors={...errors,medicinePrice:"must not be blank"}
    }
    if(medData.quantity.trim()===""){
      errors={...errors,quantity:"must not be blank"}
    }if(Object.keys(errors).length!=0){
      setError(errors);
      return;
    }
    addMedicine(medData).then((data)=>{
      console.log(data);
      toast.success("Medicine added");
      setMedData({medicineName:"",
      quantity:"",
      medicinePrice:""})
      setError({})
    }).catch((error)=>{
      console.log(error)
      toast.error("something went wrong on server");
    })
  }
  
  return (
    <Base>
        <div className='row g-0 mt-5 offset-1'>
          <div className='col-md-4 '>
          <Card className='text-center' title="Add New Medicine">
                        <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                                        <div className='mb-4'>
                                            <span className="p-float-label">
                                                <InputText onChange={handleCahnge} className={error.medicineName&&"p-invalid"}  value={medData.medicineName} name='medicineName' style={{width:"300px"}}  id="medicineName"  />
                                            <label htmlFor="medicineName">Medicine Name</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.medicineName}</span>
                                    </div>
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <InputText onChange={handleCahnge} className={error.quantity&&"p-invalid"}   value={medData.quantity} name='quantity' style={{width:"300px"}}  id="quantity"  />
                                            <label htmlFor="quantity">Quantity</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.quantity}</span>
                                        
                                    </div>
                                
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <InputText onChange={handleCahnge} className={error.medicinePrice&&"p-invalid"}  name='medicinePrice' value={medData.medicinePrice} style={{width:"300px"}} id='medicinePrice' />
                                            <label htmlFor="medicinePrice">Medicine Price</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.medicinePrice}</span>
                                    </div>
                                    
                                
                                        <Button label="Add New Medicine" icon="pi pi-user-plus" rounded text raised/>
                        </form>
                    </Card>
          </div>
          
          <div className='col-md-6 ms-5'>
          <h2 className='text-center'>Medicine Data</h2>
            <div className="card px-2">
            <table className="table  table-hover  px-2">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Medicine Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              {medicine.map((data)=>{
                  
                  return <tr key={data.id}>
                    <th scope="row">{data.id}</th>
                    <td>{data.medicineName}</td>
                    <td>{data.quantity}</td>
                    <td>{data.medicinePrice}</td>
                    <td><button onClick={()=>handleClick(data.id)}  className='btn btn-outline-danger btn-sm'>delete</button>|<Link to={`/admin/updateMedicine/${data.id}`}  className='btn btn-outline-warning btn-sm'>Update</Link></td>
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

export default Medicine