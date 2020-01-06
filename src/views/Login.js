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
import logo from '../images/logo.png';
import firebase, { fire } from '../Firebase';
import { GoogleLoginButton  } from "react-social-login-buttons";

class Login extends Component {
    constructor(props){
        super(props);
        fire();
        // this.state={
        //     email:'',
        //     password:''
        // }
    }
    handleSubmit=(e)=>{
        //e.preventDefault();
        console.log("Click!");
        try{
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(alert('wwwwwwwwwwwelcome!'));
        }catch(e){
            alert(e);
        }

    }
    // handleChange=(e)=>{
    //     this.setState({
    //         [e.target.name]:e.target.value
    //     })
    //     console.log(this.state)
    // }
    render() {
        return (
            <Container fluid className = "error__content">
                <Row className="page-header py-5">
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
                                <GoogleLoginButton onClick={() => this.handleSubmit()} />
                                {/* <Form onSubmit={this.handleSubmit}>
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
                                    
                                    <FormGroup className="mb-0 text-center">
                                        <Button theme="success" type="submit">
                                            로그인
                                        </Button>
                                    </FormGroup>
                                </Form> */}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* <Row className="page-bottom py-5">
                    <Col >
                        <Button outline type="submit">넥스탑에 가입</Button>
                    </Col>
                </Row> */}
            </Container>
        );
    }
}

export default Login;