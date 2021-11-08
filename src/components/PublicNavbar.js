import React, { useEffect, useState } from "react";
import {Navbar, Container, FormControl, Nav, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {useNavigate} from 'react-router-dom';
import productAction from "../redux/actions/product.action";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import './PublicNavBar.css'
import userAction from "../redux/actions/user.action";


const PublicNavbar = () => {
    const [query, setQuery] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const limit = 10;

    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(productAction.getAllProduct({pageNum, limit, query}));
    }
    const user = useSelector((state) => state.user.user);
    useEffect(() => {
      dispatch(userAction.getCurrentUser());
    }, []);
    console.log(user, 'haha userrr neee')
    return (
        <div>
           <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#" className="logo">Pluton</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/cart"><FontAwesomeIcon icon={faShoppingCart} />Cart</Nav.Link>
                    
                    {/* <Nav.Link as={NavLink} to="/profile">Profile Page</Nav.Link> */}
                </Nav>
                {
                    user && <div>
                        <div style={{display:'inline-block'}}>{user.name}</div> 
                        <Nav.Link as={NavLink} to="/update-login" style={{display:'inline-block'}}>
                        <img src={user.avatarUrl} style={{width:'40px', margin:'0 20px', borderRadius: '50%'}}/>
                        </Nav.Link>
                    </div>
                }
                <Form className="d-flex" onSubmit={handleSubmit}>
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleSearchChange}
                    />
                    <Button as={NavLink} to="/product" onClick={handleSubmit} className="btn-me">Search</Button>
                    
                </Form>
                <Nav.Link as={NavLink} to="/register" style={{color:'#000'}}>Sign up</Nav.Link>
                    <Nav.Link as={NavLink} to="/login" style={{color:'#000'}}>Log in</Nav.Link>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}

export default PublicNavbar
