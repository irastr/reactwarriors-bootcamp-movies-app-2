import React from "react";
import FavoriteMoviePage from "./Icons/FavoriteMoviePage";
import WatchListMoviePage from "./Icons/WatchListMoviePage";
import AppContextHOC from "../../HOC/AppContextHOC";

const MoviePageInfo = ({ item, user, session_id, toggleModal }) => {
  const path = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path} `
    : "https://www.baltimoresportsandlife.com/wp-content/uploads/2016/07/Movies.jpg";
  return (
    <div
      className="moviepage-background"
      style={{
        backgroundImage:
          "linear-gradient(0deg,rgba(255,0,150,0.7),rgba(55, 103, 222,0.7)), url(" +
          `https://image.tmdb.org/t/p/w500${item.backdrop_path} ` +
          ")",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      }}
    >
      <div className="container p-3">
        <div className="row mt-5 ">
          <div className="col-md-4 col-9 ">
            <div className="card" style={{ width: "100 %" }}>
              <img className="card-img-top" src={path} alt="Card cap" />
            </div>
          </div>
          <div className="col-md-8 col-12 " style={{ color: "#FDFDFD" }}>
            <h3 className="mb-3">{item.title}</h3>
            <div className="d-flex ">
              <FavoriteMoviePage
                session_id={session_id}
                toggleModal={toggleModal}
                item={item}
                user={user}
                access={true}
              />
              <WatchListMoviePage
                session_id={session_id}
                toggleModal={toggleModal}
                item={item}
                user={user}
                access={true}
              />
            </div>
            <h4 className="mt-4">Описание фильма:</h4>
            <p>{item.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppContextHOC(MoviePageInfo);
