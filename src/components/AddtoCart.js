import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
// import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'
import cartActions from '../redux/actions/cart.action'
import { useDispatch, useSelector } from 'react-redux'
// import { FaPlus, FaMinus } from 'react-icons/fa'
const AddToCart = ({product}) => {
//   const {addToCart} = useCartContext()
const [amount, setAmount] = useState(1)
  const {_id, colors,stock} = product
console.log(colors[0])
  const [mainColor, setMainColor] = useState(colors[0]);
    const [addtoCart, setAddToCart] = useState(false)
    // const cart = useSelector(state=> state?.carts?.cart?.products)

  const increase = () => {
      setAmount((oldAmount)=>{
        let tempAmount = oldAmount + 1
        if(tempAmount > stock){
          tempAmount = stock
        }
        return tempAmount
      })
  }

  const decrease = () => {
    setAmount((oldAmount)=>{
      let tempAmount = oldAmount - 1
      if(tempAmount < 1){
        tempAmount = 1
      }
      return tempAmount
    })
  }
  const handleAddtoCart = () => {
    setAddToCart(true)
  }
  const dispatch = useDispatch()

useEffect(() => {
    if(addtoCart && amount){
        dispatch(cartActions.addToCart({_id, color: mainColor,amount}))
        setAddToCart(false)
    }

},[addtoCart])



  return <Wrapper>
      <div className="colors">
        <span> colors : </span>
        <div>
          {
            colors.map((color, index) =>{
              return <button 
              style={{ background: color}} 
              key={index} 
              className={`${mainColor === color ? 'active color-btn' : 'color-btn'}`}
              onClick={() =>setMainColor(color)}
              >
                {mainColor === color ? <FaCheck /> : null}
              </button>
            })
          }
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons amount={amount} increase={increase} decrease={decrease}/>
    
        <button className="btn" onMouseDown={()=> handleAddtoCart()}>add to cart</button>

      </div>
     </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    background: var(--clr-primary-8)
  }
  .btn:hover {
    background: var(--clr-primary-6)

  }
`
export default AddToCart
