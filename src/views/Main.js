/* eslint-disable no-restricted-globals */
import React, {Component} from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader
} from "shards-react";
import firebase, {fire} from '../Firebase';

class Main extends Component {
    constructor(props) {
        super(props)
        fire()
        this.state = ({islogIn: true})
    }
    componentWillMount() {
        firebase
            .auth()
            .onAuthStateChanged(function (user) {
                if (!user) {
                    alert('비정상적인 접근입니다!')
                    location.href = '/'
                }
            });
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            console.log('props', this.props.match.params, ' prev', prevProps.match.params);
        }
    }
    render() {
        return (
            <Container fluid="fluid" className="main-content-container px-4 pb-4">
                <div className="error">
                    <div className="error__content"></div>
                </div>
            </Container>
        );
    }
}

export default Main;