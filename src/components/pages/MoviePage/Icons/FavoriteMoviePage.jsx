import React from "react";
import UIIcon from "../../../UIComponents/UIIcon";
import AddMovieHOC from "../../../Movies/AddMovieHOC";
import AppContextHOC from "../../../HOC/AppContextHOC";

const FavoriteMoviePage = ({ onClick, isAdd }) => {
  return (
    <div
      className="icon-page-wrap icon-heart-hover"
      onClick={onClick("favorite")}
    >
      <div className="icon-page">
        <UIIcon isAdd={isAdd} type="heart" />
      </div>
    </div>
  );
};

export default AppContextHOC(AddMovieHOC(FavoriteMoviePage, "favoriteMovies"));
