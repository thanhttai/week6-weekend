import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import productAction from '../redux/actions/product.action'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {formatPrice} from '../utils/helper'
// import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import styled from 'styled-components'

function ProductListScreen() {

    const dispatch = useDispatch()
    const products = useSelector(state=> state?.product?.product)
    console.log(products, 'product in product list page')

    // const productList = useSelector(state => state.productList)
    // const { loading, error, products, pages, page } = productList

    // const productDelete = useSelector(state => state.productDelete)
    // const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    // const productCreate = useSelector(state => state.productCreate)
    // const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate


    // const userLogin = useSelector(state => state.userLogin)
    // const { userInfo } = userLogin

    // let keyword = history.location.search
    // useEffect(() => {
    //     dispatch({ type: PRODUCT_CREATE_RESET })

    //     if (!userInfo.isAdmin) {
    //         history.push('/login')
    //     }

    //     if (successCreate) {
    //         history.push(`/admin/product/${createdProduct._id}/edit`)
    //     } else {
    //         dispatch(listProducts(keyword))
    //     }

    // }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])
    useEffect(() => {
        dispatch(productAction.getAllProduct({pageNum: 1, limit:10}))
    },[dispatch])

    const deleteHandler = (id) => {

        // if (window.confirm('Are you sure you want to delete this product?')) {
        //     dispatch(deleteProduct(id))
        // }
    }

    // const createProductHandler = () => {
    //     dispatch(createProduct())
    // }

    return (
        <Wrapper className="page-100">
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className='text-right'>
                    {/* <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button> */}
                </Col>
            </Row>


            <div>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>COLOR</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products && products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{formatPrice(product.price)}</td>
                                <td>{product.category}</td>
                                <td style={{display: 'flex'}}>{product.colors.map((e,index)=> {
                                    return <button 
                                    style={{ background: e}} 
                                    key={index} 
                                    // className={`${mainColor === color ? 'active color-btn' : 'color-btn'}`}
                                    // onClick={() =>setMainColor(color)}
                                    className='color-btn'
                                    >
                                      {/* {mainColor === color ? <FaCheck /> : null} */}
                                    </button>
                                })}</td>

                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                            <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </Table>
                {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </div>
        
        </Wrapper>
    )
}
const Wrapper = styled.div`
 padding: 60px;
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
`


export default ProductListScreen