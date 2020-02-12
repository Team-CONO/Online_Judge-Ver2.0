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
                                            uid: item.key,
                                            role: item
                                                .val()
                                                .role
                                        })
                                })
                            })
                        })
                        .catch((e) => {
                            console.log(e.code);
                            switch (e.code) {
                                case 'PERMISSION_DENIED':
                                    alert('접근 권한이 없습니다!')
                                    this
                                        .props
                                        .history
                                        .push('/Main')
                                    break;

                                default:
                                    alert(e)
                                    break;
                            }

                        });
                }
            });

    }
    handleChange = (e) => {
        firebase
            .database()
            .ref('accounts/' + e.target.id)
            .update({'role': e.target.value})
            .then(alert('변경 완료!'))
            .catch((e) => {
                alert(e)
                console.log(e)
            });
    }
    show_tables(uid, role) {
        switch (role) {
            case 'Admin':
                return (
                    <FormSelect id={uid} onChange={this.handleChange}>
                        <option>{role}</option>
                        <option value='Student'>Student</option>
                        <option value='Guest'>Guest</option>
                    </FormSelect>
                )
            case 'Student':
                return (
                    <FormSelect id={uid} onChange={this.handleChange}>
                        <option>{role}</option>
                        <option value='Admin'>Admin</option>
                        <option value='Guest'>Guest</option>
                    </FormSelect>
                )
            case 'Guest':
                return (
                    <FormSelect id={uid} onChange={this.handleChange}>
                        <option>{role}</option>
                        <option value='Admin'>Admim</option>
                        <option value='Student'>Student</option>
                    </FormSelect>
                )
            default:
                return (
                    <FormSelect id={uid} onChange={this.handleChange}>
                        <option>{role}</option>
                        <option value='Admin'>Admim</option>
                        <option value='Student'>Student</option>
                        <option value='Guest'>Guest</option>
                    </FormSelect>
                )
        }
    }
    render() {
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
                                            <InputGroup seamless size="lg" className="ml-3">
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
                                                                            {this.show_tables(acc.uid, acc.role)}
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