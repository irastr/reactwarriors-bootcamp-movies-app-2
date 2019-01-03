import React from "react";
import User from "./User";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject(({ userStore, formStore }) => ({
  userStore,
  formStore
}))
@observer
class Header extends React.Component {
  render() {
    const { user, toggleModal, userStore } = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link to={"/"}>
                {" "}
                <span className="nav-home">Home</span>
              </Link>
            </li>
          </ul>
          {userStore.isAuth ? (
            <User />
          ) : (
            <button
              className="btn btn-success"
              type="button"
              onClick={this.props.formStore.toggleModal}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    );
  }
}

export default Header;
