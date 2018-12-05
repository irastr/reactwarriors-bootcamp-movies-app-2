import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMovieHOC from "./AddMovieHOC";
import AppContextHOC from "../HOC/AppContextHOC"



const Favorite = ({ onClick, isAdd }) => {

  return (
    <div className="heart-icon" onClick={onClick("favorite")}>
      <FontAwesomeIcon icon={[isAdd ? "fas" : "far", "heart"]} />
    </div>
  );
}


export default AppContextHOC(AddMovieHOC(Favorite, "favoriteMovies"));