import {
  observable,
  action,
  computed,
  configure,
  reaction,
  values
} from "mobx";
import CallApi, { API_KEY_3 } from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

configure({ enforceActions: "always" });
// initial Filters!

class MoviesPageStore {
  constructor() {
    reaction(
      () => this.page,
      () => {
        this.getMovies();
      }
    );
    //сслыка на обьект не меняется - реакция не происходит. если обьект простой - objectValues/values
    reaction(
      () => values(this.filters),
      () => {
        // moviesPageStore.getMovies(1);
        this.onChangePagination(1);
        this.getMovies();
      }
    );

    //реакции зависят от стора - в конструктор класса
  }
  @observable movies = [];

  @observable preloader = false;

  @observable filters = {
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
  };

  @observable page = 1;

  @observable total_pages = "";

  @observable genresList = [];

  @action
  @action
  onChangeFilters = event => {
    this.filters[event.target.name] = event.target.value;
  };

  @action
  onChangeGenres = event => {
    this.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [...this.filters.with_genres, event.target.value]
          : this.filters.with_genres.filter(
              genre => genre !== event.target.value
            )
      }
    });
  };

  @action
  resetGenres = () => {
    this.onChangeFilters({
      target: {
        name: "with_genres",
        value: []
      }
    });
  };

  @action
  getGenresList = () => {
    CallApi.get("/genre/movie/list", {
      params: {
        language: "ru - RU"
      }
    }).then(data => {
      this.updateGenresList(data);
    });
  };

  @action
  updateGenresList = data => {
    this.genresList = data.genres;
  };

  @action
  onChangePagination = ({ page, total_pages = this.total_pages }) => {
    this.page = page;
    this.total_pages = total_pages;
  };

  @action
  nextPage = () => {
    this.onChangePagination({
      page: this.page + 1,
      total_pages: this.total_pages
    });
  };

  //should we pass page to prev page as it was before ?
  @action
  prevPage = () => {
    this.onChangePagination({
      page: this.page - 1,
      total_pages: this.total_pages
    });
  };

  @action
  getMovies = (filters = this.filters, page = this.page) => {
    this.preloader = true;
    const { sort_by, primary_release_year, with_genres } = this.filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by: sort_by,
      page: this.page,
      primary_release_year: primary_release_year
    };

    if (with_genres.length > 0)
      queryStringParams.with_genres = with_genres.join(",");

    CallApi.get("/discover/movie", {
      params: queryStringParams
    }).then(data => {
      console.log(data.page);
      this.onChangePagination({
        // почему не рабоатет без этого ?
        page: data.page,
        total_pages: data.total_pages
      });
      this.updateMoviesList(data);
    });
  };

  @action
  updateMoviesList = data => {
    this.movies = data.results;
    this.preloader = false;
  };

  //ресет фильтров сделать через фор ин
}

export const moviesPageStore = new MoviesPageStore();

// reaction(
//   () => moviesPageStore.page,
//   () => {
//     moviesPageStore.getMovies();
//   }
// );
// //сслыка на обьект не меняется - реакция не происходит. если обьект простой - objectValues/values
// reaction(
//   () => values(moviesPageStore.filters),
//   () => {
//     // moviesPageStore.getMovies(1);
//     moviesPageStore.onChangePage(1);
//     moviesPageStore.getMovies();
//   }
// );

// //реакции зависят от стора - в конструктор класса
