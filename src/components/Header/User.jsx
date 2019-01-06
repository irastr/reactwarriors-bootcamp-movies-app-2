import React from "react";
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

  render() {
    const {
      userStore: { user, logOut }
    } = this.props;
    return (
      <div>
        <UncontrolledDropdown>
          <DropdownToggle nav>
            <img
              width="40"
              alt="user"
              className="rounded-circle"
              src={`https://secure.gravatar.com/avatar/${
                user.avatar.gravatar.hash
              }.jpg?s=64"`}
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={logOut}>Выход</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}

export default User;
