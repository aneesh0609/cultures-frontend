import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
// import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/cart"
            element={
              
                <Cart />
              
            }
          />
          <Route
            path="/orders"
            element={
              
                <Orders />
              
            }
          />
        </Routes>
      </Router>
    
  );
}

export default App;


