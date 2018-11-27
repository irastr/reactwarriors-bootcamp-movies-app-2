import React from "react";
import { API_URL, API_KEY_3, fetchApi } from "../../api/api";


import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as bookmarkRegular,
  faHeart as heartRegular
} from "@fortawesome/free-regular-svg-icons";
library.add(faBookmark, faHeart, bookmarkRegular, heartRegular);


export default class MovieItem extends React.Component {


  state = {
    favorite: false,
    watchlist: false
  }


  handleIconClick = (name) => () => {
    const { session_id, toggleModal, item, user } = this.props

    if (session_id) {

      // this.setState({
      //   [name]: !this.state[name]
      // });

      this.setState(prevState => ({
        [name]: !prevState[name]
      }), () => {

        fetchApi(
          `${API_URL}/account/{${user.id}}/${name}?api_key=${API_KEY_3}&session_id=${session_id}`
          , {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(
              {
                "media_type": "movie",
                "media_id": item.id,
                [name]: this.state[name]
              }
            )
          }

        ).then(data => {
          console.log(data.status_message)
        })

      });



      // fetchApi(
      //   `${API_URL}/account/{${user.id}}/${name}?api_key=${API_KEY_3}&session_id=${session_id}`
      //   , {
      //     method: "POST",
      //     mode: "cors",
      //     headers: {
      //       "Content-type": "application/json;charset=utf-8"
      //     },
      //     body: JSON.stringify(
      //       {
      //         "media_type": "movie",
      //         "media_id": item.id,
      //         [name]: !this.state[name]
      //       }
      //     )
      //   }

      // ).then(data => {
      //   console.log(data.status_message)
      // })

    } else {
      toggleModal()
    }

  }


  render() {
    const { item } = this.props;
    const styleFavorite = this.state.favorite ? "fas" : "far";
    const styleWatch = this.state.watchlist ? "fas" : "far"

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
            <div>

              <a className="heart-icon"
                // onClick={this.handleIconClick.bind(null, "favorite")}
                onClick={this.handleIconClick("favorite")}

              >
                <FontAwesomeIcon icon={[styleFavorite, "heart"]} />
              </a>

              <a className="bookmark-icon"
                // onClick={this.handleIconClick.bind(null, "watchlist")}
                onClick={this.handleIconClick("watchlist")}
              >
                <FontAwesomeIcon icon={[styleWatch, "bookmark"]} />
              </a>

            </div>
          </div>
        </div>
      </div>
    );
  }
}


//