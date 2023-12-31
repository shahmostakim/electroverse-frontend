import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { getMyOrders } from '../actions/orderActions'


function ProfileScreen({history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('') 

    const dispatch = useDispatch()  

    const userDetails = useSelector(state=>state.userDetails)  
    const {error, loading, user} = userDetails
    
    const userLogin = useSelector(state=>state.userLogin)  
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)  
    const {success} = userUpdateProfile

    const orderMyOrders = useSelector(state=>state.orderMyOrders)  
    const {loading: loadingMyOrders, error: errorMyOrders, orders} = orderMyOrders

    useEffect(()=>{
        if(!userInfo){  
            history.push('/login') // if user not logged in, send him to login page 
        }else{
            // if state's userInfo.id is different than logged In user ID then fetch userDetals of logged in user 
            if(!user || !user.name || success || userInfo._id!==user._id){ 
                dispatch({type:USER_UPDATE_PROFILE_RESET}) 
                dispatch(getUserDetails('profile'))
                dispatch(getMyOrders()) 
            }else if(loadingMyOrders===false){
                dispatch(getUserDetails('profile'))
                dispatch(getMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)  
            }
        }
    }, [dispatch, history, userInfo, user, success])  

    const submitHandler = (e) => {
        e.preventDefault() 
        if(password != confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email, 
                'password': password,
            }))
            setMessage('') 
        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && (<Message variant='danger'>{message}</Message>)}
            {error && (<Message variant='danger'>{error}</Message>)}
            {loading && (<Loader />)} 
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'> 
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required 
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)} 
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'> 
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} 
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'> 
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}  
                    ></Form.Control> 
                </Form.Group>

                <Form.Group controlId='passwordConfirm'> 
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}  
                    ></Form.Control> 
                </Form.Group>

                <Row className='py-3'>
                    <Col>
                        <Button type='submit' variant='primary'>Update</Button> 
                    </Col>
                </Row>

            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingMyOrders ? (
                <Loader /> 
            ) : errorMyOrders ? (
                <Message variant='danger'>{errorMyOrders}</Message>
            ) : (
                <Table striped responsive className='table-sm'> 
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Placed on</th>
                            <th>Total</th>
                            <th>Paid on</th>
                            <th>Delivered on</th>
                            <th></th> 
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}> 
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen
