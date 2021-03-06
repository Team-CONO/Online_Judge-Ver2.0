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
    InputGroupText,
    Button
} from "shards-react";
import firebase, {fire} from '../Firebase'

class Admin_view extends Component {
    constructor(props) {
        super(props)
        fire()
        this.state = ({cp_accounts: [], accounts: [], isAdmin: false})
    }

    componentDidMount() {
        this._ismounted = true;
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
                    firebase
                        .database()
                        .ref('accounts/' + user.uid)
                        .child('role')
                        .once('value')
                        .then(snapshot => {
                            if (snapshot.val() !== 'Admin') {
                                alert('접근 권한이 없습니다!')
                                this
                                    .props
                                    .history
                                    .push('/Main')
                            } else {
                                this.setState({isAdmin: true})
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
                                            }, () => {
                                                this.setState({cp_accounts: this.state.accounts})
                                            })
                                        })
                                    })
                            }
                        })
                }
            });
    }

    handleChange = (e) => {
        firebase
            .database()
            .ref('accounts/' + e.target.id)
            .update({'role': e.target.value})
            .then(alert('변경 완료!'), window.location.reload())
            .catch((e) => {
                alert(e)
                console.log(e)
            });
    }

    show_select(uid, role) {
        switch (role) {
            case 'E':
                return (
                    <FormSelect id={uid} onChange={this.handleChange}>
                        <option>{role}</option>
                        <option value='M'>M</option>
                        <option value='H'>H</option>
                        <option value='Other'>Other</option>
                    </FormSelect>
                )
            case 'M':
                return (
                    <FormSelect id={uid} onChange={this.handleChange}>
                        <option>{role}</option>
                        <option value='E'>E</option>
                        <option value='H'>H</option>
                        <option value='Other'>Other</option>
                    </FormSelect>
                )
            case 'H':
                return (
                    <FormSelect id={uid} onChange={this.handleChange}>
                        <option>{role}</option>
                        <option value='E'>E</option>
                        <option value='M'>M</option>
                        <option value='Other'>Other</option>
                    </FormSelect>
                )
            case 'Other':
                return (
                    <FormSelect id={uid} onChange={this.handleChange}>
                        <option>{role}</option>
                        <option value='E'>E</option>
                        <option value='M'>M</option>
                        <option value='H'>H</option>
                    </FormSelect>
                )
            default:
                return (
                    <FormSelect id={uid} onChange={this.handleChange}>
                        <option>{role}</option>
                        <option value='E'>E</option>
                        <option value='M'>M</option>
                        <option value='H'>H</option>
                        <option value='Other'>Other</option>
                    </FormSelect>
                )
        }
    }

    handelSearch = (e) => {
        e.preventDefault();

        let target_name = e.target.value
        target_name = target_name.replace(/\\/g, "\\\\")
        this.setState({
            cp_accounts: this
                .state
                .accounts
                .filter(element => element.name.toLowerCase().match(target_name))
        })
    }

    delete = (e) => {
        // console.log(e.target.id);
        const target_uid = e.target.id;
        firebase
            .auth()
            .currentUser
            .getIdToken(true)
            .then(function (token) {
                const delete_user = fetch(
                    "https://asia-northeast1-mimi-chan.cloudfunctions.net/auth/admin",
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': token
                        },
                        body: target_uid
                    }
                )
                delete_user
                    .then(res => {
                        firebase
                            .database()
                            .ref('accounts/' + target_uid)
                            .remove()
                            .then(alert('해당 회원이 삭제 되었습니다'), window.location.reload())
                            .catch((e) => {
                                alert(e)
                                console.log(e);
                            })
                        })
                    .catch((e) => {
                        alert(e)
                        console.log(e);
                    })
                })
            .catch(e => {
                alert(e)
                console.log(e);
            })
        }

    render() {
        return (
            <div>
                {
                    this.state.isAdmin
                        ? <Row>
                                <Col>
                                    <Card className="my-3 mx-3">
                                        <CardHeader className="border-bottom">
                                            <h4 className="m-0">회원 관리</h4>
                                        </CardHeader>
                                        <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                                            <InputGroup seamless size="lg" className="ml-3">
                                                <InputGroupAddon type="prepend">
                                                    <InputGroupText>
                                                        <i className="material-icons">search</i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <FormInput
                                                    onChange={this.handelSearch}
                                                    className="navbar-search"
                                                    placeholder="회원명 조회"/>
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
                                                            회원명
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
                                                            .cp_accounts
                                                            .map((acc, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            {acc.name}
                                                                        </td>
                                                                        <td>
                                                                            {this.show_select(acc.uid, acc.role)}
                                                                        </td>
                                                                        <td>
                                                                            <Button id={acc.uid} squared theme="danger" onClick={this.delete}>
                                                                                삭제
                                                                            </Button>
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