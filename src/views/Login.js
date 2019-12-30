import React, { Component } from 'react';
import { 
    Container,
    Row,
    Col,
    Form,
    FormInput,
    FormGroup,
    Button,
    Tooltip,
    Card,
    CardHeader,
    CardBody, }from "shards-react";
import logo from '../images/logo.png'

class Login extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col xs={{ offset : 5 }} lg ={{ offset:6 }}>
                        <img src={ logo } />
                    </Col>            
                </Row>
                <Row>
                    <Col xs={{size:"12" ,offset:"3"}} lg={{ offset:5 }}>
                        <Card style={{maxWidth : "300px"}}>
                            <CardHeader className="border-bottom">
                            <h3>Sign to Nextop!</h3>
                            </CardHeader>

                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <label htmlFor="#Email">이메일</label>
                                        <FormInput id="#Email" placeholder="Email" />
                                    </FormGroup>

                                    <FormGroup>
                                        <label htmlFor="#password">비밀번호</label>
                                        <FormInput type="password" id="#password" placeholder="Password" />
                                    </FormGroup>
                                    
                                    <FormGroup className="mb-0">
                                        <Button theme="success" type="submit">
                                            로그인
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{size:12,offset:5}} lg={{offset:6}}>                    
                        <Button outline pill>
                            Sign-up
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;