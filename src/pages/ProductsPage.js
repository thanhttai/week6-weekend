import React from 'react'
import styled from 'styled-components'
import  PageHero  from '../components/PageHero'
import  Filters  from '../components/Filters'
import  Sort  from '../components/Sort'
import  ProductList  from '../components/ProductList'
// import  ProductList  from '../components/ProductList'
// Filters, ProductList, Sort,
const ProductsPage = () => {
    

  return <main>
      <PageHero title="Product"></PageHero>
      <Wrapper className="page">
        <div className="section-center products">
            <Filters />
            <div>
              <Sort />
              <ProductList />
            </div>
        </div>
      </Wrapper>
  </main>
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default ProductsPage