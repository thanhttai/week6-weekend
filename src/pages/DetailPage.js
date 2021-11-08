import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Toast } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import userActions from "../redux/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import cartActions from "../redux/actions/cart.action";
import productAction from "../redux/actions/product.action";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [addingProductToCart, setAddingProductToCart] = useState(false);
  const params = useParams();
  const productId = params.id;


  const addToCart = (product) => {
    setAddingProductToCart(product?._id);
  };


  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const handleReviewInput = (e) => {
    e.preventDefault();
    setReview(e.target.value);
}

const handleReviewSubmit = () => {
    dispatch(userActions.postReview({ review, productId, rating }));
    
};

  useEffect(() => {
    if (addingProductToCart) {
      dispatch(cartActions.addToCart({addingProductToCart}))
    }
  }, [addingProductToCart]);

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.singleProduct);
  const loading = useSelector(state => state.product.loading);
  // console.log("book", book);
  // const errorMessage = useSelector(state => state.books.errorMessage);
  useEffect(() => {
    dispatch(productAction.getProductDetail({productId}));
  }, [productId, dispatch]);

  return (  
    <Container>
    {loading ? (
        <div className="text-center">
        <ClipLoader color="#f86c6b" size={150} loading={true} />
        </div>
    ) : (
        <Row className="border-me mt-5">
        <Col md={3}>
            {product && (
            <img
                className="w-100"
                src={product?.imageUrls[0]}
                alt="Product Image"
            />
            )}
        </Col>
        <Col md={9} className="padding-me">
            {product && (
            <>
                <h2>{product?.name}</h2>
                <p>
                {" "}
                    <i>{product?.description}</i>
                </p>
                <div>
                <strong>Price: </strong>{product?.price.toLocaleString()} VND
                </div>
                <div className="margin">
                <strong>In stock:</strong> {product?.stock}
                </div>
                <Button onClick={()=> addToCart(product)}>
                Add to Cart
                </Button>{" "}
            </>
            )}
               <div>
              <strong>Write us your review</strong>
              <br />
              <textarea key="review" rows="5" cols="50" onChange={handleReviewInput}></textarea>
              </div>
              <br />
              <div>
              <Button onClick={handleReviewSubmit}>Send review</Button>
              </div>
              <ul>
                {product && product.reviews.map((review)=> {
                  return <li key={review._id}>{review.content}</li>;
                })}
              </ul>
        </Col>
        </Row>
        
    )}
</Container>
  );
};

export default BookDetailPage;
