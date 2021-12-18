
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import userAction from '../../redux/actions/user.action'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import { getUserDetails, updateUserProfile } from '../actions/userActions'
// import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
// import { listMyOrders } from '../actions/orderActions'
const ProfilePage = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state?.user?.userLocal)
  const ownerId = useSelector(state => state?.user?.userLocal._id)
  const navigate = useNavigate()

  // const userDetails = useSelector(state => state.userDetails)
  // const { error, loading, user } = userDetails

  // const userLogin = useSelector(state => state.userLogin)
  // const { userInfo } = userLogin

  // const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  // const { success } = userUpdateProfile

  // const orderListMy = useSelector(state => state.orderListMy)
  // const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


  useEffect(() => {
    if(!ownerId) {
        navigate(`/login`)
    }else{
        dispatch(userAction.getSingleOrder({ownerId}))
    }
  }, [dispatch, ownerId])

  const submitHandler = (e) => {
      e.preventDefault()

    dispatch(userAction.putUser({
        id: user._id,
         name,
         email,
         avatar
    }))


  }
  return (
      <Row className="page-100" style={{padding: '50px'}}>
          <Col md={3}>
              <h2>User Profile</h2>

              {/* {message && <Message variant='danger'>{message}</Message>}
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />} */}
              <Form onSubmit={submitHandler}>

                  <Form.Group controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                          required
                          type='name'
                          placeholder='Enter name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      >
                      </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='email'>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                          required
                          type='email'
                          placeholder='Enter Email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      >
                      </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='avatar'>
                      <Form.Label>Avatar</Form.Label>
                      <Form.Control
                          type='text'
                          placeholder='Enter your avatar'
                          value={avatar}
                          onChange={(e) => setAvatar(e.target.value)}
                      >
                      </Form.Control>
                  </Form.Group>


                  <Button type='submit' variant='primary'>
                      Update
              </Button>

              </Form>
          </Col>

          <Col md={9}>
              <h2>My Orders</h2>

              <Table striped responsive className='table-sm'>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Paid</th>
                          <th>Delivered</th>
                          <th></th>
                      </tr>
                  </thead>

                  <tbody>
                      {/* {orders.map(order => (
                          <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{order.createdAt.substring(0, 10)}</td>
                              <td>${order.totalPrice}</td>
                              <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                              )}</td>
                              <td>
                                  <LinkContainer to={`/order/${order._id}`}>
                                      <Button className='btn-sm'>Details</Button>
                                  </LinkContainer>
                              </td>
                          </tr>
                      ))} */}
                  </tbody>
              </Table>
                     
          </Col>
      </Row>
  )
}
  


export default ProfilePage;
