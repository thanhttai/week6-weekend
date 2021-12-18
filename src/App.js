import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Switch } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicNavbar from "./components/PublicNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage.js/ProfilePage";
import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage";

import { ToastContainer } from 'react-toastify';
import UpdateLogin from "./pages/UpdateLogin/UpdateLogin";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import UserListPage from "./pages/UserListPage";
import ProductListPage from "./pages/ProductListPage";
import OrderPage from "./pages/OrderPage";
import NewPage from "./pages/newPage";
import Footer from "./components/Footer"
import { useSelector } from "react-redux";
// import PrivateRoute from "./routes/PrivateRoute";

function App() {

 const admin = useSelector(state => state?.user?.userLocal?.role)
 const user = useSelector(state => state?.user?.userLocal)
  

  return (
    <>
    
    <Router>
    { <PublicNavbar /> }
    <ToastContainer />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/products" element={<ProductsPage />} />
        <Route exact path="/products/:id" element={<DetailPage />} />
        <Route exact path="/about" element={<AboutPage />} />
        {user ? <Route exact path="/checkout" element={<CheckoutPage />} /> : null}
        <Route exact path="/payment" element={<PaymentPage />} />
        <Route exact path="/placeorder" element={<PlaceOrderPage />} />
        {admin === 'admin'?  <Route exact path="/admin/userlist" element={<UserListPage />} />: null}
        {admin === 'admin'? <Route exact path="/admin/productlist" element={<ProductListPage />} />: null}
        {admin === 'admin'? <Route exact path="/admin/orderlist" element={<OrderPage />} />: null}
        <Route exact path="/update-login" element={<UpdateLogin />} />
        <Route exact path="/login" element={<LoginPage />} /> 
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/newpage" element={<NewPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    <Footer />
    </Router>

    </>
  );
}

export default App;
