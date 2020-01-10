import React, { Component } from 'react';
import { Container, Row, Col } from "shards-react";
import firebase, { fire } from '../Firebase';

class Main extends Component {
    async componentDidMount(){
        await fire()

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log('O');
              
            } else {
              // No user is signed in.
              console.log('X')
            }
        });
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>Main Page!</Col>
                </Row>
            </Container>
        );
    }
}

export default Main;