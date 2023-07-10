import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import { getAllMedicine } from '../../services/CustomerServices'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const ViewMedicine = () => {
    let[medicine,setMedicine]=useState([]);
    useEffect(()=>{
        getAllMedicine().then((data)=>{
            setMedicine(data);
        }).catch((error)=>{
            console.log(error);
        })
    },[])
   
  return (
    <Base>
        <div className='row g-0 offset-2 mt-5'>
            <div className='col-md-8'>
            <Card>
            
                    
            <h2 className='text-center'>Available Medicine</h2>
            
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
                    <td><Link to={`/customer/add-to-cart/${data.id}`}><button className='btn btn-outline-primary small'>Add to Cart</button></Link></td>
                </tr>
              })}
              </tbody>
              </table>
            </Card>
            </div>
        </div>
    </Base>
  )
}

export default ViewMedicine