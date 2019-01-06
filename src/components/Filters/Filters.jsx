import React from "react";
import SortBy from "./SortBy";
import PrimaryReleaseYear from "./PrimaryReleaseYear";
import Pagination from "./Pagination";
import Genres from "./Genres";

export default class Filters extends React.Component {
  render() {
    return (
      <form className="mb-3">
        <SortBy />
        <PrimaryReleaseYear />
        <Genres />
        <Pagination />
      </form>
    );
  }
}
