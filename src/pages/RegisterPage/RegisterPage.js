import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import authAction from "../../redux/actions/auth.action";

const RegisterPage = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = dataForm;
  const handleOnChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authAction.register({ name, email, password }));
  };

  return (
    <div className="page-100" style={{padding: '50px 200px'}}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={handleOnChange}
          />
        </Form.Group>
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
        <div className="under-container" style={{marginTop:"1rem", borderTop: "1px solid lightgray", paddingTop:"1rem"}}>
            <Form.Label><strong>Or sign up with </strong></Form.Label>
            <br />
            <a href="https://ecommer-thanhttri.herokuapp.com/api/users/loginwithgoogle" style={{textDecoration:"none", color:"#DB4437"}}><strong>Google</strong></a>
            <br />
            <a href="https://ecommer-thanhttri.herokuapp.com/api/users/loginwithfacebook"style={{textDecoration:"none", color:"#4267B2" }}><strong>Facebook</strong></a>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
