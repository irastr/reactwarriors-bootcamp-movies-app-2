import React from "react";
import UIIcon from "../UIComponents/UIIcon"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMovieHOC from "./AddMovieHOC";
import AppContextHOC from "../HOC/AppContextHOC"

class WatchList extends React.Component {


    render() {
        const { onClick, isAdd } = this.props;

        return (
            <div className="icon" >
                {/* <FontAwesomeIcon icon={[isAdd ? "fas" : "far", "bookmark"]} /> */}
                <UIIcon isAdd={isAdd} type="bookmark" onClick={onClick("watchlist")} />
            </div>
        );
    }
}

export default AppContextHOC(AddMovieHOC(WatchList, "watchlistMovies"));