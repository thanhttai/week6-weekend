import React, {  useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import authAction from "../../redux/actions/auth.action";
import userAction from "../../redux/actions/user.action";
import "./LoginPage.css";
// import userAction from "../../redux/actions/user.action";
const LoginPage = () => {
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
    dispatch(userAction.getCurrentUser())
  };
  
 
    // dispatch(userAction.getCurrentUser())
  
//   const user = useSelector((state) => state.user.user);
//   useEffect(() => {
//     dispatch(userAction.getCurrentUser());
//   }, []);

// console.log(user,'get useerrrrrr')
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
