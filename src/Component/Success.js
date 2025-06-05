import { Link, useParams } from "react-router-dom";
import React from 'react';
import '../Component/Success.css';
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate();
  const param = useParams();
  navigate(`/home/${param.id}`);

  return (
    <div className="my-box-4">
    <div className="my-box-5">
      <img src="https://i.gifer.com/7efs.gif" className="success-image" alt="Success" height="350px" />
      <div className="total-box6">
        <h3 className="card-headind">Order Successful!</h3><br></br>
        <p><strong>Thank you for ordering.</strong></p>
        <p ><strong>Your food is on the way.</strong></p><br></br>
        <Link to="/Home/:id"><button className="success-button">Continue to Home</button></Link>
      </div>
    </div>
    </div>
  );
};

export default Success;
