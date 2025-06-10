import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Component/Cart.css';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  async function fetchCart  ()  {
    try {
      const response = await axios.get(`http://localhost:5000/getcart/${id}`);
      const updatedCart = response.data.map(item => ({
        ...item,
        itemTotal: item.proprice * item.overallquantity,
      }));
      setCart(updatedCart);
      // Calculate grand total
      const total = updatedCart.reduce((sum, item) => sum + item.itemTotal, 0);
      setGrandTotal(total);
    } catch (error) {
      console.error('Error fetching cart:', error);
      alert('Failed to load cart. Please try again later.');
    }
  };
  useEffect(() => {
    if (!id) {
      alert('User ID missing in URL.');
      navigate('/login');
    } else {
      fetchCart();
    }
  }, [id]);
  // Update quantity
 const updateQuantity = async (itemId, change) => {
  try {
    console.log(`Updating quantity for item ${itemId} by ${change}`);
    const response = await axios.put(`http://localhost:5000/updatequantity/${itemId}`, { change });
    if (response.data.success) {
      fetchCart(); 
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
    alert('Failed to update quantity.');
  }
};
  // Remove item
  const removeItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;

    try {
      await axios.delete(`http://localhost:5000/removeitem/${itemId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item.');
    }
  };
  // Navigate to payment page
  const checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate(`/payment/${id}`);
  };
  return (
    <div className="container my-5">
      <h2 className="mb-4">🛒 Your Cart</h2>
      <Link to={"/home/:id"}className='cart-head'>Home</Link>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Price (Rs)</th>
                <th>Quantity</th>
                <th>Total (Rs)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className='scroll'>
              {cart.map((item) => (
                <tr key={item._id || item.proname}>
                  <td>
                    <img
                      src={item.proimg || "default.jpg"}
                      onError={(e) => (e.target.src = "default.jpg")}
                      alt={item.proname}
                      style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </td>
                  <td>{item.proname}</td>
                  <td>{item.proprice}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => updateQuantity(item._id, -1)}
                      disabled={item.overallquantity <= 1}
                      aria-label={`Decrease quantity of ${item.proname}`}
                    >
                      -
                    </button>
                    {item.overallquantity}
                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={() => updateQuantity(item._id, 1)}
                      aria-label={`Increase quantity of ${item.proname}`}
                    >
                      +
                    </button>
                  </td>
                  <td>{item.itemTotal}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-end mt-4">Grand Total: ₹ {grandTotal}</h4>
          <div className="text-end mt-3">
            <button className="btn btn-success" onClick={checkout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
