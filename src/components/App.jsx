import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import LoginModal from "./Header/Login/LoginModal";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import _ from "lodash";
import { inject, observer } from "mobx-react";
import { BrowserRouter, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as bookmarkRegular,
  faHeart as heartRegular
} from "@fortawesome/free-regular-svg-icons";
library.add(faBookmark, faHeart, bookmarkRegular, heartRegular);

export const AppContext = React.createContext();

@inject(({ userStore }) => ({
  userStore
}))
@observer
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMovies: [],
      watchlistMovies: []
    };
  }

  componentDidMount() {
    const {
      userStore: { getUserFromCookies }
    } = this.props;
    getUserFromCookies();
  }

  getFavoritesWatchlist = () => {
    console.log("getFavoritesWatchlist", "call");
    if (this.state.user && this.state.session_id) {
      this.getList("favorite", "favoriteMovies");
      this.getList("watchlist", "watchlistMovies");
    }
  };

  getList = (type, typeArray) => {
    const { user, session_id } = this.state;
    CallApi.get(`/account/${user.id}/${type}/movies`, {
      params: {
        session_id
      }
    }).then(data => {
      this.setState({
        [typeArray]: [...data.results]
      });
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.user === null &&
      !_.isEqual(prevState.user, this.state.user)
    ) {
      this.getFavoritesWatchlist();
    }
  }

  addToList = (item, type) => {
    this.setState({
      [type]: [...this.state[type], item]
    });
  };

  deleteFromList = (item, type) => {
    this.setState({
      [type]: this.state[type].filter(object => {
        return object.id !== item.id;
      })
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <LoginModal />
          <Header />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
