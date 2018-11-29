
import React from "react";
import { AppContext } from "../App"
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";

import {

    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class User extends React.Component {

    state = {
        isOpen: false
    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logOut = () => {
        const { session_id, onLogOut } = this.props;

        fetchApi(
            `${API_URL}/authentication/session?api_key=${API_KEY_3}`
            // `${API_URL}/account/{${user.id}}/${name}?api_key=${API_KEY_3}&session_id=${session_id}`
            , {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(
                    {
                        "session_id": session_id
                    }
                )
            }

        ).then(data => {
            console.log(data)

            onLogOut()
        })

    }


    render() {
        const { user } = this.props;
        return (
            <div>

                <UncontrolledDropdown >

                    <DropdownToggle nav >
                        <img
                            width="40"
                            alt="user"
                            className="rounded-circle"
                            src={`https://secure.gravatar.com/avatar/${
                                user.avatar.gravatar.hash
                                }.jpg?s=64"`}



                        />
                    </DropdownToggle>

                    <DropdownMenu right >

                        <DropdownItem onClick={this.logOut}>
                            Выход
                        </DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>

            </div>
        );
    }
}



const UserContainer = () => {
    return (
        <AppContext.Consumer>
            {(context) => {
                return <User user={context.user} session_id={context.session_id} onLogOut={context.onLogOut} />
            }}
        </AppContext.Consumer>
    );
}

UserContainer.displayName = "UserContainer"

export default UserContainer;