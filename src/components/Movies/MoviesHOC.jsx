import React from "react";
// import MoviesList from "./MoviesList";
import CallApi, { API_KEY_3 } from "../../api/api";
import _ from "lodash";
import { inject, observer } from "mobx-react";

export default Component =>
  @inject(({ moviesPageStore }) => ({
    moviesPageStore
  }))
  @observer
  class MoviesHOC extends React.Component {
    componentDidMount() {
      // this.getMovies(this.props.filters, this.props.page);
      this.props.moviesPageStore.getMovies();
      console.log(this.props.moviesPageStore.page);
    }

    componentDidUpdate(prevProps) {
      if (!_.isEqual(this.props.filters, prevProps.filters)) {
        this.props.onChangePagination({ page: 1 });
        this.getMovies(this.props.filters, 1);
      }

      if (this.props.page !== prevProps.page) {
        this.getMovies(this.props.filters, this.props.page);
      }
    }

    render() {
      // const { movies, preloader } = this.state;

      const { user, session_id, toggleModal } = this.props;
      return (
        <Component
          movies={this.props.moviesPageStore.movies}
          // user={user}
          // session_id={session_id}
          // toggleModal={toggleModal}
          // preloader={preloader}
        />
      );
    }
    // return MoviesHOC
  };
