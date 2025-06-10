import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Component/Registercustomer.css';
import axios from 'axios';


export default function Register() {
  const [mobile , setmobile ] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

 const handlesubmit = (e) => {
  e.preventDefault(); 

  if (!mobile || !password) {
    alert("Please enter both mobile number and password.");
    return;
  }

  axios.post("http://localhost:5000/addcustomer", { mobile, password })
    .then((res) => {
      // const cusid = res.data._id;
      console.log('Registration success, navigating to login...');
      navigate(`/login`);
    })
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message);
      } else {
        console.error(err);
        alert("An error occurred. Please try again later.");
      }
    });
};

  return (
    <>
      <div className="background">

      <div className="form-box">
        <h1 className="sk">🍽️ Best Delivery</h1>
        <h2>Register</h2>
          <label htmlFor="name" className='label1'>Mobile Number</label>
          <input type="number" id="name" placeholder="Enter your number" onChange={(e)=>{setmobile(e.target.value)}} pattern="[0-9]{10}" required />

          <label htmlFor="mobile" className="van">Password</label>
          <input type="text" id="mobile" placeholder="Enter your password" onChange={(e)=>{setpassword(e.target.value)}} required />

          <button className='cv' onClick={handlesubmit}>Register</button>

        <p className="login-text">Already have an account?  <Link to={'/login'}>Login</Link></p>
      </div>
      </div>
    </>
  );
}



