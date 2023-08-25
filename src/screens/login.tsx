import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../../src/App.css';

const LoginScreen = ({ location, history }) => {
    const url = "https://appointment-nestjs-production.up.railway.app";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); 
    const [isSignUp, setIsSignUp] = useState(false); 
    const [errorMessage, setErrorMessage ]= useState('');


    const submit = async () => {
        try {
            let endpoint;
            let payload;

            if (isSignUp) {
                endpoint = `${url}/auth/signup`;
                payload = { name, username, password };
            } else {
                endpoint = `${url}/auth/login`;
                payload = { username, password };
            }

            const response = await axios.post(endpoint, payload);

            if (response.status === 201) {
                localStorage.setItem('user', JSON.stringify(response.data));
                history.push('/');
            }
        } catch (e) {
          setErrorMessage('wrong password or userName')
            console.log(e);
        }
    };

    return (
        <div className='background-image-auth'>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Row>
                    <Col>
                        <h4>{isSignUp ? 'Sign Up' : 'Login'}</h4>
                        <Form>
                            {isSignUp && (
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                                </Form.Group>
                            )}
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary block" onClick={submit}>
                                {isSignUp ? 'Sign Up' : 'Login'}
                            </Button>
                        </Form>

                        <p>{errorMessage}</p>

                        <Button variant="link" onClick={() => setIsSignUp(prev => !prev)}>
                            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
                        </Button>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default LoginScreen;
