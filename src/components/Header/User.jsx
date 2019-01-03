import React from "react";
import CallApi from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { inject, observer } from "mobx-react";

@inject(({ userStore }) => ({
  userStore
}))
@observer
class User extends React.Component {
  state = {
    isOpen: false
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // logOut = () => {
  //   const { session_id, onLogOut } = this.props;

  //   return CallApi.delete("/authentication/session", {
  //     body: {
  //       session_id
  //     }
  //   }).then(data => {
  //     console.log(data);
  //     onLogOut();
  //   });
  // };

  render() {
    const { userStore } = this.props;
    return (
      <div>
        <UncontrolledDropdown>
          <DropdownToggle nav>
            <img
              width="40"
              alt="user"
              className="rounded-circle"
              src={`https://secure.gravatar.com/avatar/${
                userStore.user.avatar.gravatar.hash
              }.jpg?s=64"`}
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={userStore.logOut}>Выход</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}

export default User;
