import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMovieHOC from "./AddMovieHOC";

const Favorite = ({ onClick, isAdd }) => {

  return (
    <div className="heart-icon" onClick={onClick}>
      <FontAwesomeIcon icon={[isAdd ? "fas" : "far", "heart"]} />
    </div>
  );
}


export default AddMovieHOC(Favorite, "favorite");