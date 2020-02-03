import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from "shards-react";
import firebase, {fire} from '../Firebase'

class Admin_view extends Component {
    constructor(props) {
        super(props)
        fire()
        this.state = ({islevel: []})
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
                }
            });
        // firebase     .database()     .ref('posts' + this.props.location.pathname)
        // .once('value')     .then(snapshot => {         snapshot.forEach(item => {
        // this.setState({                 islevel: this                     .state
        // .islevel                     .concat(item.val().title)             })
        // })     });
    }
    render() {
        return (
            <Row>
                <Col>
                    <Card className="my-4 mx-5">
                        <CardHeader className="border-bottom">
                            <h4 className="m-0">학생 관리</h4>
                        </CardHeader>
                        <CardBody className="p-0 pb-3">
                            <table className="table mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th scope="col" className="border-0">
                                            #
                                        </th>
                                        <th scope="col" className="border-0">
                                            회원명
                                        </th>
                                        <th scope="col" className="border-0">
                                            레벨
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Admin_view;
