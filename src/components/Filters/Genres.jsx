import React from "react";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class Genres extends React.Component {
  render() {
    const { genresList, with_genres, resetGenres, onChange } = this.props;

    return (
      <React.Fragment>
        <div>
          <button
            type="button"
            className="btn btn-outline-dark mb-2"
            onClick={resetGenres}
          >
            Показать все жанры
          </button>
        </div>
        {genresList.map(genre => (
          <div key={genre.id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={genre.id}
              id={`genre${genre.id}`}
              onChange={onChange}
              checked={with_genres.includes(String(genre.id))}
            />
            <label className="form-check-label" htmlFor={`genre${genre.id}`}>
              {genre.name}
            </label>
          </div>
        ))}
      </React.Fragment>
    );

    // Genres.propTypes = {

    //     genresList: PropTypes.array.isRequired,
    //     with_genres: PropTypes.array.isRequired,
    //     resetGenres: PropTypes.func.isRequired,
    //     onChange: PropTypes.func.isRequired

    // }
  }
}

export default GenresHOC(Genres);
