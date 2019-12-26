import React, { Component } from 'react';
import { Container, Row, Col, Form, FormInput, FormGroup, Button } from "shards-react";
import logo from '../images/logo.png'

class Login extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <img src={logo} />
                    </Col>            
                </Row>
                <Row>
                    <h1>Sign to Nextop!</h1>
                </Row>
                <Row>
                    <Form>
                        <FormGroup>
                            <label htmlFor="#Email">Email</label>
                            <FormInput id="#Email" placeholder="Email" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="#password">Password</label>
                            <FormInput type="password" id="#password" placeholder="Password" />
                        </FormGroup>
                    </Form>
                </Row>
                <Row>
                    <Button theme="success">Sign in</Button>
                </Row>
            </Container>
        );
    }
}

export default Login;