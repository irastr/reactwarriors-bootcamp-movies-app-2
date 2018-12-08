import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMovieHOC from "../../../Movies/AddMovieHOC";
import AppContextHOC from "../../../HOC/AppContextHOC"



class WatchList extends React.Component {


    render() {
        const { onClick, isAdd } = this.props;

        return (
            <div className="heart-icon--page icon-bookmark" onClick={onClick("watchlist")}>
                <div className="icon--page" >
                    <FontAwesomeIcon icon={[isAdd ? "fas" : "far", "bookmark"]} />
                </div>
            </div >
        );
    }
}

export default AppContextHOC(AddMovieHOC(WatchList, "watchlistMovies"));