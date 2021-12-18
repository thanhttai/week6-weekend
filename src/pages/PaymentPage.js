import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

import { useNavigate } from 'react-router'
import cartActions from '../redux/actions/cart.action'

function PaymentScreen() {

    const shippingAddressFromLocal = useSelector(state => state?.carts?.shippingAddressFromLocal)
 
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const navigate = useNavigate()
    if (!shippingAddressFromLocal?.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(cartActions.savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    const shipping = useSelector(state => state?.carts)
    console.log(shipping, 'shipping from paymentpages');
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        
                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
