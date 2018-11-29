import React from "react";
import Login from "./Login/Login";
import User from "./User";

export default class Header extends React.Component {
    render() {
        const { user, updateSessionId, showModal, toggleModal } = this.props
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link">Home</a>
                        </li>
                    </ul>
                    {user ? <User /> : null


                    }
                    {showModal ? (
                        <Login
                            // updateUser={updateUser}
                            updateSessionId={updateSessionId}
                            showModal={showModal}
                            toggleModal={toggleModal}


                        />
                    ) : null}
                    {/* <Login updateUser={this.props.updateUser} /> */}
                    {/* {user ? (
                        // <User user={user} />
                        <User />
                    ) : (
                            <Login
                                // updateUser={updateUser}
                                updateSessionId={updateSessionId}
                                showModal={showModal}
                                toggleModal={toggleModal}


                            />
                        )} */}
                </div>
            </nav>
        );
    }
}


