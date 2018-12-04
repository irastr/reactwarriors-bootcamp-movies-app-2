import React from "react";
import Favorite from "./Favorite";
import WatchList from "./WatchList"




export default class MovieItem extends React.Component {


  render() {

    const { session_id, toggleModal, item, user } = this.props

    const path = (item.backdrop_path || item.poster_path) ? (`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
      item.poster_path} `) : ("https://www.baltimoresportsandlife.com/wp-content/uploads/2016/07/Movies.jpg")

    return (
      <div className="card" style={{ width: "100%", minHeight: "300px" }}>
        <img
          className="card-img-top card-img--height"
          src={path}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>

          <div className="d-flex justify-content-between">

            <div className="card-text">Рейтинг: {item.vote_average}</div>
            <div className="d-flex">
              <Favorite

                session_id={session_id}
                toggleModal={toggleModal}
                item={item}
                user={user}


              />

              <WatchList

                session_id={session_id}
                toggleModal={toggleModal}
                item={item}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


