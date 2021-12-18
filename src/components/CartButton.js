import React from 'react'
import { FaShoppingCart, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import userAction from '../redux/actions/user.action'
import { Dropdown, DropdownButton } from 'react-bootstrap'


const CartButton = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const handleLogout = () => {
  
    localStorage.removeItem('user')
   dispatch(userAction.logout())
   navigate(`/about`)
  }
  const user = useSelector(state => state.user?.userLocal)
  const cart = useSelector(state => state?.carts?.cart)

  console.log(cart,'haha')
  return <Wrapper className="cart-btn-wrapper"> 
    <Link to="/cart" className="cart-btn"> 
    {/* onClick={closeSidebar} */}
      Cart
      <span className="cart-container">
        <FaShoppingCart />
        { cart?.products?.length > 0 && <span className="cart-value">
            {cart.products.length}
        </span>}
      </span>
    </Link>

    {
      user?.role === 'guest' ?  
      <DropdownButton title={user.name}>
      <Dropdown.Item href="#/action-1"> 
      <button type="button" className="auth-btn font-size" onClick={handleLogout}>
          Logout    
        </button></Dropdown.Item>
      {/* <Dropdown.Item>
        <Link to='/admin/userlist' ></Link>
      </Dropdown.Item> */}
      </DropdownButton>
      : user?.role === 'admin' ? 
      <DropdownButton title='Admin'>
      <Dropdown.Item> 
      <button type="button" className="auth-btn font-size" onClick={handleLogout}>
          Logout  
        </button></Dropdown.Item>
      <Dropdown.Item as={Link} to="/admin/userlist"  style={{color: '#000'}} className='font-size'>User List
        {/* <Link to='/admin/userlist' style={{color: '#000'}} className='font-size' >User List</Link> */}
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/admin/productlist"  style={{color: '#000'}} className='font-size'>Product List
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/admin/orderlist"  style={{color: '#000'}} className='font-size'>Order List
      </Dropdown.Item>
      </DropdownButton>
      :
      <Link to="/login" className="auth-btn" >
        
        Login
        <FaUserPlus />
      </Link> 
    }

{/* {
      user?.role === 'admin' ?  
      <DropdownButton title={user.name}>
      <Dropdown.Item href="#/action-1"> 
      <button type="button" className="auth-btn font-size" onClick={handleLogout}>
          Logout  
        </button></Dropdown.Item>
      <Dropdown.Item>
        <Link to='/admin/userlist' >User List</Link>
      </Dropdown.Item>
      </DropdownButton>
      :
      <Link to="/login" className="auth-btn" >
        
        Login
        <FaUserPlus />
      </Link> 
    } */}
  
    
  </Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
  .btn-primary {
     background-color: #fff; 
    border-color: none; 
    color: #000 !important;
    outline:none;
    border:none;
  }
  .font-size{
    font-size:1.2rem
  }
`

export default CartButton
