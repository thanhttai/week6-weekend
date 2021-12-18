import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import styled from 'styled-components'
// import filterAction from '../redux/actions/filter.action'
import Product from './Product'

const GridView = ({products}) => {
  // const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(filterAction.filterChange())
  },[products])
  // console.log(products,'hohoho');
  console.log(products,'new changeeeee')
  return <Wrapper>
   <div className="products-container">
   {products && products.map(product =>{
      return <Product key={product._id} {...product}/>
    })}
   </div>
  </Wrapper>
}

const Wrapper = styled.section`
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default GridView
