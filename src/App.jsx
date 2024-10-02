import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;

// App.js
/*
Limitations:
1. The API does not support pagination with query parameters. 
2. The search functionality works based on the product title only.
3. No error handling for network requests.
4. The app may not handle large datasets efficiently due to the batch size of 10.
5. Limited category support based on the available categories from the API.
6. User login and signup facility is not available right now.
*/
