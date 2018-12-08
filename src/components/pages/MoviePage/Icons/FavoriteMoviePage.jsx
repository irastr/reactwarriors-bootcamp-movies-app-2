import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMovieHOC from "../../../Movies/AddMovieHOC";
import AppContextHOC from "../../../HOC/AppContextHOC"



const FavoriteMoviePage = ({ onClick, isAdd }) => {

    return (
        <div className="heart-icon" onClick={onClick("favorite")}>
            hi
            <FontAwesomeIcon icon={[isAdd ? "fas" : "far", "heart"]} />
        </div>
    );
}


export default AppContextHOC(AddMovieHOC(FavoriteMoviePage, "favoriteMovies"));