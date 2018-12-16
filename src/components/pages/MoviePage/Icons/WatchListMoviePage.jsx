import React from "react";
import UIIcon from "../../../UIComponents/UIIcon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddMovieHOC from "../../../Movies/AddMovieHOC";
import AppContextHOC from "../../../HOC/AppContextHOC"



class WatchList extends React.Component {


    render() {
        const { onClick, isAdd } = this.props;

        return (
            <div className="icon-page-wrap icon-bookmark-hover" onClick={onClick("watchlist")}>
                <div className="icon-page" >
                    <UIIcon isAdd={isAdd} type="bookmark" />
                </div>
            </div >

        );
    }
}

export default AppContextHOC(AddMovieHOC(WatchList, "watchlistMovies"));