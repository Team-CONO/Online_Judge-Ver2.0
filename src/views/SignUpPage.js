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

// eslint-disable-next-line no-unused-vars
class SignUpPage extends Component {
    state={
        username:'',
        email:'',
        password:''
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Click!");
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <Row className="page-header py-4">
                    <Col>
                        <Link to="/"><img src={ logo }/></Link>
                    </Col>            
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader className = "border-bottom">
                            <h3 className='m-0'>넥스탑에 회원가입</h3>
                            </CardHeader>

                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup className = "text-left">
                                        <label htmlFor="#username">닉네임</label>
                                        <FormInput 
                                            type="username" 
                                            name="username"
                                            placeholder="UserName" 
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup className = "text-left">
                                        <label htmlFor="#Email">이메일</label>
                                        <FormInput 
                                            type="email" 
                                            name="email"
                                            placeholder="Email"                                            
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup className = "text-left">
                                        <label htmlFor="#password">비밀번호</label>
                                        <FormInput 
                                            type="password" 
                                            name="password"
                                            placeholder="Password" 
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="page-bottom py-5">
                        <Col >
                            <Button outline type="submit">Sign up</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default SignUpPage;