import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../Component/Home.css";
import { Link, useParams} from "react-router-dom";
import axios from "axios";


const getImage = (fileName) => require(`../Assets/${fileName}`);

const menuItems = [
  {
    name: "BIRIYANI",
    price: 150,
    image: getImage("biriyani.jpeg"),
    description: "Spicy Hyderabadi dum biriyani cooked with basmati rice.",
    delivery: "30 mins",
    rating: "⭐4.5/5",
  },
  {
    name: "FRIED RICE",
    price: 100,
    image: getImage("friedrice2.jpeg"),
    description: "Aromatic fried rice with vegetables and sauces.",
    delivery: "20 mins",
    rating: "⭐4.4/5",
  },
  {
    name: "PAROTTA",
    price: 15,
    image: getImage("parotta.jpeg"),
    description: "Flaky, soft layered flatbread perfect with curry.",
    delivery: "15 mins",
    rating: "⭐4.6/5",
  },
  {
    name: "KUSHKA",
    price: 50,
    image: getImage("kushka.jpeg"),
    description: "South Indian plain biriyani with spices.",
    delivery: "20 mins",
    rating: "⭐4.5/5",
  },
  {
    name: "MEALS",
    price: 90,
    image: getImage("meals.jpeg"),
    description: "South Indian meals: rice, sambar, curry, and curd.",
    delivery: "25 mins",
    rating: "⭐4.7/5",
  },
  {
    name: "CURD RICE",
    price: 50,
    image: getImage("curd.jpg"),
    description: "Creamy curd rice with pickle and pappad.",
    delivery: "15 mins",
    rating: "⭐4.8/5",
  },
];
function Home() {
  const { id } = useParams();
  // const navigate = useNavigate();

  const addToCart = (name, price, image) => {
    if (!id) {
      alert("User ID not found!");
      return;
    }

    axios.post(`https://backend-bestdelivery-test.onrender.com/additem/${id}`, {
        cusid: id,
        proname: name,
        proprice: price,
        proimg: image,
        overallquantity: 1,
        total: price,
      })
      .then((res) => {
        if (res.data.message === 'Product already in cart') {
          alert('Product already in cart');
        } else {
          alert(`${res.data.proname} added to cart!`);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error adding product to cart.');
      });
  };
  return (
    <div>
      <nav className="navbar">
        <h2 className="h21">🍽️BEST DELIVERY</h2>
        <a href="#menus" className="menulist">Menu List</a>
        <a href="#about" className="aboutus-1">About Us</a>
        <Link to="/login" className="log-in">Log In</Link>
        <Link to={`/cart/${id}`} className="cart"><i className="fa fa-shopping-cart"></i> Cart</Link>
      </nav>
      <div className="img-1"></div>
      <h1 className="menus-1" id="menus">Our Menus</h1>
      <div className="container my-5">
        <div className="row g-4">
          {menuItems.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card-2">
                <img src={item.image} className="card-img-1" alt={item.name} />
                <div className="card-body text-center">
                  <h5 className="card-tittle">{item.name}</h5>
                  <p className="card-text1">
                    <strong>Description:</strong> {item.description}<br /><br />
                    <strong>Delivery:</strong> {item.delivery} &nbsp; 
                    <strong>Rating:</strong> {item.rating}
                  </p>
                  <h6 className="samp">
                    Rs: <i className="fa-solid fa-indian-rupee-sign"></i> {item.price}
                  </h6>
                  <button id="button" onClick={() => addToCart(item.name, item.price, item.image)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="container my-5" id="about">
        <h3 id="abt">About Us</h3>
        <div className="about-us">
          <p>
            Welcome to <strong>Best Delivery</strong> – your go-to food delivery service!
            We're passionate about connecting people with their favorite meals from the best restaurants in town.
            Founded in 2025, Best Delivery was built to make food delivery fast, easy, and enjoyable.
            We partner with local restaurants to bring you a wide variety of dishes delivered hot and fresh.
            Our mission is simple: <em>Deliver happiness in every bite.</em>
            With a user-friendly app, real-time tracking, and responsive support, we aim to provide a smooth experience.
            Thank you for choosing Best Delivery. We're here to feed your cravings – one delivery at a time!
          </p>
        </div>
      </div>

      <div className="about-us-2">
        <div className="abts">
          <h4>Who We Are</h4>
          <p>
            At <strong>Best Delivery</strong>, we’re more than just a food delivery app—we’re a team on a mission to bring joy to your table.
            Founded in 2025 by a group of food lovers and tech enthusiasts, Best Delivery was created to make ordering your favorite meals fast, reliable, and fun.
          </p>
        </div>
        <div className="abts">
          <h4>What We Do</h4>
          <p>
            We connect hungry customers with local restaurants and cloud kitchens through our easy-to-use mobile and web apps.
            Whether you're in the mood for a spicy biryani, a cheesy pizza, or a healthy salad, Best Delivery delivers it to your doorstep—hot and fresh.
          </p>
        </div>
      </div>

      <h4>Why Choose Us?</h4>
      <div className="abts-1">
        <p className="abts-2"><i className="fa-regular fa-hand-point-right"></i> 
          Because we care—about your time, your food, and your satisfaction.
          Our platform is built for speed and simplicity, so you spend less time waiting and more time enjoying.
          We work closely with restaurant partners to ensure quality service every time.
        </p>
        <p className="abts-2"><i className="fa-regular fa-hand-point-right"></i>
          Join thousands of happy customers who trust Best Delivery for every meal—from weekday lunch rushes to weekend family feasts.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>We bring fresh, fast, and delicious food to your doorstep.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light">Home</a></li>
                <li><a href="#menus" className="text-light">Menu</a></li>
                <li><a href="#" className="text-light">Contact</a></li>
                <li><a href="#" className="text-light">FAQ</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <p>Email: <a href="mailto:support@example.com" className="text-light">support@example.com</a></p>
              <p>Phone: <a href="tel:+1234567890" className="text-light">+1 234 567 890</a></p>
            </div>
          </div>
          <div className="row mt-3 text-center">
            <div className="col">
              <p>&copy; 2025 Your Delivery App. All rights reserved.</p>
              <p><a href="#" className="text-light">Privacy Policy</a> | <a href="#" className="text-light">Terms & Conditions</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Home;
