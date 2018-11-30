import React from "react";
import CallApi from "../../api/api";
import PropTypes from "prop-types";


export default (Component, type) => class AddMovieHOC extends React.Component {
    // displayName: "AddMovieHOC";

    // static propTypes = {
    //     session_id: PropTypes.oneOfType([
    //         PropTypes.string,
    //         PropTypes.instanceOf(null)
    //     ]),
    //     toggleModal: PropTypes.func.isRequired,
    //     item: PropTypes.object.isRequired,
    //     user: PropTypes.oneOfType([
    //         PropTypes.string,
    //         PropTypes.instanceOf(null)
    //     ]),
    // }


    state = {
        isAdd: false
    };


    handleIconClick = () => {

        const { session_id, toggleModal, item, user } = this.props;

        if (session_id) {
            this.setState(
                prevState => ({
                    isAdd: !prevState.isAdd
                }),
                () => {
                    CallApi.post(`/account/${user.id}/${type}`, {
                        params: {
                            session_id,

                        },
                        body: {
                            media_type: "movie",
                            media_id: item.id,
                            [type]: this.state.isAdd
                        }
                    })
                        // fetchApi(
                        //     `${API_URL}/account/${
                        //     user.id
                        //     }/${type}?api_key=${API_KEY_3}&session_id=${session_id}`,
                        //     {
                        //         method: "POST",
                        //         mode: "cors",
                        //         headers: {
                        //             "Content-type": "application/json;charset=utf-8"
                        //         },
                        //         body: JSON.stringify({
                        //             media_type: "movie",
                        //             media_id: item.id,
                        //             [type]: this.state.isAdd
                        //         })
                        //     }
                        // )

                        .then(data => {
                            console.log(data.status_message);
                        });
                }
            );
        } else {
            toggleModal();
        }
    };

    render() {
        return (
            <Component
                {...this.props}
                onClick={this.handleIconClick}
                isAdd={this.state.isAdd}

            />
        );
    }
};






