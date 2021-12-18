import React,{ useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
// import { useProductsContext } from '../context/products_context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import productAction from '../redux/actions/product.action'
// import Error from './Error'
// import Loading from './Loading'
import Product from './Product'

const FeaturedProducts = () => {
    const [pageNum, setPageNum] = useState(1);
    const [query, setQuery] = useState("");
    const limit = 20;
//   const {products_loading:loading, products_error:error, featured_products:featured} = useProductsContext()
//   if(loading){
//     return <Loading />
//   }
//   if(error){
//     return <Error />
//   }

const dispatch = useDispatch()
const featured = useSelector(state=> state?.product?.product)
console.log(featured)
useEffect(() => {
    dispatch(productAction.getAllProduct({pageNum, limit, query}));
},[dispatch, pageNum, limit, query])


  return <Wrapper className="section">
    <div className="title">
      <h2>Featured Products</h2>
      <div className="underline"></div>
    </div>
    <div className="featured section-center">
      {featured && featured.slice(0,3).map((product)=>{
          return <Product key={product._id} {...product} />
      })}
    </div>
    <Link to="/products" className="btn">
    all products
    </Link>
  </Wrapper>
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
    font-size: 13px;
    background:  var(--clr-primary-8);
    
  }
  .btn:hover {
    background:  var(--clr-primary-6);
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
