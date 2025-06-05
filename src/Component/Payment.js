
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Payment.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/getcart/${id}`)
      .then(res => {
        if (res.data.length === 0) {
          alert("Cart is empty. Redirecting...");
          navigate(`/cart/${id}`);
        } else {
          setCart(res.data);
        }
      })
      .catch(err => {
        console.error("Error fetching cart in payment page:", err);
        alert("Failed to load cart. Try again later.");
      });
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleCardChange = (e) => {
    setCardDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const subtotal = cart.reduce((sum, item) => sum + item.proprice * item.overallquantity, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert("Please fill all card details.");
      return;
    }
    if (paymentMethod === 'upi' && !upiId) {
      alert("Please enter UPI ID.");
      return;
    }
   const orderData = cart.map(item => ({
  cusid: String(id),
  proname: item.proname,
  proprice: item.proprice,
  overallquantity: item.overallquantity,
  name: `${formData.firstName} ${formData.lastName}`,
  email: formData.email,
  phone: Number(formData.phone),
  address: formData.address,
  paymentmethods: paymentMethod,
  grandtotal: Number(total.toFixed(2)),
}));
    try {
      setSubmitting(true);
      await axios.post(`http://localhost:5000/orders/${id}`, { orders: orderData });
      console.log("Sending orders:", orderData);
      alert(`Payment Successful via ${paymentMethod.toUpperCase()}`);
      navigate("/Success");
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Failed to place the order. Try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Checkout & Payment</h2>
      <div className="row">
        {/* Billing Form */}
        <div className="col-md-6 mb-4">
          <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm">
            <h5>Billing Information</h5>
            <div className="d-flex gap-2">
              <input type="text" name="firstName" className="form-control" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
              <input type="text" name="lastName" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
            </div>
            <div className="mt-3 d-flex gap-2">
              <input type="email" name="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
              <input type="tel" name="phone" className="form-control" placeholder="Phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div className="mt-3">
              <textarea name="address" className="form-control" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
            </div>

            <h5 className="mt-4">Payment Method</h5>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
              <label className="form-check-label">Credit/Debit Card</label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="radio" name="paymentMethod" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
              <label className="form-check-label">UPI</label>
            </div>

            {paymentMethod === 'upi' && (
              <input type="text" className="form-control mt-2" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
            )}
            {paymentMethod === 'card' && (
              <div className="mt-3">
                <input type="text" name="number" className="form-control mb-2" placeholder="Card Number" value={cardDetails.number} onChange={handleCardChange} required />
                <div className="d-flex gap-2">
                  <input type="text" name="expiry" className="form-control" placeholder="MM/YY" value={cardDetails.expiry} onChange={handleCardChange} required />
                  <input type="password" name="cvv" className="form-control" placeholder="CVV" value={cardDetails.cvv} onChange={handleCardChange} required pattern="\d{3,4}" />
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-success w-100 mt-3" disabled={submitting}>
              {submitting ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <div className="p-4 bg-white rounded shadow-sm">
            <h4 className="mb-4">Order Summary</h4>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {cart.map((item, index) => (
                    <div key={item._id || index} className="d-flex mb-3 border-bottom pb-2">
                      <div>
                        {item.proimg ? (
                          <img src={item.proimg} alt={item.proname} className="img-fluid" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                        ) : (
                          <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', borderRadius: '8px' }}>No Image</div>
                        )}
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-1">{item.proname}</h6>
                        <small>₹{item.proprice.toFixed(2)} × {item.overallquantity}</small><br />
                        <strong>₹{(item.proprice * item.overallquantity).toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Subtotal</h6>
                  <h6>₹{subtotal.toFixed(2)}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6>Tax (15%)</h6>
                  <h6>₹{tax.toFixed(2)}</h6>
                </div>
                <div className="d-flex justify-content-between mt-2 border-top pt-2">
                  <h5>Total</h5>
                  <h5>₹{total.toFixed(2)}</h5>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
