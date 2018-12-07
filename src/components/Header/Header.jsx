import React from "react";
import User from "./User";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    render() {
        const { user, toggleModal } = this.props
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item " >

                            <Link to={"/"}> <span className="nav-home">Home</span></Link >

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


