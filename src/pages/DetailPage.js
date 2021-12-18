import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { useProductsContext } from '../context/products_context'
// import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helper'
import ProductAction from '../redux/actions/product.action'
import ProductImages from '../components/ProductImages'
import Stars from '../components/Stars'
import AddToCart from '../components/AddtoCart'

import PageHero from '../components/PageHero'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const SingleProductPage = () => {
  const {id} = useParams();
 
  // const navigate = useNavigate();


  const product = useSelector(state=> state.product.singleProduct)
  
  const dispatch = useDispatch()
  useEffect(() => {
  
    dispatch(ProductAction.getProductDetail({id}))
  },[id, dispatch])

  return <Wrapper>
    <PageHero 
    title={product?.name} 
    product />
    <div className="section section-center page">
      <Link to="/products" className="btn">
        back to products
      </Link>
      <div className="product-center">
        <ProductImages images={product?.images} />
        <section className="content">
          <h2>{product?.name}</h2>
          <Stars stars={product?.stars} reviews={product?.reviews}/>
          <h5 className="price"> {formatPrice(product?.price)}</h5>
          <p className="desc"> {product?.description}</p>
          <p className="info">
            <span>Available : </span>
            {product?.stock > 0 ? "In stock": "out of stock"}
          </p>
          <p className="info">
          <span>SKU : </span>
            {product?._id}
          </p>
          <p className="info">
          <span>Brand : </span>
            {product?.company}
          </p>
          <hr />
          {product?.stock > 0 && <AddToCart product={product} />}
        </section>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
