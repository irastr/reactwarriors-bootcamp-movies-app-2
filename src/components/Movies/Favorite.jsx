import React from "react";
import UIIcon from "../UIComponents/UIIcon"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMovieHOC from "./AddMovieHOC";
import AppContextHOC from "../HOC/AppContextHOC"




const Favorite = ({ onClick, isAdd }) => {

  return (
    <div className="icon" >
      {/* <FontAwesomeIcon icon={[isAdd ? "fas" : "far", "heart"]} /> */}
      <UIIcon isAdd={isAdd} type="heart" onClick={onClick("favorite")} />
    </div>

  );
}


export default AppContextHOC(AddMovieHOC(Favorite, "favoriteMovies"));