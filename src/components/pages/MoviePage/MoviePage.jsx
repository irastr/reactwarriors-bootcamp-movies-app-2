import React from "react";
import CallApi from "../../../api/api";
import { Route, Switch } from "react-router-dom";
import AppContextHOC from "../../HOC/AppContextHOC";
import Tabs from "./Tabs/Tabs";
// import Loader from 'react-loader-spinner'
import Load from "../../Loader/Load";
import MovieDetail from "./Tabs/MovieDetail";
import MovieVideos from "./Tabs/MovieVideos";
import MovieCredits from "./Tabs/MovieCredits";
import MoviePageInfo from "./MoviePageInfo";

class MoviePage extends React.Component {
  state = {
    item: {},
    preloader: false
  };

  componentDidMount() {
    this.setState({
      preloader: true
    });

    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: {
        language: "ru-RU"
      }
    }).then(data => {
      this.setState({
        item: data,
        preloader: false
      });
    });
  }

  render() {
    console.log("MoviePage render");

    const { user } = this.props;
    const { item, preloader } = this.state;

    return (
      <React.Fragment>
        {preloader ? (
          <div className="mt-4">
            <Load />
          </div>
        ) : (
          <React.Fragment>
            <MoviePageInfo item={item} user={user} />

            <div className="container ">
              <Tabs id={this.props.match.params.id} />

              <Switch>
                <Route
                  path="/movie/:id/movie-detail"
                  render={props => <MovieDetail {...props} item={item} />}
                />
                <Route
                  path="/movie/:id/videos"
                  render={props => <MovieVideos {...props} />}
                />
                <Route
                  path="/movie/:id/movie-credits"
                  render={props => <MovieCredits {...props} />}
                />
              </Switch>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default AppContextHOC(MoviePage);
