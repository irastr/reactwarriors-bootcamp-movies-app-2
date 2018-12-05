import React from 'react';
import CallApi from '../../../api/api';
import { Link } from "react-router-dom";
import Favorite from "../../Movies/Favorite";
import WatchList from "../../Movies/WatchList"
import AppContextHOC from "../../HOC/AppContextHOC"



class MoviePage extends React.Component {
    state = {
        item: {}
    }

    componentDidMount() {
        // console.log(this.props.match.params.id)
        // this.props.getFavoritesWatchlist()

        CallApi.get(`/movie/${this.props.match.params.id}`, {
            params: {
                language: "ru-RU"
            }
        })
            .then(data => {
                console.log(data)
                this.setState({
                    item: { ...data }
                });

            })

    }

    render() {
        // console.log(this.props)
        const { session_id, toggleModal, user } = this.props
        const { item } = this.state
        const path = (item.poster_path) ? (`https://image.tmdb.org/t/p/w500${
            item.poster_path} `) : ("https://www.baltimoresportsandlife.com/wp-content/uploads/2016/07/Movies.jpg")
        return (
            <div className="container mt-3">
                <Link to={"/"}>Вернуться назад</Link >
                <div className="row mt-5 ">

                    <div className="col-4">
                        <div class="card" style={{ "width": "18rem" }}>
                            <img class="card-img-top" src={path} alt="Card image cap" />
                            <div className="card-body">
                                <div className="d-flex justify-content-center">
                                    <Favorite
                                        session_id={session_id}
                                        toggleModal={toggleModal}
                                        item={item}
                                        user={user}
                                        location={this.props.location.pathname}
                                        access={true}
                                    />
                                    <WatchList
                                        session_id={session_id}
                                        toggleModal={toggleModal}
                                        item={item}
                                        user={user}
                                        location={this.props.location.pathname}
                                        access={true}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-8">
                        <h3>{item.original_title}</h3>
                        <div className="d-flex">
                        </div>
                        <p>{item.tagline}</p>
                        <h4>Описание фильма:</h4>
                        <p>{item.overview}</p>

                    </div>
                </div>

            </div>);




    }
}

export default AppContextHOC(MoviePage);