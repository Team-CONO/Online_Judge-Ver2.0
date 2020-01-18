/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader } from "shards-react";
import firebase, { fire } from '../Firebase';
// import { BrowserRouter } from 'react-router-dom';

class Main extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            console.log('props', this.props.match.params, ' prev', prevProps.match.params);
        }
    }
    async componentWillMount() {
        await fire()
        await firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                alert('비정상적인 접근입니다!')
                location.href = '/'
            }
            else console.log(user)
        });
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                <div className="error">
                    <div className="error__content">
                        {/* <h2>Hello World!</h2>
                    <h3>넥스탑 문제풀이 사이트 입니다</h3>
                    <p>문제 열람 관련해선 담당 선생님께 문의 바랍니다</p> */}
                        <Row>
                            <Col>
                                <Card small className="mb-4">
                                    <CardHeader className="border-bottom">
                                        <h6 className="m-0">문제 리스트</h6>
                                    </CardHeader>
                                    <CardBody className="m-5 p-5">
                                        <table className="table mb-0">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th scope="col" className="border-0">
                                                        #
                                                    </th>
                                                    <th colSpan='5' className="border-0">
                                                        문제 이름
                                                    </th>
                                                    <th scope="col" className="border-0">
                                                        업로더
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td colSpan='5'>Test Name</td>
                                                    <td>Admin</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td colSpan='5'>Test Name</td>
                                                    <td>Admin</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td colSpan='5'>Test Name</td>
                                                    <td>Admin</td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td colSpan='5'>Test Name</td>
                                                    <td>Admin</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Main;