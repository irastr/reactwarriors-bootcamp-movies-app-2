import React from 'react';
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Favorite extends React.Component {

    state = {
        favorite: false
    }


    handleIconClick = (name) => () => {
        const { session_id, toggleModal, item, user } = this.props

        if (session_id) {

            this.setState(prevState => ({
                [name]: !prevState[name]
            }), () => {

                fetchApi(
                    `${API_URL}/account/{${user.id}}/${name}?api_key=${API_KEY_3}&session_id=${session_id}`
                    , {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-type": "application/json;charset=utf-8"
                        },
                        body: JSON.stringify(
                            {
                                "media_type": "movie",
                                "media_id": item.id,
                                [name]: this.state[name]
                            }
                        )
                    }

                ).then(data => {
                    console.log(data.status_message)
                })

            });


        } else {
            toggleModal()
        }

    }


    render() {

        const styleFavorite = this.state.favorite ? "fas" : "far";

        return (
            <a className="heart-icon"
                // onClick={this.handleIconClick.bind(null, "favorite")}
                onClick={this.handleIconClick("favorite")}
            >
                <FontAwesomeIcon icon={[styleFavorite, "heart"]} />
            </a>
        );
    }

}

export default Favorite;