import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cartActions from "../../redux/actions/cart.action";
import userActions from "../../redux/actions/user.action";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const CartPage = () => {
    const navigate = useNavigate();
  
    const handleClickProduct = (productId) => {
      navigate(`/product/${productId}`);
    };
  
    const dispatch = useDispatch();
    const removeProduct = (productId) => {
      dispatch(cartActions.deleteCart(productId));
    };
   
    const handleCheckOut = () => {
      dispatch(userActions.postOrder());
      // dispatch(userActions.getCurrentUser());
  }
  


    const loading = useSelector(state => state.carts.loading);
    const products = useSelector(state => state.carts.cartBooks);
    
    useEffect(() => {
      dispatch(cartActions.getCart());
    }, []);

    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className="text-center">Your Cart</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            {loading ? (
              <div className="text-center">
                <ClipLoader color="#f86c6b" size={150} loading={true} />
              </div>
            ) : (
              <ul className="list-unstyled d-flex flex-wrap justify-content-between" style={{display:"flex", flexDirection:"column", justifyContent:"center" }}>
                {products && products.map((product) => (
                  <li key={product._id}>
                    <Card
                      style={{
                        width: "60vw",
                        marginBottom: "2rem",
                        position: "relative",
                        display: "flex",
                        flexDirection:"row",
                        alignContent: "space-around"
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={product.productId.imageUrls[0]}
                        onClick={() => handleClickProduct(product.productId._id)}
                        style={{width:"100px"}}
                      />
                      <Card.Body style={{marginLeft:"100px"}}>
                        <Card.Title>Product: {product.productId.name}</Card.Title>
                        <Card.Text>By: {product.productId.description}</Card.Text>
                        <Card.Text>Quantity: {product.quantity}</Card.Text>
                        <Button
                          className="position-absolute btn-danger"
                          style={{ top: "5px", right: "5px" }}
                          size="sm"
                          onClick={() => removeProduct(product._id)}
                        >
                          &times;
                        </Button>
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
            <div style={{textAlign:"right", width:"60vw"}}>
                Total Order Quantity: {products && products.length}
            </div>
            <div style={{textAlign:"right", width:"60vw", marginTop:"2rem"}}>
            <Button onClick={handleCheckOut}>Checkout</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default CartPage;
  
