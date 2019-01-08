import { observable, action, configure, reaction, values } from "mobx";
import CallApi, { API_KEY_3 } from "../api/api";
configure({ enforceActions: "always" });

class MoviesPageStore {
  constructor() {
    //если реакции зависят от стора - в конструктор класса
    reaction(
      () => this.page,
      () => {
        this.getMovies();
      }
    );
    reaction(
      () => values(this.filters), //сслыка на обьект не меняется - реакция не происходит. поэтому сравнение через values. если обьект простой - objectValues/values
      () => {
        this.onChangePagination({ page: 1 });
        this.getMovies();
      }
    );
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
  onChangePagination = ({
    page = this.page,
    total_pages = this.total_pages
  }) => {
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
  updateMoviesList = data => {
    this.movies = data.results;
    this.preloader = false;
  };

  @action
  getMovies = () => {
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
        total_pages: data.total_pages
      });
      this.updateMoviesList(data);
    });
  };

  //ресет фильтров сделать через фор ин
}

export const moviesPageStore = new MoviesPageStore();