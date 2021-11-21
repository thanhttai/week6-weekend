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
  const [deleteReview, setDeleteReview] = useState('')
  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const [update, setUpdate] = useState(false);
  const [comment, setComment] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [updateComment, setUpdateComment] = useState(false)
  
  const [addingProductToCart, setAddingProductToCart] = useState(false);
  const params = useParams();
  const productId = params.id;

  const handleCommentText = (e) => {
    console.log(e.target.value, 'hahahahaha')
    setComment(e.target.value)
   
  }
  // useEffect(() => {
    
  // },[comment])

  const handleSuccess = (e) => {  
    
    if(e.keyCode === 13) {
      setUpdateComment(false)
      dispatch(userActions.putReview({updateComment, comment, productId}))
    }
  }

  const addToCart = (product) => {
    setAddingProductToCart(product?._id);
  };
  const updateProductToCart = (product) => {
    setUpdate(product?._id);
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

const  handUpdateReview = (id) => {
  console.log(id,'hohohohohohho')
  setUpdateComment(id)
}
// useEffect(() => {
  
//   if (updateComment && comment) {
//     console.log('ngonnnnn lànhhhhhhhh')
//     dispatch(userActions.putReview({updateComment, comment}))
//   }
// }, [comment]);

useEffect(() => {
  if (update) {
    dispatch(cartActions.updateCart({update}))
  }
}, [update]);

  useEffect(() => {
    if (addingProductToCart) {
      dispatch(cartActions.addToCart({addingProductToCart}))
    }
  }, [addingProductToCart]);


  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.singleProduct);
  const loading = useSelector(state => state.product.loading);
  const comments = useSelector(state => state.user.comment);
 console.log(comments, 'reviewwwwwwww neneee')

  // console.log("book", book);
  // const errorMessage = useSelector(state => state.books.errorMessage);
  useEffect(() => {
    dispatch(productAction.getProductDetail({productId}));
  }, [productId, dispatch]);


  const handleDeleteReview = (reviewId) => {
    setDeleteReview(reviewId)
  }
  useEffect(() => {
    if(deleteReview){
      console.log(deleteReview,'huhuhuhuhuhuhuhu')
    dispatch(userActions.deleteReview({deleteReview, productId}))
    }
  },[dispatch, deleteReview]);

  useEffect(() => {
    dispatch(userActions.getAllComment({productId, dispatch}))
  },[productId]);   
  // dispatch(userActions.getAllComment())

  return (  
    <Container>
    {/* {loading ? (
        <div className="text-center">
        <ClipLoader color="#f86c6b" size={150} loading={true} />
        </div>
    ) : ( */}
        <Row className="border-me mt-5">
        <Col md={3}>
            {product && (
            <img
                className="w-100"
                src={product?.photo}
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
                <Button onClick={()=> updateProductToCart(product)}>
                Update Cart
                </Button>{" "}
                <Button onClick={()=> addToCart(product)}>
                Create Cart
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
                {comments && comments.map((review)=> {
                  return <li key={review._id}>{review.content}
                   <Button onClick={()=> handleDeleteReview(review._id)} style={{margin:'10px 30px'}}>
                     Delete
                    </Button>
                    {updateComment ? 
                    <textarea onChange={handleCommentText} onKeyDown={handleSuccess} style={{margin:'10px 30px'}}>
                    
                   </textarea>: 
                   <Button onClick={()=> handUpdateReview(review._id)} style={{margin:'10px 30px'}}>
                     Update
                    </Button>
                    }
                   </li>;
                })} 
              </ul>
        </Col>
        </Row>
        
    {/* )} */}
</Container>
  );  
};

export default BookDetailPage;
