/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Container, Row, Col } from "shards-react";
import firebase, { fire } from '../Firebase';

class Main extends Component {
    async componentWillMount(){
        await fire()
        await firebase.auth().onAuthStateChanged(function(user) {
            user
            ? console.log(user.email)
            : location.href='/'
        });
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col></Col>
                </Row>
            </Container>
        );
    }
}

export default Main;