import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import { getUniqueValues, formatPrice } from '../utils/helper'
import { FaCheck } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ProductAction from '../redux/actions/product.action'
import FilterAction from '../redux/actions/filter.action'
const Filters = () => {

  const [color, setColor] = useState('all')
  const [category, setCategory] = useState('all')
  const [pageNum, setPageNum] = useState(1);
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");

  
  const [price, setPrice] = useState(309999);
  const [company, setCompany] = useState('all')
  // const totalPage = 10;
  const limit = 20;
  const updateFilter = (e) => {
    let name = e.target.name
    let value = e.target.value
    if(name === 'category'){
      // value = e.target.textContent
      setCategory(e.target.textContent) 
    }
    if(name === 'color'){
    //  value = e.target.dataset.color
      setColor(e.target.dataset.color) 
    }
    
    if(name === 'shipping'){

      value = e.target.checked
    }
    if(name=== 'price'){
      // value = e.target.value
      setPrice(Number(e.target.value))
    }
    if(name === 'company'){
    //  value = e.target.value
      setCompany(e.target.value)
    }
    if(name === 'text'){
      // value = e.target.value
      setText(e.target.value)
    }
    // dispatch({type:UPDATE_FILTERS, payload:{name, value}})
  
  }

  const dispatch = useDispatch()
  const product = useSelector(state=> state?.product?.product)
 const filter = useSelector(state=> state?.filter)
//  console.log(filter,'yeahhhhhhhhhhhhhhhhuuuuu')
 
  useEffect(() => {
    dispatch(ProductAction.getAllProduct({pageNum, limit, query}))
  },[])
  useEffect(() => {
    
    dispatch(FilterAction.updateFilter({color, category, text, price, company, all_products:product }))
   },[color, category, text, price, company, dispatch, product])


  
 const categories = getUniqueValues(product, 'category')
 const companies = getUniqueValues(product, 'company')
 const colors = getUniqueValues(product, 'colors')
 
// console.log(typeof price, price,'meemememem')
let min_price;
let max_price;
 if(product){
  const value = product.map(c=>{
     return c.price
   })
   min_price = Math.min(...value)
  
   max_price = (Math.max(...value))
 }
 const clearFilter = (e) => {
  //  console.log(e.target)
  // setClearFilters(true)
 }
  return <Wrapper>
    <div className="content">
    <form onSubmit={(e) =>e.preventDefault()}>
        {/* search input */}
        {/* <div className="form-control"> */}
          <input 
          type="text" 
          name="text" 
          placeholder="search" 
          className="search-input"
          value={text}
          onChange={updateFilter}
          />
        {/* </div> */}
        {/* end search input */}
        {/* category */}
        <div className="form-control">
          <h5>category</h5>
          <div className="">
            {categories && categories.map((c, index) =>{
              // if(category === c){
              //   console.log(category, c)
              // }
               return <button 
               key={index} 
               onClick={updateFilter}
               type="button"
               name="category"
               className={`${category === c.toLowerCase() ?'active' : null}`}
           
               >{c}</button>
            })}
          </div>
        </div>
        {/*end of category */}
        {/* company */}
        <div className="form-control">
          <h5>company</h5>
          <select 
          name="company" 
          // value={company} 
          onChange={updateFilter} className="company">
              {companies && companies.map((c, index) =>{
                return <option value={c} key={index}>
                  {c}
                </option>;

              })}
          </select>
        </div>
        {/*end of company */}
        {/* color */}
        <div className="form-control  ">
              <h5>colors</h5>
              <div className="colors">

                {
                  colors && colors.map((c, index) =>{
                    if(c === 'all'){
                      return <button 
                      key={index}
                      name="color" 
                      onClick={updateFilter}
                      data-color='all'
                      className={`${color==='all' ? 'all-btn active' :'all-btn'}`}
                     
                      >
                      all
                      </button>
                    }
                    return <button 
                    key={index} 
                    name="color" 
                    style={{background:c}}
                    className={`${color === c? 'active color-btn' :'color-btn'}`}
                    data-color={c}
                    onClick={updateFilter}
                    >
                      {color === c ? <FaCheck />: null}
                    </button>
                  })
                }
              </div>
        </div>
        {/*end of color */}
        {/* price */}
        <div className="form-control">
          <h5>price</h5>
          <p className="price">{formatPrice(price)}</p>
          <input 
          type="range" 
          name="price" 
          onChange={updateFilter} 
          min={min_price} 
          max={max_price} 
          value={price}
          />
        </div>
        {/*end of price */}
        {/* shipping */}
        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input 
          type="checkbox" 
          name="shipping" 
          id="shipping" 
          onChange={updateFilter}
          // checked={shipping}
          />
        </div>
        {/*end of shipping */}
      </form>
      <button type="button" 
      onClick={clearFilter} 
      className="clear-btn">{' '} clear filters</button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.3rem;
    margin-bottom: 1.8rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
