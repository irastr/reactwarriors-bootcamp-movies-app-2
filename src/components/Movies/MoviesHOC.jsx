import React from "react";
// import MoviesList from "./MoviesList";
import CallApi, { API_KEY_3 } from "../../api/api";
import _ from "lodash";


export default (Component) => class MoviesHOC extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            preloader: false
        };
    }

    getMovies = (filters, page) => {

        this.setState({
            preloader: true
        });

        const { sort_by, primary_release_year, with_genres } = filters;
        const queryStringParams = {
            api_key: API_KEY_3,
            language: "ru-RU",
            sort_by: sort_by,
            page: page,
            primary_release_year: primary_release_year
        };

        if (with_genres.length > 0)
            queryStringParams.with_genres = with_genres.join(",");


        // const link = `${API_URL}/discover/movie?${queryString.stringify(
        //     queryStringParams
        // )}`;
        // fetch(link)

        CallApi.get("/discover/movie", {
            params: queryStringParams
        })

            .then(data => {
                this.props.onChangePagination({
                    page: data.page,
                    total_pages: data.total_pages
                });
                this.setState({
                    movies: data.results,
                    preloader: false
                });



            });
    };

    componentDidMount() {
        this.setState({
            preloader: true
        });
        this.getMovies(this.props.filters, this.props.page);
    }



    componentDidUpdate(prevProps) {
        if (
            !_.isEqual(this.props.filters, prevProps.filters)

        ) {
            this.props.onChangePagination({ page: 1 });
            this.getMovies(this.props.filters, 1);
            this.props.getFavoritesWatchlist()

        }

        if (this.props.page !== prevProps.page) {
            this.getMovies(this.props.filters, this.props.page);
            this.props.getFavoritesWatchlist()
        }
    }

    render() {

        const { movies, preloader } = this.state;

        const { user, session_id, toggleModal } = this.props
        return (

            <Component movies={movies} user={user} session_id={session_id} toggleModal={toggleModal} preloader={preloader} />

        );
    }
}