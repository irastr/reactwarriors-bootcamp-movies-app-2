import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMovieHOC from "./AddMovieHOC";

class WatchList extends React.Component {
    render() {
        const { onClick, isAdd } = this.props;
        return (
            <div className="heart-icon" onClick={onClick}>
                <FontAwesomeIcon icon={[isAdd ? "fas" : "far", "bookmark"]} />
            </div>
        );
    }
}

export default AddMovieHOC(WatchList, "watchlist");