import React from "react";
import CallApi from "../../api/api";
import PropTypes from "prop-types";


export default (Component, type) => class AddMovieHOC extends React.Component {
    // displayName: "AddMovieHOC";

    static propTypes = {
        // session_id: PropTypes.oneOfType([
        //     PropTypes.string,
        //     PropTypes.instanceOf(null)
        // ]),
        toggleModal: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        // user: PropTypes.oneOfType([
        //     PropTypes.string,
        //     PropTypes.instanceOf(null)
        // ]),
    }


    constructor(props) {
        super(props);
        this.state = {
            // isAdd: this.props[type].some((object) => {
            //     return object.id === this.props.item.id
            // }),
            isAdd: false,
            access: this.props.access
        };
    }




    componentDidUpdate(prevProps) {

        const isAdd = this.props[type].some((object) => {
            return object.id === this.props.item.id
        })



        if (prevProps[type] !== this.props[type] || this.props.access) {

            if (isAdd !== this.state.isAdd) {
                this.setState({
                    isAdd,
                    access: false
                })
            }
        }

    }



    handleIconClick = (name) => () => {

        const { session_id, toggleModal, item, user, getFavoritesWatchlist, addToList, deleteFromList } = this.props;

        if (session_id) {
            this.setState(
                prevState => ({
                    isAdd: !prevState.isAdd
                }),

                () => {

                    if (this.state.isAdd) {
                        addToList(item, type)
                    } else {
                        deleteFromList(item, type)
                    }

                    CallApi.post(`/account/${user.id}/${name}`, {
                        params: {
                            session_id,

                        },
                        body: {
                            media_type: "movie",
                            media_id: item.id,
                            [name]: this.state.isAdd
                        }
                    })

                        .then(data => {
                            console.log(data.status_message);
                            // getFavoritesWatchlist()
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






