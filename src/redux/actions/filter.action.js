import * as types from "../constants/filter.constant";
// import { useSelector } from 'react-redux'


const filterAction = {};
filterAction.updateFilter = ({color, category, text, price, company, all_products, clearFilters}) => async (dispatch) => {
    // const all_products = useSelector(state=> state?.filter.all_product)
  
    // const {all_products} = state;
    // console.log(text,'kdkddas')
    let tempProducts = all_products;
    try {
        if(text){
            tempProducts = tempProducts.filter((product) => {
              return product.name.toLowerCase().includes(text.toLowerCase())
            })
           
        }
        // category
        if(category !== 'all'){
          tempProducts = tempProducts.filter((product) => {
            return product.category === category
          })
        }
        // company
      if(company !== 'all'){
        tempProducts = tempProducts.filter((product) => {
          return product.company === company
          })
        }
    
       // color
       if(color !== 'all'){
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) =>c === color)
          })
        } 
        // price
        tempProducts = tempProducts.filter((product) =>product.price <= price)


        if(clearFilters){
          return tempProducts
        }
        // if(color === 'all' && 
        //     company === 'all' &&
        //     category === 'all' &&
        //     !text
        // ){
        //     return tempProducts
        // }
    
        // shipping
        // if(shipping){
        //   tempProducts = tempProducts.filter((product) =>product.shipping === true)
        // }
    
        // dispatch({ type: types, payload:res.data.data.result});
        // console.log(tempProducts,'asdasdasdasd')
        dispatch({ type: types.GET_UPDATE_PRODUCT_FILTER_SUCCESS, payload: tempProducts})
    } catch (error) {
        console.log(error)
    }
    
}
filterAction.sortProduct= ({sort, tempProducts}) => async(dispatch) =>{
    // console.log(sort,'mdadsadsda')
    try {
        // const {sort, filtered_products} = state;
        // let tempProducts = [...filtered_products];
        if(sort === 'price-lowest'){
          tempProducts = tempProducts.sort((a,b) => a.price - b.price);
          
          // if(a.price < b.price){
          //   return -1
          // }
          // if(a.price > b.price){
          //   return 1
          // }
          // return 0
        }
        if(sort === 'price-highest'){
          tempProducts = tempProducts.sort((a,b) => b.price - a.price);
        }
        if(sort === 'name-a'){
          tempProducts = tempProducts.sort((a,b) => {

            return a.name.localeCompare(b.name)
          });
        }
        if(sort === 'name-z'){
            tempProducts = tempProducts.sort((a,b) => {
                return b.name.localeCompare(a.name)
            });
            
        }
        dispatch({ type: types.GET_SORT_SUCCESS, payload: sort})
       dispatch({ type: types.GET_SORT_FILTER_SUCCESS, payload: tempProducts})
    } catch (error) {
        console.log(error)
        
    }

}
filterAction.viewProduct = ({grid_view}) => async (dispatch) => {
    try {
        dispatch({ type: types.GET_GRID_FILTER_SUCCESS, payload: grid_view})
    } catch (error) {
        console.log(error)
    }
}
filterAction.filterChange = () => async (dispatch) => {
    try {
        dispatch({ type: types.GET_CHANGE_FILTER_SUCCESS})
    } catch (error) {
        console.log(error)
    }
}

export default filterAction;
