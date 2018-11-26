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


  handleIconClick = (item, name) => {
    const session_id = this.props.session_id

    if (session_id) {

      this.setState({
        [name]: !this.state[name]
      });

      const account_id = this.props.user.id

      fetchApi(
        `${API_URL}/account/{${account_id}}/${name}?api_key=${API_KEY_3}&session_id=${session_id}`
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
              [name]: !this.state[name]
            }
          )
        }

      ).then(data => {
        console.log(data.status_message)
      })

    } else {
      this.props.toggleModal()
    }

  }


  render() {
    const { item } = this.props;
    const styleFavorite = this.state.favorite ? ("fas") : ("far");
    const styleWatch = this.state.watchlist ? ("fas") : ("far")

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

              <a className="heart-icon" className="mr-1" onClick={this.handleIconClick.bind(null, item, "favorite")}
                disabled={this.state.favorite} >
                <FontAwesomeIcon icon={[styleFavorite, "heart"]} />
              </a>

              <a className="bookmark-icon" onClick={this.handleIconClick.bind(null, item, "watchlist")}
                disabled={this.state.watchlist} >
                <FontAwesomeIcon icon={[styleWatch, "bookmark"]} />
              </a>

            </div>
          </div>
        </div>
      </div>
    );
  }
}