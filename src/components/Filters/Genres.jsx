import React from "react";
import { inject, observer } from "mobx-react";

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class Genres extends React.Component {
  componentDidMount() {
    const { moviesPageStore } = this.props;
    moviesPageStore.getGenresList();
  }
  render() {
    const { moviesPageStore } = this.props;

    return (
      <React.Fragment>
        <div>
          <button
            type="button"
            className="btn btn-outline-dark mb-2"
            onClick={moviesPageStore.resetGenres}
          >
            Показать все жанры
          </button>
        </div>
        {moviesPageStore.genresList.map(genre => (
          <div key={genre.id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={genre.id}
              id={`genre${genre.id}`}
              onChange={moviesPageStore.onChangeGenres}
              checked={moviesPageStore.filters.with_genres.includes(
                String(genre.id)
              )}
            />
            <label className="form-check-label" htmlFor={`genre${genre.id}`}>
              {genre.name}
            </label>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Genres;
