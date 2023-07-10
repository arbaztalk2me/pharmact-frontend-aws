import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import medicineImg from '../static/medicine-svgrepo-com.svg';
import onlineHomeImg from '../static/online-shop-ecommerce-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../auth';
const Homepage = () => {
    const header = (
        <img alt="Card" src={onlineHomeImg} />
    );
    let [flag,setFlag]=useState(false);
    useEffect(()=>{
        setFlag(isLoggedIn());
    },[])
    const footer = (
        <div className="flex flex-wrap justify-content-center gap-2">
            <Link to={"/login"}  >
                <Button label="Login" icon="pi pi-user" className='me-2 mb-2' />
            </Link>
            <Link to={"/signup"}  >
                <Button label="Signup" icon="pi pi-user-plus" className="mb-2 p-button-outlined p-button-secondary"/>
            </Link>
        </div>
    );
  return (
   <Base>
        <h1 className='text-center'>Welcome to Pharmacy Portal <img src={medicineImg} alt="Logo" width="40" height="40" /></h1>
     <div className='row g-0 offset-2'>
        {!flag &&<div className='col-md-4 d-flex justify-content-center align-items-center' style={{height:"80vh"}} >
            <div className="">
                <Card title="" subTitle="" footer={footer} className="md:w-15rem">
                </Card>
            </div>
        </div>}
        {flag &&<div className='col-md-4 d-flex justify-content-center align-items-center' style={{height:"80vh"}} >
            <div className="">
                <Card title="Explore The Sections" subTitle=""  className="md:w-15rem">
                    <Link className='text-decoration-none'>Check Customers <i className="pi pi-users me-1" style={{ fontSize: '0.9rem' }}></i></Link><br/>
                    <Link className="text-decoration-none">Check Distributors <i className="pi pi-sitemap me-1" style={{ fontSize: '0.9rem' }}></i></Link><br/>
                    <Link className='text-decoration-none' >Check Pending Orders <i className="pi pi-box me-1" style={{ fontSize: '0.9rem' }}></i></Link><br/>
                </Card>
            </div>
        </div>}
        <div className='col-md-6 d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
            <div className="card">
                <Card title="Hola! Welcome Back" header={header} className="px-5">
                    <p className="m-0">
                       Just One click away to Buy your Drugs!
                    </p>
                </Card>
            </div>
        </div>
     </div>
   </Base>
  )
}

export default Homepage