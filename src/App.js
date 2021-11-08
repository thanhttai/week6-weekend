import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Switch } from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicNavbar from "./components/PublicNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage.js/ProfilePage";
import CartPage from "./pages/CartPage/CartPage";
import HomePage from "./pages/HomePage";
import { Placeholder } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import UpdateLogin from "./pages/UpdateLogin/UpdateLogin";

// import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Placeholder as="p" animation="glow">
      <Placeholder xs={12} >
        <PublicNavbar />
        </Placeholder>
    </Placeholder>
    <ToastContainer />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/update-login" element={<UpdateLogin />} />
        <Route exact path="/login" element={<LoginPage />} /> 
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/product/:id" element={<DetailPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
