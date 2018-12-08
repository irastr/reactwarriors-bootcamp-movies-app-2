import React from 'react';
import CallApi from '../../../api/api';
import { Link } from "react-router-dom";
import FavoriteMoviePage from "./Icons/FavoriteMoviePage";
import WatchListMoviePage from "./Icons/WatchListMoviePage";
// import Favorite from "../../Movies/Favorite";
import AppContextHOC from "../../HOC/AppContextHOC"
import Tabs from "./Tabs/Tabs"

import Loader from 'react-loader-spinner'

class MoviePage extends React.Component {
    state = {
        item: {},
        preloader: false
    }

    componentDidMount() {

        this.setState({
            preloader: true
        });

        CallApi.get(`/movie/${this.props.match.params.id}`, {
            params: {
                language: "ru-RU"
            }
        })
            .then(data => {
                this.setState({
                    item: data,
                    preloader: false
                });

            })

    }

    render() {

        const { session_id, toggleModal, user } = this.props
        const { item, preloader } = this.state
        console.log(item)
        const path = (item.poster_path) ? (`https://image.tmdb.org/t/p/w500${
            item.poster_path} `) : ("https://www.baltimoresportsandlife.com/wp-content/uploads/2016/07/Movies.jpg")
        return (
            <React.Fragment>

                <div className="moviepage-background" style={{
                    backgroundImage: "url(" + `https://image.tmdb.org/t/p/w500${
                        item.backdrop_path} ` + ")", backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'

                }}>
                    <div className="container p-3">
                        {/* {preloader ? (
                    <div className="loader">
                        <Loader
                            type="Puff"
                            color="#047AFB"
                            height="100"
                            width="100"
                        />
                    </div>

                ) : ( */}
                        <React.Fragment>

                            <div className="row mt-5 ">
                                <div className="col-md-4 col-9 ">
                                    <div className="card" style={{ "width": "100 %" }}>
                                        <img className="card-img-top" src={path} alt="Card image cap" />
                                    </div>

                                </div>

                                <div className="col-md-8 col-12 " style={{ "color": "#FDFDFD", "fontWeight": "bold" }}>
                                    <h3 className="mb-3">{item.title}</h3>
                                    <div className="d-flex ">
                                        <FavoriteMoviePage
                                            session_id={session_id}
                                            toggleModal={toggleModal}
                                            item={item}
                                            user={user}
                                            access={true}
                                        />
                                        <WatchListMoviePage
                                            session_id={session_id}
                                            toggleModal={toggleModal}
                                            item={item}
                                            user={user}
                                            access={true}
                                        />
                                    </div>


                                    <h4 className="mt-4" >Описание фильма:</h4>
                                    <p >{item.overview}</p>

                                </div>
                            </div>


                        </React.Fragment>
                        {/*  )} */}

                    </div>

                </div>
                <div className="container ">
                    <Tabs id={this.props.match.params.id} item={this.state.item} location={this.props.location.pathname} />
                </div>
            </React.Fragment>
        );





    }
}

export default AppContextHOC(MoviePage);