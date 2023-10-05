
import React, {useState, useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers } from '../actions/userActions'

function UserListScreen({history}) {

    const dispatch = useDispatch()

    const userList = useSelector(state=>state.userList)
    const {loading,error,users} = userList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        if (userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
         
    },[dispatch, history])

    const deleteUser = (id) => {
        console.log('delete: ', id)
    }

  return (
    <div>
        <h1>Users </h1>
        {/* if loading then show spinner, or if error then show error message, otherwise show the main content below */}
        {loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>ADMIN</td>
                        <td></td> 
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>(
                        <tr key={user._id}>
                            <td>{user._id}</td> 
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? (
                                <i className='fas fa-check' style={{color:'green'}}></i>
                            ) : (<i className='fas fa-check' style={{color:'red'}}></i>)}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit' style={{color:'blue'}}></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='light' className='btn-sm' onClick={()=>deleteUser(user._id)}>
                                    <i className='fas fa-trash' style={{color:'red'}}></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    
    </div>
  )
}

export default UserListScreen