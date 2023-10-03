
import React, {useState, useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message' 
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'


function OrderScreen({match}) {  
    const orderId = match.params.id 
    const dispatch = useDispatch() 

    const orderDetails = useSelector(state=>state.orderDetails)
    const {order, error, loading} = orderDetails 

    // this calculation only will take place after all the data has been loaded to redux state 
    if(!loading && !error){
        order.itemsPrice = Number(order.orderItems.reduce((acc, item)=>acc+item.price*item.qty, 0)).toFixed(2)
    } 
        
    useEffect(()=>{
        // dispatches the action to load "orderDetails" data from server 
        // if the redux state already loaded the data then skip 
        if(!order || order._id !== Number(orderId)){  
            dispatch(getOrderDetails(orderId)) 
        }
    }, [order, orderId])  

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

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderScreen

