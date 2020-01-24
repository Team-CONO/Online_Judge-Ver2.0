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
    shouldComponentUpdate()
    {
      console.log("되는겨 안되는겨");
      return true;
    }
    async componentDidMount() {
        await firebase
            .database()
            .ref(this.props.level)
            .once('value')
            .then(snapshot => {
                this.setState({islevel: snapshot.val()})
            });
        console.log(this.state.islevel.title);
        console.log(this.state.islevel.body);
    }
    render() {
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
                                <td></td>
                                <td></td>
                            </tr>
                            {/* <tr>
                        <td>1</td>
                        <td>Ali</td>
                        <td>Kerry</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Clark</td>
                        <td>Angela</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Jerry</td>
                        <td>Nathan</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Colt</td>
                        <td>Angela</td>
                    </tr> */
                            }
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        );
    }
}

export default Tables;
