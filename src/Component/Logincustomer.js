

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Component/Logincustomer.css';
import { useParams } from 'react-router-dom';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobile || !password) {
      alert("Please enter both mobile number and password.");
      return;
    }
    axios.post(`https://backend-bestdelivery-test.onrender.com/customer/login`, { mobile, password })
      .then((res) => {
        alert("login successful");
        
        const cusid = res.data._id;
        console.log(res.data)
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate(`/home/${cusid}`);
      })
      .catch((err) => {
        if (err.response?.status === 500) {
          alert(err.response.data.message);
        } else {
          console.error(err);
          alert("Login failed. Please try again later.");
        }
      });
  };

  return (
    <div className="container-fluid background">
      <div className="form-box1">
        <h1 className="aj">🍽️ Best Delivery</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="mobile" className="label2">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your number"
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />

          <label htmlFor="password" className="van1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="cv2">Login</button>
        </form>

        <p className="login-text1">
          Don't have an account? <Link to="/" className="login-text2">Register</Link>
        </p>
      </div>
    </div>
  );
}
