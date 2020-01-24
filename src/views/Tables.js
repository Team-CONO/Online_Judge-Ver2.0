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

class Tables extends Component {
    constructor(props) {
        super(props)
        fire()
        this.state = ({islevel: ''})
    }
    render() {
        firebase
            .database()
            .ref(this.props.level)
            .once('value')
            .then(snapshot => {
                this.setState({islevel: snapshot.val()})
            });
        return (
            <Card small className="my-4 mx-5">
                <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th scope="col" className="border-0">
                                    #
                                </th>
                                <th scope="col" className="border-0">
                                    문제 이름
                                </th>
                                <th scope="col" className="border-0">
                                    업로더
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.level}</td>
                                <td>{this.state.islevel.title}</td>
                                <td>어드민</td>
                            </tr>
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        );
    }
}

export default Tables;
