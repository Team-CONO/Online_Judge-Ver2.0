/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Container, Row, Col } from "shards-react";
import firebase, { fire } from '../Firebase';

class Main extends Component {
    async componentWillMount(){
        await fire()
        await firebase.auth().onAuthStateChanged(function(user) {
            if(!user)
            {
                alert('비정상적인 접근입니다!')
                location.href='/'
            }
        });
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                <div className="error">
                <div className="error__content">
                    <h2>Hello World!</h2>
                    <h3>넥스탑 문제풀이 사이트 입니다</h3>
                    <p>문제 열람 관련해선 담당 선생님께 문의 바랍니다</p>
                </div>
                </div>
            </Container>
        );
    }
}

export default Main;