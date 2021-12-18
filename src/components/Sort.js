import React, { useEffect, useState } from 'react'
// import { useFilterContext } from '../context/filter_context'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import FilterAction from '../redux/actions/filter.action'
const Sort = () => {
    const [grid_view ,setGridview] = useState(true)
    const [sort, setSort] = useState('price-lowest')
   const setNewGridview = (e)=>{
       setGridview(true)
   }
   const setListview = (e)=>{
       setGridview(false)
   }
   const updateSort = (e)=>{
     console.log(e.target.value)
       setSort(e.target.value)
   }
   const dispatch = useDispatch()
   const products = useSelector(state => state.filter.filter_product)
  //  const grid = useSelector(state => state.filter.grid_view)

   
   useEffect(() => {
      
       dispatch(FilterAction.sortProduct({sort,tempProducts: products}))
   }, [sort])
   useEffect(() => {
       dispatch(FilterAction.viewProduct({grid_view}))
   },[grid_view])
//   const {
//     filtered_products: products, 
//     grid_view, 
//     setGridview, 
//     setListview, 
//     sort,
//     updateSort
//     } = useFilterContext()
    
  return <Wrapper>
        <div className="b
        tn-container">
          <button type="button" className={`${grid_view? 'active style': 'style'}`} onClick={setNewGridview}>
            <BsFillGridFill />
          </button>
          <button type="button" className={`${!grid_view? 'active style': 'style'}`} onClick={setListview}>
            <BsList />
          </button>
        </div>
        <p>
          {products.length} products found
        </p>
        <hr />
        <form>
          <label htmlFor='sort'>sort by</label>
          <select 
          name='sort' 
          id='sort' 
          className="sort-input"
          value={sort}
          onChange={updateSort}
          >
            <option value='price-lowest'>price (lowest)</option>
            <option value='price-highest'>price (highest)</option>
            <option value='name-a'>name (a-z)</option>
            <option value='name-z'>name (z-a)</option>
          </select>
        </form>
     </Wrapper>
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }
  .style{
    
    margin-right: 2px;
    padding: 1px 1px;
    display: inline-flex;
    justify-content: center;
    align-items: center;

  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
 
  }
  .active {
    background: var(--clr-black);
    color: var(--clr-white);
  }
  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`

export default Sort
