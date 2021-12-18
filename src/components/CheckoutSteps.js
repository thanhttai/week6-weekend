import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav'
import styled from 'styled-components'
function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
       <Wrapper>
            <Nav className='checkout_step'>
            <Nav.Item className='nav_link'>
                {step1 ? (
                    <Link to='/login' style={{ color: '#000', margin: '0 20px'}}>login</Link>
                ) : (
                    // <Link>login</Link>
                    <Nav.Link disabled >login</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item className='nav_link'>
                {step2 ? (
                     <Link to='/checkout' style={{ color: '#000', margin: '0 20px'}}>checkout</Link>
                ) : (
                    //  <Link>checkout</Link>
                    <Nav.Link disabled>checkout</Nav.Link>

                      
                    )}
            </Nav.Item >

            <Nav.Item className='nav_link'>
                {step3 ? (
                     <Link to='/payment' style={{ color: '#000', margin: '0 20px'}}>payment</Link>
                    
                ) : (
                    <Nav.Link disabled >payment</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item className='nav_link'>
                {step4 ? (
                     <Link to='/placeorder' style={{ color: '#000', margin: '0 20px'}}>Place Order</Link>
                    
                ) : (
                    <Nav.Link disabled >Place Order</Nav.Link>

                    )}
            </Nav.Item>
        </Nav>
       </Wrapper>
    )
}

const Wrapper = styled.div`
    display:flex;
    justify-content:center;
    position:absolute;
    top: 64px;
    right: 28%;
    margin-top:20px;
    font-size:30px;
   .checkout_step{
    display: flex;
    justify-content: space-around;
    width: 50vw;
    margin: 0;
   }
   .nav_link{
    display: flex;
    justify-content: center;
    align-items: center;

   }
`

export default CheckoutSteps
