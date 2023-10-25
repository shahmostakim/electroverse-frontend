
import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen({match, location, history}) {

    const Id = match.params.id 
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    //console.log('qty: ', qty)
    const dispatch = useDispatch()

    const cart = useSelector(state=>state.cart)
    const {cartItems} = cart 

    // function for remove item button
    const removeFromCartHandler = (id)=>{
        dispatch(removeFromCart(id))  
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    // calculate number of total cart items, not used now after refactoring 
    const NumberOfCartItems = (cartItems) => {
        let total = cartItems.reduce((acc, item)=>acc+item.qty, 0)
        if (total>0){
            return false
        }else{
            return true 
        }
    }

    useEffect(()=>{
        if(Id){
            dispatch(addToCart(Id, qty)) 
        }
    }, [dispatch, Id, qty])


  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            { !cartItems ? (
                <Message variant='info'>
                    Your Cart is empty <Link to='/'>Go Back</Link>
                </Message>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map(item=>(
                        <ListGroup.Item key={item.productId}>
                            <Row>
                                <Col md={2}><Image src={item.image} alt={item.name} fluid rounded /></Col>
                                <Col md={3}><Link to={`/product/${item.productId}`}>{item.name}</Link></Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={3}>
                                    <Form.Control 
                                        as="select"
                                        value={item.qty}
                                        onChange={(e)=>dispatch(addToCart(item.productId, Number(e.target.value)))}
                                    >
                                    {
                                        /* for each cart item, populate individual dynamic dropdown lists based on each product's countInStock value */
                                        /* similar to productScreen page, but here we do the same for each diffrent products in cartItems array */
                                        [...Array(item.countInStock).keys()].map((x)=>(
                                        <option key={x+1} value={x+1}>
                                            {x+1} 
                                        </option>  
                                        ))
                                        
                                        //qtyDropdownOptions // alternate way to populate dropdown options, does the same thing as the code above 
                                    }
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                    <Button
                                        type='button'
                                        variant='outline-danger'
                                        onClick={()=>removeFromCartHandler(item.productId)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            { !cartItems ? (
                <div></div>
            ):(
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item)=>acc+item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item)=>acc+item.qty*item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        <Row className='p-2 mx-2'>
                            <Button
                                type='button'
                                variant='info'
                                /*disabled={NumberOfCartItems(cartItems)}*/
                                disabled={!cartItems} /* after refactoring */
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout 
                            </Button>
                        </Row>
                    </ListGroup.Item>
                </Card>
            )}
            
        </Col>
    </Row>
  )
}

export default CartScreen

