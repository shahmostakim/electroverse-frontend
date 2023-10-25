import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions' 


function PaymentScreen({history}) {

    const dispatch = useDispatch() 

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const cart = useSelector(state=>state.cart) 
    const {shippingAddress} = cart 

    /*
    if(!shippingAddress.address){
        history.push('/shipping') 
    } */

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        
        <Form onSubmit={submitHandler}>

            <Form.Group>
                <Form.Label as='legend'>
                    Select Method
                </Form.Label>
                <Col>
                    <Form.Check 
                        type='radio' 
                        label='Paypal or Credit Card' 
                        id='paypal' 
                        name='paymentMethod'
                        checked
                        onChange = {(e)=>setPaymentMethod(e.target.value)} 
                    >

                    </Form.Check>
                </Col>
            </Form.Group>

            <Row className='py-3'>
                <Col>
                    <Button type='submit' variant='primary'>Continue</Button> 
                </Col>
            </Row>
        </Form> 
      
    </FormContainer>
  )
}

export default PaymentScreen
