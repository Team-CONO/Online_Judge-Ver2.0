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
        this.state = ({islogIn: false, string: ''})
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.islogIn) {
            return {
                string: <div className="error">
                        <div className="error__content">
                            <h2>Hello World!</h2>
                            <h3>넥스탑 문제풀이 사이트 입니다</h3>
                            <p>모든 문제는 담당 선생님께 문의해 열람이 가능합니다</p>
                        </div>
                    </div>
            }
        } else if (!prevState.islogIn) {
            return {string: null}
        }
    }
    componentDidMount() {
        firebase
            .auth()
            .onAuthStateChanged(user => {
                if (!user) {
                    alert('비정상적인 접근입니다!')
                    this
                        .props
                        .history
                        .push('/')
                } else {
                    this.setState({islogIn: true})
                }
            });
    }
    render() {
        return (
            <Container fluid>
                {this.state.string}
            </Container>
        );
    }
}

export default Main;