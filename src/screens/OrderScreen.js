
import React, {useState, useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message' 
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import {ORDER_PAY_RESET} from '../constants/orderConstants'


function OrderScreen({match}) {  
    const orderId = match.params.id 
    const dispatch = useDispatch() 

    const orderDetails = useSelector(state=>state.orderDetails)
    const {order, error, loading} = orderDetails 

    // this calculation only will take place after all the data has been loaded to redux state 
    if(!loading && !error){
        order.itemsPrice = Number(order.orderItems.reduce((acc, item)=>acc+item.price*item.qty, 0)).toFixed(2)
    } 

    // state variable for tracking if paypal SDK is loaded
    const [sdkReady, setSdkReady] = useState(false)

    const orderPay = useSelector(state=>state.orderPay)
    // new style of variable calling, to avoid conflict with orderDetails state variables
    // deconstruct and load success as successPay and loading as loadingPay 
    const {success:successPay, loading:loadingPay} = orderPay  

    // depends on order payment status, triggered inside useEffect 
    const addPayPalScript = ()=> {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AcyNHJGgXtK8uKdSqlAW5cP9TdE1jDkdo4psnLCm7sGBzhbp7ORiCo2LwVqOZfY49WXWRXImibpzjYZB'
        script.async = true 
        script.onload = ()=> {
            setSdkReady(true) 
        }
        document.body.appendChild(script) 
    }
    
    useEffect(()=>{
        // dispatches the action to load "orderDetails" data from server 
        // if the redux state already loaded the data then skip 
        if(!order || successPay || order._id !== Number(orderId)){  
            dispatch({type:ORDER_PAY_RESET}) // clears orderPay state before loading to remove any previous data 
            dispatch(getOrderDetails(orderId))  
        }else if(!order.isPaid){ // if order is not paid 
            if(!window.paypal){ // and paypal SDK script is not loaded yet 
                addPayPalScript() // load the script 
            }else{
                setSdkReady(true) // if SDK script is loaded, set redux status variable to true 
            }
        }
    }, [order, orderId, dispatch, successPay])    

    const successPaymentHandler = (paymentResult)=>{
        dispatch(payOrder(orderId, paymentResult))
    }

    // if redux store is still loading, then show spinner, otherwise if error, show error message, 
    // otherwise start rendering the actual view "orderDetails"  
    return loading ? ( 
        <Loader />
    ) : error ? (
            <Message variant='danger'>{error}</Message>  
    ) : (
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p><strong>Shipping: </strong> 
                                {order.shippingAddress.address}, {order.shippingAddress.city} 
                                {' '}
                                {order.shippingAddress.postalCode}, 
                                {' '}
                                {order.shippingAddress.country} 
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant="warning">Delivery in progress</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant="warning">Payment pending</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>You have no orders</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded /> 
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)} 
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>

                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items: </Col>
                                    <Col>${order.itemsPrice}</Col> 
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>${order.shippingPrice}</Col> 
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax: </Col>
                                    <Col>${order.taxPrice}</Col> 
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price: </Col>
                                    <Col>${order.totalPrice}</Col> 
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount ={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen

