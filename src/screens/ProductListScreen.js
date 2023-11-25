
import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ProductListScreen({history, match}) {

    const dispatch = useDispatch()

    const productList = useSelector(state=>state.productList)
    const {loading, error, products} = productList

    const productDelete = useSelector(state=>state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const productCreate = useSelector(state=>state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

    const errorProductDelete = false // will be changed later

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET}) 
        if (!userInfo.isAdmin){
            history.push('/login') 
        }
        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`) 
        }else{
            dispatch(listProducts()) 
        }
         
    },[dispatch, history, userInfo, successDelete, successCreate, createdProduct])   

    const deleteHandler = (id) => { 
        if(window.confirm('Are you sure to delete this product?')){
            // delete products 
            //console.log('Delete handler clicked')
            dispatch(deleteProduct(id)) 
        }
    }

    const createProductHandler = () =>{
        dispatch(createProduct())   
    }


  return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1> 
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Add Product
                </Button>
            </Col>
        </Row> 

        {/* loader and error message for product delete */}
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {/* loader and error message for product create */}
        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>} 

        {/* if loading then show spinner, or if error then show error message, otherwise show the main content below */}
        {loading ? (<Loader />) 
        : error ? (<Message variant='danger'>{error}</Message>) 
        : (
            <>  
                {/* shows error related to user deletion */}
                {errorProductDelete ? (<Message variant='danger'>{errorProductDelete}</Message>)
                : (<></>) 
                }
                
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>PRICE</td>
                            <td>CATEGORY</td>
                            <td>BRAND</td> 
                            <td>ACTIONS</td> 
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>( 
                            <tr key={product._id}>
                                <td>{product._id}</td> 
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td> 
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit' style={{color:'blue'}}></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='light' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                                        <i className='fas fa-trash' style={{color:'red'}}></i>
                                    </Button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        )}
    
    </div>
  )
}

export default ProductListScreen
