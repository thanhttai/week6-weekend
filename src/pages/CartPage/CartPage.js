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
    const [productId, setproductId] = useState(false)
  
    const handleClickProduct = (productId) => {
      navigate(`/product/${productId}`);
    };
  
    const dispatch = useDispatch();
  
   
   


    const loading = useSelector(state => state.carts.loading);
    const products = useSelector(state => state.carts.cartBooks?.products);
    const idCart = useSelector(state => state.carts.cartBooks?._id);
    // const products = useSelector(state => state.carts.cartBooks);
    const handleCheckOut = () => {
      if(idCart){
        dispatch(userActions.postOrder(idCart));
      }
      // dispatch(userActions.getCurrentUser());
  }
  
    
    useEffect(() => {
      dispatch(cartActions.getCart());
    }, [dispatch]);

        const removeProduct = (id) => {
          if(id?.productId?._id && idCart){
            const productId =id?.productId?._id 
            setproductId(productId)
          }
        };
        useEffect(() =>{
            if(productId){

              dispatch(cartActions.deleteCart({ idCart}));
            }
        },[productId, dispatch]);

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
                        src={product.productId.photo}
                        onClick={() => handleClickProduct(product.productId._id)}
                        style={{width:"100px"}}
                      />
                      <Card.Body style={{marginLeft:"100px"}}>
                        <Card.Title>Product: {product.productId.name}</Card.Title>
                        <Card.Text>By: {product.productId.description}</Card.Text>
                        <Card.Text>Quantity: {product.qty}</Card.Text>
                        <Button
                          className="position-absolute btn-danger"
                          style={{ top: "5px", right: "5px" }}
                          size="sm"
                          onClick={() => removeProduct(product)}
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
  
