import { observable, action, computed, configure } from "mobx";
import CallApi from "../api/api";
import Cookies from "universal-cookie";
const cookies = new Cookies();

configure({ enforceActions: "always" });

class MoviesPageStore {
  @observable movies = [];

  @observable filters = {
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
  };

  @observable page = 1;

  @observable total_pages = "";

  @action
  onChangeFilters = event => {
    // const value = event.target.value;
    // const name = event.target.name;
    // this.setState(prevState => ({
    //   filters: {
    //     ...prevState.filters,
    //     [name]: value
    //   }
    // }));
    this.filters[event.target.name] = event.target.value;
  };
}
export const moviesPageStore = new MoviesPageStore();
