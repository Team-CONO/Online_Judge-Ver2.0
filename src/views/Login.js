import React, { Component } from 'react';
import { 
    Container,
    Row,
    Col,
    Form,
    FormInput,
    FormGroup,
    Button,
    Card,
    CardHeader,
    CardBody, } from "shards-react";
import logo from '../images/logo.png'

class Login extends Component {
    render() {
        return (
            <Container fluid className = "text-center">
                <Row className="page-header py-4">
                    <Col>
                        <img src={ logo } />
                    </Col>            
                </Row>
                <Row>
                    <Col lg={{ offset:5 }} sm={{ offset:4 }}>
                        <Card style={{ maxWidth : "300px" }}>
                            <CardHeader className = "border-bottom">
                            <h3>Sign to Nextop!</h3>
                            </CardHeader>

                            <CardBody>
                                <Form>
                                    <FormGroup className = "text-left">
                                        <label htmlFor="#Email">이메일</label>
                                        <FormInput id="#Email" placeholder="Email" />
                                    </FormGroup>

                                    <FormGroup className = "text-left">
                                        <label htmlFor="#password">비밀번호</label>
                                        <FormInput type="password" id="#password" placeholder="Password" />
                                    </FormGroup>
                                    
                                    <FormGroup className="mb-0 text-center">
                                        <Button theme="success" type="submit">
                                            로그인
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="page-bottom py-5">
                    <Col >
                        <Button outline type="submit">넥스탑에 가입</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;