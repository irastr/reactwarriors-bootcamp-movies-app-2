

import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "./MoviesHOC"

// import Loader from 'react-loader-spinner'
import Load from "../Loader/Load"

import PropTypes from "prop-types"
import AppContextHOC from "../HOC/AppContextHOC"


const MoviesList = ({ movies, user, session_id, toggleModal, preloader }) => (

  <div className="row" >
    {preloader ? (
      <Load />
    ) :
      movies.length > 0 ? (
        (
          movies.map(movie => {
            return (
              <div key={movie.id} className="col-6 mb-4">
                <MovieItem item={movie} user={user} session_id={session_id} toggleModal={toggleModal} />
              </div>
            );
          })
        )
      ) : (<h4 className="movies-empty"> По Вашему запросу не найдено фильмов</h4>)


    }

  </div>


)
MoviesList.defaultProps = {
  movies: []
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
}

export default AppContextHOC(MoviesHOC(MoviesList));

