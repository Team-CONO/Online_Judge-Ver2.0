import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import firebase, { fire } from '../../../../Firebase';

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      username:''
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }
  async componentDidMount(){
    await fire()
    await firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        this.setState({
          username:user.email
        });
      }
    });
  }
  componentWillUnmount(){
     firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error)
    });
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  logout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error)
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/user.png")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{this.state.username}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} open={this.state.visible}>
          <DropdownItem tag={Link} to="/Main">
            <i className="material-icons">&#xE7FD;</i> 프로필
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/" onClick={this.logout} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> 로그아웃
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
