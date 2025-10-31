import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProtectedRoute from "./routes/ProtectedRoutes";
import CheckoutPage from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import SingleProduct from "./pages/SingleProduct";
import UserDashboard from "./pages/Dashboard";
import ContactPage from "./pages/Contact";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<SingleProduct />} />
        
         <Route  path="/cart"  element={ <ProtectedRoute > <Cart />   </ProtectedRoute>   } />
         <Route  path="/checkout"  element={ <ProtectedRoute > <CheckoutPage />   </ProtectedRoute>   } />
          <Route  path="/order-summary"  element={ <ProtectedRoute > <OrderSummary />   </ProtectedRoute>   } />
          <Route  path="/dashboard"  element={ <ProtectedRoute > <UserDashboard />   </ProtectedRoute>   } />
          
          <Route path="/orders"element={<Orders /> }/>
        </Routes>
      </Router>
    
  );
}

export default App;


