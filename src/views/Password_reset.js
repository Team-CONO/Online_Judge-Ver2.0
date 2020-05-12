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
class Password_reset extends Component {
    constructor(props) {
        super(props);
        fire();
        this.state = ({email: ''});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.email) {
            alert('빈칸을 채워주세요!');
            return;
        } else {
            firebase
                .auth()
                .languageCode = 'ko';
            // To apply the default browser preference instead of explicitly setting it.
            // firebase.auth().useDeviceLanguage();
            var auth = firebase.auth();
            var emailAddress = this.state.email;

            auth
                .sendPasswordResetEmail(emailAddress)
                .then(() => {
                    // Email sent.
                    alert('해당 이메일 주소로 비밀번호 변경 관련 메일을 보냈습니다!')
                    this
                        .props
                        .history
                        .push('/')
                })
                .catch(function (error) {
                    // An error happened.
                    alert("잘못된 주소 입니다...")
                    //console.log(error);
                });
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
                                <h3 className='m-0'>비밀번호 찾기</h3>
                            </CardHeader>

                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup className="text-left">
                                        <label htmlFor="#Email">가입된 계정에 해당하는 이메일 주소</label>
                                        <FormInput
                                            className="mt-2"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
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
                            <Button outline type="submit">전송</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Password_reset;