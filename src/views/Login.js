import React, { Component } from 'react';
import { Container, Row, Col, Form, FormInput, FormGroup, Button } from "shards-react";

class Login extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <img src="http://www.nextopedu.co.kr/default/img/_images/logo.png" />
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