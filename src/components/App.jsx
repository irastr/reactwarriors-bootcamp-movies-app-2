import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
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
const cookies = new Cookies();

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

  onLogOut = () => {
    CallApi.delete("/authentication/session", {
      params: { session_id: this.state.session_id }
    }).then(() => {
      this.setState({
        user: null,
        session_id: null,
        favoriteMovies: [],
        watchlistMovies: []
      });

      cookies.remove("session_id", {
        path: "/"
      });
    });
  };

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
    const {
      user,
      showLoginModal,
      session_id,
      favoriteMovies,
      watchlistMovies
    } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            updateUser: this.updateUser,
            session_id: session_id,
            onLogOut: this.onLogOut,
            getFavoritesWatchlist: this.getFavoritesWatchlist,
            favoriteMovies: favoriteMovies,
            watchlistMovies: watchlistMovies,
            addToList: this.addToList,
            deleteFromList: this.deleteFromList,
            toggleModal: this.toggleModal
          }}
        >
          <div>
            <LoginModal
              showLoginModal={showLoginModal}
              toggle={this.toggleModal}
              updateSessionId={this.updateSessionId}
              toggleModal={this.toggleModal}
            />
            <Header user={user} toggleModal={this.toggleModal} />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
export default App;
