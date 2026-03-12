import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Carousel from './components/Carousel';
import './App.css';
import Products from './pages/Products';
import { ProductType } from './models/ProductType';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>ElectroMart</h1>
          <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "inactive")}>Home</NavLink>
            {
              Object.values(ProductType).map((type) => (
                <NavLink key={type} to={`/products/${type.toLowerCase()}`} className={({ isActive }) => (isActive ? "active" : "inactive")}>
                  {type}
                </NavLink>
              ))
            }
          </nav>

        </header>
        <Carousel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:type" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
