import * as types from "../constants/filter.constant"

const initialState = {
    all_product: [],
    filter_product:[],
    grid_view: true,
   sort:null,
    
};

const filterReducer = (state=initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_PRODUCT_FILTER_SUCCESS:
            return {...state, all_product: payload}
        case types.GET_UPDATE_PRODUCT_FILTER_SUCCESS:
            return {...state, filter_product: payload}
        case types.GET_SORT_FILTER_SUCCESS:
            return {...state, filter_product: payload}
        case types.GET_GRID_FILTER_SUCCESS:
            return {...state, grid_view: payload}
        case types.GET_CHANGE_FILTER_SUCCESS:
            return {...state}
        case types.GET_SORT_SUCCESS:
            return {...state, sort:payload}
        default:
            return state
    }
}

export default filterReducer;