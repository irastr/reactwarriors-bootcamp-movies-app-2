import React from "react";
import User from "./User";

export default class Header extends React.Component {
    render() {
        const { user, toggleModal } = this.props
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link">Home</a>
                        </li>
                    </ul>
                    {user ? <User /> :

                        (<button
                            className="btn btn-success"
                            type="button"
                            onClick={toggleModal}
                        >
                            Login
                        </button>)


                    }


                </div>
            </nav>
        );
    }
}


