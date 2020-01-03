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
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'

class Login extends Component {
    state={
        email:'',
        password:''
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Click!");
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.email]: e.target.password
        });
    }
    render() {
        return (
            <Container fluid className = "error__content">
                <Row className="page-header py-4">
                    <Col>
                        <Link to="/"><img src={ logo }/></Link>
                    </Col>            
                </Row>
                <Row>
                    <Col>
                        <Card style = {{maxWidth:"500px"}}>
                            <CardHeader className = "border-bottom">
                            <h3>Sign to Nextop!</h3>
                            </CardHeader>

                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup className = "text-left">
                                        <label htmlFor="#Email">이메일</label>
                                        <FormInput 
                                            type="email" 
                                            id={this.state.email}
                                            placeholder="Email"                                            
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup className = "text-left">
                                        <label htmlFor="#password">비밀번호</label>
                                        <FormInput 
                                            type="password" 
                                            id={this.state.password}
                                            placeholder="Password" 
                                            onChange={this.handleChange}
                                        />
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