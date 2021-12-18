import React, { useEffect } from 'react'
import styled from 'styled-components'
// import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import  CartContent from '../../components/CartContent'
import  PageHero from '../../components/PageHero'
import { useDispatch, useSelector } from 'react-redux'
import cartAction from '../../redux/actions/cart.action'

const Cart = () => {
 
  const dispatch = useDispatch()
  const cart = useSelector(state => state?.carts?.cart?.products)
  const cartId = useSelector(state => state?.carts?.cart?._id)

  useEffect(() => {
    dispatch(cartAction.getCart())
  },[])
// console.log(cart === undefined, 'cart action');
  if(cart === undefined) {
    console.log(cart, 'inside');
    return <Wrapper className="page-100">
      <div className="empty">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn">
          fill it 
        </Link>
      </div>
    </Wrapper>
  }
  return <main>
    <PageHero />
    <Wrapper className="page">
      <CartContent cart={cart} cartId={cartId}/>
    </Wrapper>
  </main>
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default Cart