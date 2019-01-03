import { observable, action, computed, configure } from "mobx";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

configure({ enforceActions: "always" });
//with it we can mutate @observable only in @actions

class UserStore {
  @observable user = {};

  @observable session_id = null;

  @computed get isAuth() {
    return Boolean(Object.keys(this.user).length);
  }

  // @action
  // updateSessionId = session_id => {
  //   cookies.set("session_id", session_id, {
  //     path: "/",
  //     maxAge: 2592000
  //   });
  //   this.session_id = session_id;
  // };

  // @action
  // updateUser = user => {
  //   this.user = user;
  // };

  @action
  updateAuth = (user, session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.session_id = session_id;
    this.user = user;
  };

  @action
  getUser = () => {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      }).then(user => {
        this.updateAuth(user, session_id);
        // this.updateSessionId(session_id);
        this.updateAuth(user, session_id);
        // this.getFavoritesWatchlist();
      });
    }
  };

  @action
  clearUser = () => {
    this.user = {};
    this.session_id = null;
  };

  @action
  logOut = () => {
    return CallApi.delete("/authentication/session", {
      body: {
        session_id: this.session_id
      }
    }).then(() => {
      this.clearUser();

      // how to change this here ?
      // favoriteMovies: [],
      // watchlistMovies: []
    });
  };
}
export const userStore = new UserStore();
