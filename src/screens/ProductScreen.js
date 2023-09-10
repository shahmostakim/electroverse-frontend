import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom' 
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import axios from 'axios'

function ProductScreen({match}) {
    
  const [product, setProduct] = useState([]) 

  useEffect(()=>{
    async function fetchProduct(){
      const {data} = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }
    fetchProduct()     
  },[]); 

  const checkIfAvailable = () =>{
    let result = false 
    product.countInStock <= 0 ? result=true : result=result 
    return result 
  }

  const findButtonClassName = () =>{
    let className = 'btn-info'
    product.countInStock <= 0 ? className='btn-danger' : className=className
    return className
  }

  return (
    <div>
      <Link to={'/'} className='btn btn-primary m-3'>Go Back</Link> 
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews `} color={'#f8e825'}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col> 
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col> 
                  <Col>{product.countInStock>0?`${product.countInStock} in stock`:'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className={findButtonClassName()} disabled={checkIfAvailable()} type='button'>Add to Cart</Button>
              </ListGroup.Item> 
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
