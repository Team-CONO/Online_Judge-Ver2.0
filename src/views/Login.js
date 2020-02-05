import React, {Component} from 'react';
import {
    Row,
    Col,
    Form,
    FormInput,
    FormGroup,
    Button,
    Card,
    CardHeader,
    CardBody
} from "shards-react";
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import firebase, {fire} from '../Firebase';
import GoogleButton from 'react-google-button'

class Login extends Component {
    constructor(props) {
        super(props);
        fire();
        this.state = ({email: '', password: ''});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.email || !this.state.password) {
            alert('빈칸을 채워주세요!');
            return;
        }
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(res => {
                    if (res.user) 
                        this
                            .props
                            .history
                            .push('/Main')
                    })
                .catch((e) => {
                    switch (e.code) {
                        case 'auth/wrong-password':
                            alert('비밀번호가 틀렸습니다');
                            break;
                        case 'auth/user-not-found':
                            alert('등록된 계정이 아닙니다');
                            break;
                        default:
                            alert(e)
                            break;
                    }
                });
        } catch (e) {
            alert(e.message);
        }
    }
    handleGoogleSubmit() {
        try {
            const googleAuthProvider = new firebase
                .auth
                .GoogleAuthProvider();
            firebase
                .auth()
                .signInWithPopup(googleAuthProvider)
                .then(res => {
                    if (res.user) 
                        this
                            .props
                            .history
                            .push('/Main')
                    firebase
                        .database()
                        .ref('accounts/' + res.user.uid)
                        .once('value')
                        .then(snapshot => {
                            if (!snapshot.val()) {
                                firebase
                                    .database()
                                    .ref('accounts/' + res.user.uid)
                                    .set({email: res.user.email, name: res.user.displayName, role: 'Guest'})
                                    .catch((e) => {
                                        alert(e)
                                        console.log(e);
                                    });
                            }
                        })
                })
        } catch (e) {
            alert(e.code);
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <Row className="page-header py-4">
                    <Col>
                        <Link to="/"><img src={logo}/></Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader className="border-bottom">
                                <h3 className='m-0'>넥스탑에 로그인</h3>
                            </CardHeader>

                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup className="text-left">
                                        <label htmlFor="#Email">이메일</label>
                                        <FormInput
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            onChange={this.handleChange}/>
                                    </FormGroup>

                                    <FormGroup className="text-left">
                                        <label htmlFor="#password">비밀번호</label>
                                        <FormInput
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            onChange={this.handleChange}/>
                                    </FormGroup>

                                    <FormGroup className="mt-4 mb-0">
                                        <Button className='btn-block' theme="success" type="submit">
                                            로그인
                                        </Button>
                                        <div className='mt-3'>
                                            <Link to='/SignUp'>넥스탑에 처음이신가요?</Link>
                                        </div>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {
                    <Row className="m-5">
                            <GoogleButton label='구글계정으로 로그인' onClick={() => this.handleGoogleSubmit()}/>
                        </Row>
                }
            </div>
        );
    }
}

export default Login;