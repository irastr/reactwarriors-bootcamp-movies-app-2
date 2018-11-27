import React from "react";

import Favorite from "./Favorite";




export default class MovieItem extends React.Component {


  render() {

    const { session_id, toggleModal, item, user } = this.props

    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>

          <div class="d-flex justify-content-between">

            <div className="card-text">Рейтинг: {item.vote_average}</div>

            <Favorite

              session_id={session_id}
              toggleModal={toggleModal}
              item={item}
              user={user}


            />
          </div>
        </div>
      </div>
    );
  }
}


