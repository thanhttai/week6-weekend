import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import { listOrders } from '../actions/orderActions'
import userAction from '../redux/actions/user.action'
import {formatPrice} from '../utils/helper'

function OrderListScreen({ history }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state?.user?.userLocal)
    const role = useSelector(state => state?.user?.userLocal?.role)
    const orders = useSelector(state => state?.user?.orders)
    // const orderList = useSelector(state => state.orderList)
    // const { loading, error, orders } = orderList

    // const userLogin = useSelector(state => state.userLogin)
    // const { userInfo } = userLogin

    const navigate = useNavigate()

    useEffect(() => {
        if (user && user?.role == 'admin') {
            dispatch(userAction.getAllOrder({role}))
        } else {
            navigate('/login')
        }

    }, [dispatch])


    return (
        <div className="page-100" style={{padding: '60px'}}>
            <h1>Orders</h1>
            
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>Total</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders && orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.owner.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{formatPrice(order.totalPrice)}</td>

                                {/* <td>{order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                        <i className='fas fa-check' style={{ color: 'red' }}></i>
                                    )}
                                </td> */}

                                {/* <td>{order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)
                                ) : (
                                        <i className='fas fa-check' style={{ color: 'red' }}></i>
                                    )}
                                </td> */}

                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>


                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                    
        </div>
    )
}

export default OrderListScreen