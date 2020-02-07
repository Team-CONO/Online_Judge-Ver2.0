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
        this.state = ({islevel: [], islogIn: false})
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
        firebase
            .database()
            .ref('posts' + this.props.location.pathname)
            .once('value')
            .then(snapshot => {
                snapshot.forEach(item => {
                    this.setState({
                        islevel: this
                            .state
                            .islevel
                            .concat(item.val().title)
                    })
                })
            });
    }
    goto = () => {
        alert('문제야 나와줘~')
    }
    render() {

        return (
            <div>
                {
                    this.state.islogIn
                        ? <Card className="my-4 mx-5">
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
                                            {
                                                this
                                                    .state
                                                    .islevel
                                                    .map((title, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{index + 1}</td>
                                                                <td
                                                                    onClick={this.goto}
                                                                    style={{
                                                                        cursor: 'pointer'
                                                                    }}>
                                                                    <font color='blue'>{title}</font>
                                                                </td>
                                                                <td>어드민</td>
                                                            </tr>
                                                        )
                                                    })
                                            }
                                        </tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        : null
                }
            </div>
        );
    }
}

export default Tables;
