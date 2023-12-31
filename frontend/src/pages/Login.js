import React,{ useState,useContext } from 'react'
import { Form, Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import UserContext from '../store/user-context';


function Login() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const history = useHistory();

    const currentUser = useContext(UserContext);
    //console.log(currentUser);
    const { getLoggedIn } = currentUser;

    

    async function loginFormHandler(e){

        e.preventDefault();

        //send user's data to backend  
        const loginUserData = {
          email,
          password,
        }
        const res = await axios.post('/login',loginUserData);
        console.log(res);
        console.log('Logged in Successfully');
        // once logged in update the user context
        getLoggedIn();
        history.push('/products');
    }


    return (
        <Row style={{marginBottom:'16rem',marginTop:'8rem'}}>
            <Col lg={3}></Col>
            <Col lg={6}>
                    <h1 align="center">Login to App</h1>
                    <Form onSubmit={loginFormHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
            <Col lg={3}></Col>
        </Row>
    )
}


export default Login;
