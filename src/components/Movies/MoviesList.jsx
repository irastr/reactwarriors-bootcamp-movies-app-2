import React from "react";
import MovieItem from "./MovieItem";
import MoviesHOC from "./MoviesHOC";
import Load from "../Loader/Load";
import AppContextHOC from "../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class MoviesList extends React.Component {
  render() {
    const { movies, user, session_id, toggleModal } = this.props;
    const {
      moviesPageStore: { preloader }
    } = this.props;
    return (
      <div className="row">
        {preloader ? (
          <Load />
        ) : movies.length > 0 ? (
          movies.map(movie => {
            return (
              <div key={movie.id} className="col-6 mb-4">
                <MovieItem
                  item={movie}
                  user={user}
                  session_id={session_id}
                  toggleModal={toggleModal}
                />
              </div>
            );
          })
        ) : (
          <h4 className="movies-empty">
            {" "}
            По Вашему запросу не найдено фильмов
          </h4>
        )}
      </div>
    );
  }
}

export default AppContextHOC(MoviesHOC(MoviesList));
