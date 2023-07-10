import React from 'react'
import Base from '../components/Base'

const About = () => {
  return (
    <Base>
        <h1 className='text-center'>About Us</h1>
        <div className='row offset-4 g-0 text-center'>
            <div className='col-md-6'>
            <p ><strong>Who we are - India's most convenient online pharmacy</strong></p>
        <p>Pharmacy Portal is one of India’s most trusted pharmacies, dispensing quality medicines at reasonable prices to over 7 million happy customers – PAN India. At Pharmacy Portal, we help you look after your own health effortlessly as well as take care of loved ones wherever they may reside in India. You can buy and send medicines from any corner of the country - with just a few clicks of the mouse.</p>
        <p><strong>What we do – Offer fast online access to medicines with convenient home delivery</strong></p>
        <p>At Pharmacy Portal, we make a wide range of prescription medicines and other health products conveniently available all across India. Even second and third tier cities and rural villages can now have access to the latest medicines. Since we also offer generic alternatives to most medicines, online buyers can expect significant savings.</p>
            </div>
        </div>
    </Base>
  )
}

export default About