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
        this.state={
            email:'',
            password:'',
            islogin:false
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.email || !this.state.password)
        {
            alert('빈칸을 채워주세요!');
        }
        console.log("Click!");
        try{
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res=>{
                if(res.user) this.props.history.push('/Main')
                else alert('가입된 계정이 아닙니다...')
            })
        }catch(e){
            alert(e);
        }
    }
    handleGoogleSubmit(){
        console.log("Click!");
        try{
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(res=>{
                if(res.user) this.props.history.push('/Main')
            })
        }catch(e){
            alert(e);
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log(this.state)
    }
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
                                <Form onSubmit={this.handleSubmit}>
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
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>                    
                </Row>
                <Row className="page-bottom py-5">
                    <div className = "error__content" ><h6>혹은</h6></div>
                    <GoogleLoginButton onClick={() => this.handleGoogleSubmit()} />
                </Row>
                <Row>
                    <Col>
                        <Button outline type="submit">넥스탑에 가입</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Login;