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
            else console.log(user.email)
        });
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                <div className="error">
                <div className="error__content">                                       
                </div>
                </div>
            </Container>
        );
    }
}

export default Main;