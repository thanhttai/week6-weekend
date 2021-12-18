import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import userAction from '../redux/actions/user.action'
import { FaTrash } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import { listUsers, deleteUser } from '../actions/userActions'

function UserListPage() {

    const dispatch = useDispatch()

    const role = useSelector(state => state?.user?.userLocal?.role)
    const allUser = useSelector(state => state?.user?.allUser)
    // const { loading, error, users } = userList

    // const userLogin = useSelector(state => state.userLogin)
    // const { userInfo } = userLogin

    // const userDelete = useSelector(state => state.userDelete)
    // const { success: successDelete } = userDelete


    // useEffect(() => {
    //     if (userInfo && userInfo.isAdmin) {
    //         dispatch(listUsers())
    //     } else {
    //         history.push('/login')
    //     }

    // }, [dispatch, history, successDelete, userInfo])
    useEffect(() => {
        dispatch(userAction.getAllUser({role}))
    },[dispatch])


    const deleteHandler = (id) => {

        // if (window.confirm('Are you sure you want to delete this user?')) {
        //     dispatch(deleteUser(id))
        // }
    }

    return (
        <div className="page-100" style={{padding: '5rem 14rem'}}>
            <h1>Users</h1>
            {
               
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUser && allUser.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? (
                                    <FaCheck  style={{ color: 'green' }}/>
                                ) : (
                                    <FaCheck   style={{ color: 'red' }}/>

                                    )}</td>

                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                       <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default UserListPage
