
import React, {useState, useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message' 
import CheckoutSteps from '../components/CheckoutSteps'
//import { saveShippingAddress } from '../actions/cartActions'



function PlaceOrderScreen() {

    const cart = useSelector(state=>state.cart)

    // multiplies item price with quantity for each cart items, then caculates total upto 2 decimal places 
    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item)=>acc+item.price*item.qty, 0)).toFixed(2)   
    
    // if total price > 100 dollars then free shipping, otherwise 10 dollar. This can be made dynamic in future version
    cart.shippingPrice = Number(cart.itemsPrice > 100 ? 0 : 10).toFixed(2)

    // calculate tax as 15%, will be made configurable via admin portal in later version 
    cart.taxPrice = Number(cart.itemsPrice*0.15).toFixed(2) 

    //cart.totalPrice = Number(cart.itemsPrice + cart.shippingPrice + cart.taxPrice) 
    cart.totalPrice = Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice) 


    const placeOrder = () => {
        console.log('place order')
    }

  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Shipping: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}
                            {' '}
                            {cart.shippingAddress.postalCode}, 
                            {' '}
                            {cart.shippingAddress.country} 
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p><strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message variant='info'>Your Cart is empty</Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index)=>(
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
                                <Col>Item: </Col>
                                <Col>${cart.itemsPrice}</Col> 
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping: </Col>
                                <Col>${cart.shippingPrice}</Col> 
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax: </Col>
                                <Col>${cart.taxPrice}</Col> 
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price: </Col>
                                <Col>${cart.totalPrice}</Col> 
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type='buttton'
                                className = 'btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrder}
                            >Place Order
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
      
    </div>
  )
}

export default PlaceOrderScreen
