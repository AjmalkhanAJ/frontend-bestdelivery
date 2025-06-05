import './App.css';
import Registercustomer from './Component/Registercustomer';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Logincustomer from './Component/Logincustomer';
import Home from './Component/Home';
import Cart from './Component/Cart';
import Payment from './Component/Payment';
import Success from './Component/Success';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registercustomer/>}></Route>
        <Route path='/login' element={<Logincustomer/>}></Route>
        <Route path='/home/:id' element={<Home/>}></Route>
        <Route path='/cart/:id' element={<Cart/>}></Route>
        <Route path='/payment/:id' element={<Payment/>}></Route>
        <Route path='/success' element={<Success/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
