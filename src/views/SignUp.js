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
                    default:
                        alert(e);
                        break;
                }
            });
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
                        <Link to="/"><img src={logo}/></Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader className="border-bottom">
                                <h3 className='m-0'>넥스탑에 회원가입</h3>
                            </CardHeader>

                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup className="text-left">
                                        <label htmlFor="#username">닉네임</label>
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
                            <Button outline="outline" type="submit">회원 가입</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default SignUpPage;