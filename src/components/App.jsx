import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import LoginModal from "./Header/Login/LoginModal"
import MoviesPage from './pages/MoviesPage/MoviesPage'
import MoviePage from './pages/MoviePage/MoviePage'
// import _ from "lodash";

import { BrowserRouter, Route } from 'react-router-dom'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as bookmarkRegular,
  faHeart as heartRegular
} from "@fortawesome/free-regular-svg-icons";

library.add(faBookmark, faHeart, bookmarkRegular, heartRegular);


const cookies = new Cookies();

export const AppContext = React.createContext()



export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: null,
      showLoginModal: false,
      favoriteMovies: [],
      watchlistMovies: []
    };
  }



  updateUser = (user) => {
    this.setState({
      user,
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });

  };


  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      })
        .then(user => {
          this.updateUser(user);
          this.updateSessionId(session_id)
          this.getFavoritesWatchlist()
        });
    }
  }

  // componentDidUpdate() {

  // }

  toggleModal = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }));
  }

  onLogOut = () => {
    cookies.remove("session_id", {
      path: "/"
    })
    CallApi.delete("/authentication/session", {
      params: { session_id: this.state.session_id }
    })
    this.setState({
      user: null,
      session_id: null,
      favoriteMovies: [],
      watchlistMovies: []
    })

  }


  getFavoritesWatchlist = () => {
    if (this.state.user) {
      this.getList("favorite", "favoriteMovies");
      this.getList("watchlist", "watchlistMovies");
    }
  }

  getList = (type, typeArray) => {
    const { user, session_id } = this.state
    CallApi.get(`/account/${user.id}/${type}/movies`, {
      params: {
        session_id
      }
    })
      .then(data => {
        this.setState({
          [typeArray]: [...data.results]
        });
      });
  }


  // ComponentDidUpdate(prevProps, prevState) {
  //   if (prevState.user === null && !_.isEqual(prevState.user, this.state.user)) {
  //     console.log("PrevStateUser", prevState.user);
  //     this.getFavoritesWatchlist()
  //   }
  //   if (!_.isEqual(prevState.filters, this.state.filters)) {
  //     this.getFavoritesWatchlist()
  //   }
  // }

  addToList = (item, type) => {

    this.setState({
      [type]: [...this.state[type], item]

    });
    console.log("addToList")
  }

  deleteFromList = (item, type) => {

    this.setState({
      [type]: this.state[type].filter((object) => {
        return object.id !== item.id
      })
    });
  }



  render() {

    const { user, showLoginModal, session_id, favoriteMovies, watchlistMovies } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider value={{
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


        }}>
          <div>
            <LoginModal
              showLoginModal={showLoginModal}
              toggle={this.toggleModal}
              updateSessionId={this.updateSessionId}
              toggleModal={this.toggleModal}
            />

            <Header
              user={user}
              toggleModal={this.toggleModal}
            />


            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id"
              component={MoviePage}

            />

          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}