import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import { inject, observer } from "mobx-react";

export const AppContext = React.createContext();

@inject(({ moviesPageStore }) => ({
  moviesPageStore
}))
@observer
class MoviesPage extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2018",
        with_genres: []
      },
      page: 1,
      total_pages: ""
    };
  }

  //   onChangeFilters = event => {
  //     const value = event.target.value;
  //     const name = event.target.name;
  //     this.setState(prevState => ({
  //       filters: {
  //         ...prevState.filters,
  //         [name]: value
  //       }
  //     }));
  //   };

  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages
    });
  };

  render() {
    const { filters, page, total_pages, user, session_id } = this.state;
    const { moviesPageStore } = this.props;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card w-100">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters}
                  // onChangeFilters={moviesPageStore.onChangeFilters}
                  onChangePagination={this.onChangePagination}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePagination={this.onChangePagination}
              session_id={session_id}
              user={user}
              toggleModal={this.toggleModal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesPage;
