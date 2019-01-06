import React from "react";
import MovieItem from "./MovieItem";
import Load from "../Loader/Load";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class MoviesList extends React.Component {
  componentDidMount() {
    const {
      moviesPageStore: { getMovies }
    } = this.props;
    getMovies();
  }
  render() {
    const {
      moviesPageStore: { preloader, movies }
    } = this.props;
    return (
      <div className="row">
        {preloader ? (
          <Load />
        ) : movies.length > 0 ? (
          movies.map(movie => {
            return (
              <div key={movie.id} className="col-6 mb-4">
                <MovieItem item={movie} />
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

export default MoviesList;
