// src/pages/Cart.jsx
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { ThemeContext } from "../context/ThemeContext"; // Use ThemeContext

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  const { isDarkMode } = useContext(ThemeContext); // Access dark mode state

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className={`min-h-screen p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {cart.length > 0 ? (
        <div>
          {cart.map((item, index) => (
            <CartItem key={item.id} item={item} itemIndex={index} />
          ))}
          <div>
            <p>Total Items: {cart.length}</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Checkout Now
          </button>
        </div>
      ) : (
        <div>
          <h1>Cart Empty</h1>
          <Link to="/">
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
