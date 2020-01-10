import React, { Component } from 'react';
import { Container, Row, Col } from "shards-react";
import firebase from '../Firebase'

class Main extends Component {
    async componentDidMount(){
        try {
            await firebase.auth().currentUser;
            console.log(firebase.auth().currentUser.email);
        } catch (error) {
            console.log(error)
        }
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