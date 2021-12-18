import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import userAction from '../redux/actions/user.action'

const CheckoutPage = () => {
    const shippingAddress = useSelector(state=> state?.carts?.shippingAddressFromLocal)
    console.log(shippingAddress, 'shippingAddress');
    const [address, setAddress] = useState(shippingAddress?.address)
    const [city, setCity] = useState(shippingAddress?.city)
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode)
    const [country, setCountry] = useState(shippingAddress?.country)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress?.phoneNumber)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(userAction.shippingAddress({address, city, postalCode, country, phoneNumber}))
        navigate(`/payment`)
    }
    
    return (
       <Wrapper>
            <CheckoutSteps step1 step2/>
            <FormContainer className="page-100 shipping-t" style={{width:'100vw', justifyContent: 'center'}} >
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address"> 
                    <Form.Label>address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter address"
                        value={address ? address : ''}
                        onChange={(e)=>setAddress(e.target.value)}
                    >
                    
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="city"> 
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter city"
                        value={city ? city : ''}
                        onChange={(e)=>setCity(e.target.value)}
                    >
                    
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="postalCode"> 
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter postalCode"
                        value={postalCode ? postalCode : ''}
                        onChange={(e)=>setPostalCode(e.target.value)}
                    >
                    
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="phoneNumber"> 
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="Enter phone number"
                        value={phoneNumber ? phoneNumber : ''}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                    >
                    
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="country"> 
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter country"
                        value={country ? country : ''}
                        onChange={(e)=>setCountry(e.target.value)}
                    >
                    
                    </Form.Control>
                </Form.Group>
                <Button type='submit' className="btn margin_btn">
                    Countinue
                </Button>
            </Form>
        </FormContainer>
       </Wrapper>
    )
}
const Wrapper = styled.div`
   .margin_btn{
    margin-top: 16px;
    background:var(--clr-primary-6);
    outline: none;
    border:none;
   }
`

export default CheckoutPage
