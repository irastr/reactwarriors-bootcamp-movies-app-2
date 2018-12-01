

import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "./MoviesHOC"

import Loader from 'react-loader-spinner'

import PropTypes from "prop-types"


const MoviesList = ({ movies, user, session_id, toggleModal, preloader }) => (
  // <React.Fragment>
  //   {preloader ? (
  //     <Loader
  //       type="Puff"
  //       color="#00BFFF"
  //       height="100"
  //       width="100"
  //     />) :
  //     (<div className="row">



  //       {movies.map(movie => {
  //         return (
  //           <div key={movie.id} className="col-6 mb-4">
  //             <MovieItem item={movie} user={user} session_id={session_id} toggleModal={toggleModal} />
  //           </div>
  //         );
  //       })}


  //     </div>)
  //   }
  // </React.Fragment>


  <div className="row">
    {preloader ? (
      <Loader
        type="Puff"
        color="#00BFFF"
        height="100"
        width="100"
      />
    ) :

      (
        movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} user={user} session_id={session_id} toggleModal={toggleModal} />
            </div>
          );
        })
      )
    }

  </div>


  // <div className="row">

  // {preloader ?
  //   (<Loader
  //     type="Puff"
  //     color="#00BFFF"
  //     height="100"
  //     width="100"
  //   />) :

  //   ({
  //     movies.map(movie => {
  //       return (
  //         <div key={movie.id} className="col-6 mb-4">
  //           <MovieItem item={movie} user={user} session_id={session_id} toggleModal={toggleModal} />
  //         </div>
  //       );
  //     })
  //   })

  // }

  // </div>


)

MoviesList.defaultProps = {
  movies: []
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
}

export default MoviesHOC(MoviesList);

