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
import firebase, {fire} from '../Firebase';
import logo from '../images/logo.png'

// eslint-disable-next-line no-unused-vars
class SignUpPage extends Component {
    constructor(props) {
        super(props);
        fire();
        this.state = ({username: '', email: '', password: ''});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.email || !this.state.password || !this.state.username) {
            alert('빈칸을 채워주세요!');
            return;
        }
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(res => {
                    if (res.user) {
                        res
                            .user
                            .updateProfile({displayName: this.state.username})
                        alert('회원이 되신것을 환영합니다!')
                        this
                            .props
                            .history
                            .push('/')
                        firebase
                            .database()
                            .ref('accounts/' + res.user.uid)
                            .set({email: this.state.email, name: this.state.username})
                            .catch((e) => {
                                alert(e)
                                //console.log(e);
                            });
                    }
                })
                .catch((e) => {
                    switch (e.code) {
                        case 'auth/email-already-in-use':
                            alert('이미 가입된 계정입니다');
                            break;
                        case 'auth/weak-password':
                            alert('비밀번호는 최소 6자리 이상입니다');
                            break;
                        case 'auth/invalid-email':
                            alert("이메일 형식이 잘못 되었습니다")
                            break
                        default:
                            alert(e);
                            //console.log(e);
                            break;
                    }
                });
        } catch (e) {
            alert(e)
            //console.log(e);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <Row className="page-header py-4">
                    <Col>
                        <Link to="/"><img src={logo} width="220px" height="200px"/></Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader className="border-bottom">
                                <h3 className='mx-5'>회원가입</h3>
                            </CardHeader>

                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup className="text-left">
                                        <label htmlFor="#username">회원명</label>
                                        <FormInput
                                            type="text"
                                            name="username"
                                            placeholder="UserName"
                                            onChange={this.handleChange}/>
                                    </FormGroup>

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
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="page-bottom py-5">
                        <Col >
                            <Button outline type="submit">회원 가입</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default SignUpPage;