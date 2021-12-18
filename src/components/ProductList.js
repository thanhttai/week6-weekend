import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {

const products = useSelector(state=> state.filter.filter_product) 
const sort = useSelector(state=> state?.filter?.sort)
useEffect(() => {

},[sort])
const grid_view = useSelector(state=> state.filter.grid_view)
console.log(products, 'productssssssssssssss')
  if(products?.length < 1){
    return <h5 style={{textTransform: 'none'}}>
      Sorry, no products matched your   ... 
    </h5>
  }
  if(grid_view === false && products){
    return <ListView products={products} />
  }
  return <GridView products={products}>product list</GridView>
}

export default ProductList
