
import React from "react";
import CallApi from "../../api/api";
import AppContextHOC from "../HOC/AppContextHOC"

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

        return CallApi.delete("/authentication/session", {
            body: {
                "session_id": session_id
            }
        })
            // fetchApi(
            //     `${API_URL}/authentication/session?api_key=${API_KEY_3}`

            //     , {
            //         method: "DELETE",
            //         mode: "cors",
            //         headers: {
            //             "Content-type": "application/json;charset=utf-8"
            //         },
            //         body: JSON.stringify(
            //             {
            //                 "session_id": session_id
            //             }
            //         )
            //     }


            .then(data => {
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



export default AppContextHOC(User);