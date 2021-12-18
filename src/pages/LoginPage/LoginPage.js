import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import authAction from "../../redux/actions/auth.action";
// import userAction from "../../redux/actions/user.action";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from "react-router";
import "./LoginPage.css";
import { Link } from "react-router-dom";
// import userAction from "../../redux/actions/user.action";
const LoginPage = () => {
  const navigate = useNavigate()
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = dataForm;
  const handleOnChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authAction.login({ email, password }));
    navigate(`/`)
 
  };
  const componentClicked=()=>{}
  const responseGoogle = (response) => {
    dispatch(authAction.loginGoogleRequest(response.tokenId));
  }

  const responseFacebook = (response) => {
    console.log(response);
    dispatch(authAction.loginFacebookRequest(response.id, response.accessToken));
  }
    // dispatch(userAction.getCurrentUser())
  
//   const user = useSelector((state) => state.user.user);
//   useEffect(() => {
//     dispatch(userAction.getCurrentUser());
//   }, []);

// console.log(user,'get useerrrrrr')
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const navigate = useNavigate()
  // const user = useSelector((state) => state?.user?.user)
  // console.log(user, 'phonggggg neeeee')
  // useEffect(() => {
  //   if(user){
  //     navigate(`/products`)
  //   }
  // },[])

  return (
      <div className="container__my">
        <div className="background"></div>
        <div className="register-form">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-tai">
          Submit
        </Button>
       <div className="btn-cont">
       <GoogleLogin
          clientId="33262219896-f2k6c9fp3t08tk98t4j8oov14teu46gn.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          className="gg-btn"
        
        />
        <FacebookLogin
          appId="640459850654165"
          autoLoad={false}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
          className="fb-btn"
        
          />
       </div>
       <Link to="/register" style={{color:'#000'}} className="margin">Create a new account</Link>
      </Form>
      
        </div>
      </div>
  );
};

export default LoginPage;
