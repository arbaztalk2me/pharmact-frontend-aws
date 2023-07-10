import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import { getMedicineById, updateMedicine } from '../../services/AdminServices';
import {Card} from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';

const UpdateMedicine = () => {
    const navigate=useNavigate();
    let {id}=useParams();
    let[medicine,setMedicine]=useState({})
    let [error,setError]=useState({})
    useEffect(()=>{
        console.log(id);
        getMedicineById(id).then((data)=>{
            console.log(data);
            setMedicine(data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])
    let handleSubmit=(e)=>{
        e.preventDefault();
        let errors={};
        if(medicine.medicineName.trim()===""){
        errors={...errors,medicineName:"must not be blank"}
        }
        if(medicine.medicinePrice+"".trim()===""){
        errors={...errors,medicinePrice:"must not be blank"}
        }
        if(medicine.quantity+"".trim()===""){
        errors={...errors,quantity:"must not be blank"}
        }if(Object.keys(errors).length!=0){
        setError(errors);
        return;
        }
        updateMedicine(medicine,id).then((data)=>{
            console.log(data);
            toast.success("updated Successfully");
            navigate("/admin/medicine")
        }).catch((error)=>{
            console.log(error);
            toast.error("Something went wrong on server")
        })
    }
    let handleCahnge=(e)=>{
        setMedicine({...medicine,[e.target.name]:e.target.value})
    }
  return (
    <Base>
        <div className='container mt-5'>
        <Card className='text-center' title="Update Medicine">
                        <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
                        <div className='mb-4'>
                                            <span className="p-float-label">
                                                <InputText  value={medicine.id} name='medicineNameid' style={{width:"300px"}} disabled  id="medicineNameid"  />
                                            <label htmlFor="medicineNameid">Medicine Id</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.medicineName}</span>
                                    </div>
                                        <div className='mb-4'>
                                            <span className="p-float-label">
                                                <InputText onChange={handleCahnge} className={error.medicineName&&"p-invalid"}  value={medicine.medicineName} name='medicineName' style={{width:"300px"}}  id="medicineName"  />
                                            <label htmlFor="medicineName">Medicine Name</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.medicineName}</span>
                                    </div>
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <InputText onChange={handleCahnge} className={error.quantity&&"p-invalid"}   value={medicine.quantity} name='quantity' style={{width:"300px"}}  id="quantity"  />
                                            <label htmlFor="quantity">Quantity</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.quantity}</span>
                                        
                                    </div>
                                
                                    <div className='mb-4'>
                                        <span className="p-float-label">
                                            <InputText onChange={handleCahnge} className={error.medicinePrice&&"p-invalid"}  name='medicinePrice' value={medicine.medicinePrice} style={{width:"300px"}} id='medicinePrice' />
                                            <label htmlFor="medicinePrice">Medicine Price</label><br/>
                                            
                                        </span>
                                        <span className='mt-1 p-error'>{error?.medicinePrice}</span>
                                    </div>
                                    
                                
                                        <Button label="Update Medicine" icon="pi pi-user-plus" rounded text raised/>
                        </form>
                    </Card>
        </div>
    </Base>
  )
}

export default UpdateMedicine