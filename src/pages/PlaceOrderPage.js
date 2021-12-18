import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import CartCheckOut from '../components/CartCheckOut'
import styled from 'styled-components'
import userAction from '../redux/actions/user.action'
import cartActions from '../redux/actions/cart.action'


function PlaceOrderScreen() {
    const dispatch = useDispatch()

    const cart = useSelector(state => state?.carts?.cartLocal)
    console.log(cart, 'cart');
    const color = cart?.productId?.color

    const shippingAddressFromLocal = useSelector(state => state?.carts?.shippingAddressFromLocal)
    
    console.log(shippingAddressFromLocal, 'shippingAddressFromLocal');
    const paymentMethod = useSelector(state => state?.carts?.paymentMethod)
    console.log(paymentMethod, 'paymentMethod');
    const navigate = useNavigate()
    const shipping_fee = 5.34
    let total_amount;
    if(cart?.products){
        total_amount= cart.products.map((product) =>{
        return product.qty * product.productId.price
        }).reduce((sum, quantity) => sum + quantity)
    }
    useEffect(() => {
        dispatch(cartActions.getCart())
    },[dispatch])

    if (!paymentMethod) {
        navigate('/payment')
    }

    // useEffect(() => {
    //     if (success) {
    //         history.push(`/order/${order._id}`)
    //         dispatch({ type: ORDER_CREATE_RESET })
    //     }
    // }, [success, history])

    const handleCheckOut = () => {
       dispatch(userAction.postOrder({
            paymentMethod: paymentMethod,
           cartId: cart?._id,   
           city: shippingAddressFromLocal?.city,
           country: shippingAddressFromLocal?.country,
           postalCode: shippingAddressFromLocal?.postalCode,
           address: shippingAddressFromLocal?.address,
           phoneNumber: shippingAddressFromLocal?.phoneNumber, 
           totalPrice: total_amount + shipping_fee,
       }))
       navigate('/')
    }

    return (
        <Wrapper className="page-100">
            <CheckoutSteps step1 step2 step3 step4 />
            <Row className="justify-content-md-center" style={{padding: '10px 50px'}}>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping: </strong>
                                {shippingAddressFromLocal?.address},  {shippingAddressFromLocal?.city}
                                {'  '}
                                {shippingAddressFromLocal?.postalCode},
                                {'  '}
                                {shippingAddressFromLocal?.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart && cart?.products?.length === 0 ? <div className="page-100">
                                Your cart is empty
                            </div> : (
                                    <ListGroup variant='flush'>
                                        {cart && cart?.products.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.productId.image} alt={item.productId.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.productId._id}`} style={{color: '#000'}}>{item.productId.name}</Link>
                                                        <p className="color">color : <span style={{background: color, borderRadius: '50%'}}></span></p>
                                                    </Col>
                                                    {/* <Col md={4}>
                                                        {item.qty} X ${item.productId.price} = ${(item.qty * item.productId.price).toFixed(2)}
                                                    </Col> */}
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={5} marginRight='20px'>
                   {cart && <CartCheckOut cart={cart.products} handleCheckOut={handleCheckOut}/>}
                </Col>
            </Row>
        </Wrapper>
    )
}
const Wrapper = styled.div`
.color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.7rem;
      height: 0.7rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
`

export default PlaceOrderScreen
