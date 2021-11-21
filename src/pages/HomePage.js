import React, { useState, useEffect } from "react";
import {  Card, Col, Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import {useNavigate} from 'react-router-dom';
import PaginationBar from "../components/PaginationBar";
// import SearchForm from "../components/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import productAction from "../redux/actions/product.action";
import './Homepage.css'





const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const totalPage = 10;
  const limit = 10;

  const navigate = useNavigate();

  const handleClickProduct = (productId) => {
    navigate(`/product/${productId}`);
  };


  const dispatch = useDispatch();
  const products = useSelector(state => state?.product?.product);
  const loading = useSelector(state => state?.product?.loading);
  // const errorMessage = useSelector(state => state.products.errorMessage);
  useEffect(() => {
    dispatch(productAction.getAllProduct({pageNum, limit, query}));
  }, [dispatch, pageNum, limit, query]);
//  const position = document.documentElement
//  position.addEventListener("mousemove",e=>{
//    position.style.setProperty('--x',e.clientX + 'px');
//  })

  return (
    <div>
      <Container>
      <Row>
      <h1 className="text-center">Hello World!</h1>
      
      </Row>
      </Container>
      
        {/* <section>
        <div className="text">
          <h2><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span></h2>
          <h2><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span></h2>
          <h2><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span></h2>
          <h2><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span></h2>
          <h2><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span></h2>
          <h2><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span></h2>
          <h2><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span></h2>
          <h2><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span></h2>
          <h2><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span><span>Just 4 Fun </span></h2>
        </div>
      </section> */}
     
      <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          
          {/* {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} */}
          {/* <SearchForm
            loading={loading}
            searchInput={searchInput}
            handleSearchChange={handleSearchInputChange}
            handleSubmit={handleSubmit}
          /> */}
          
        
        </Col>
      </Row>
    
      <Row> 
        <Col>
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#f86c6b" size={150} loading={true} />
            </div>
          ) : (
            <ul className="list-unstyled d-flex flex-wrap listItem">
              {products && products.map((product) => (
                  <li key={product._id} className="item">
                      <Card style={{ width: '18rem' }} className="card-width">
                <Card.Img variant="top" src={product.photo} onClick={()=> handleClickProduct(product._id)}/>
                <Card.Body>
                  <Card.Title className="title">{product.name}</Card.Title>
                  {/* <Card.Text className="desc">
                    {product.description.length <= 100 ? product.description : product.description.slice(0, 100) + "..."}
                  </Card.Text> */}
                  <Card.Text className="price">
                  Price: {product.price.toLocaleString()} USD
                  </Card.Text>
             
                </Card.Body>
              </Card>
                  </li>
              
              ))}
            </ul>
          )}
        </Col>
        <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPage}
          />
      </Row>
    </Container>
    </div>
   
  );
};

export default HomePage;
