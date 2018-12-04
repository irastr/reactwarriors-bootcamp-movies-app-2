import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
import LoginModal from "./Header/Login/LoginModal"
// import _ from "lodash";



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
      filters: {
        sort_by: "popularity.desc",
        primary_release_year: "2018",
        with_genres: []
      },
      page: 1,
      total_pages: "",
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

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages
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

  toggleModal = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }));
  }

  onLogOut = () => {
    this.setState({
      user: null,
      session_id: null,
      favoriteMovies: [],
      watchlistMovies: []


    })
    cookies.remove("session_id")
  }


  getFavoritesWatchlist = () => {

    this.getList("favorite", "favoriteMovies");
    this.getList("watchlist", "watchlistMovies");

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

    const { filters, page, total_pages, user, showLoginModal, session_id, favoriteMovies, watchlistMovies } = this.state;

    return (
      <AppContext.Provider value={{
        user: user,
        updateUser: this.updateUser,
        session_id: session_id,
        onLogOut: this.onLogOut,
        getFavoritesWatchlist: this.getFavoritesWatchlist,
        favoriteMovies: favoriteMovies,
        watchlistMovies: watchlistMovies,
        addToList: this.addToList,
        deleteFromList: this.deleteFromList


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
                      onChangeFilters={this.onChangeFilters}
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
                // favoriteMovies={favoriteMovies}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}