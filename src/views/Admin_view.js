import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormSelect,
    InputGroup,
    FormInput,
    Form,
    InputGroupAddon,
    InputGroupText
} from "shards-react";
import firebase, {fire} from '../Firebase'

class Admin_view extends Component {
    constructor(props) {
        super(props)
        fire()
        this.state = ({accounts: [], islogIn: false})
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
                    return
                } else {
                    this.setState({islogIn: true})
                }
            });
        firebase
            .database()
            .ref('accounts')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(item => {
                    this.setState({
                        accounts: this
                            .state
                            .accounts
                            .concat({
                                name: item
                                    .val()
                                    .name,
                                role: item
                                    .val()
                                    .role
                            })
                    })
                })
            });

    }
    handleChange = (e) => {
        console.log(e.target.name);
        // const account = firebase     .auth()     .currentUser; firebase .database()
        // .ref('accounts/' + account.uid)     .set({email: account.email, name:
        // account.displayName, role: e.target.value}) .then(alert('변경 완료!')) .catch((e)
        // => {         alert(e) console.log(e);     });
    }
    render() {
        //console.log(this.state.accounts);
        return (
            <div>
                {
                    this.state.islogIn
                        ? <Row>
                                <Col>
                                    <Card className="my-4 mx-5">
                                        <CardHeader className="border-bottom">
                                            <h4 className="m-0">학생 관리</h4>
                                        </CardHeader>
                                        <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                                            <InputGroup seamless="seamless" size="lg" className="ml-3">
                                                <InputGroupAddon type="prepend">
                                                    <InputGroupText>
                                                        <i className="material-icons">search</i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <FormInput className="navbar-search" placeholder="닉네임 조회"/>
                                            </InputGroup>
                                        </Form>
                                        <CardBody className="p-0 pb-3">
                                            <table className="table mb-0">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th scope="col" className="border-0">
                                                            #
                                                        </th>
                                                        <th scope="col" className="border-0">
                                                            닉네임
                                                        </th>
                                                        <th scope="col" className="border-0">
                                                            등급
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this
                                                            .state
                                                            .accounts
                                                            .map((acc, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            {acc.name}
                                                                        </td>
                                                                        <td>
                                                                            <FormSelect onChange={this.handleChange}>
                                                                                <option value={index}>{acc.role}</option>
                                                                                <option name={acc.name} value='Admin'>Admin</option>
                                                                                <option name={acc.name} value='Student'>Student</option>
                                                                                <option name={acc.name} value='Guest'>Guest</option>
                                                                            </FormSelect>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                    }
                                                </tbody>
                                            </table>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        : null
                }
            </div>
        );
    }
}

export default Admin_view;