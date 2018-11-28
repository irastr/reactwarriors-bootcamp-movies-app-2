import React from "react";
import PropTypes from "prop-types"
// import { API_KEY_3, API_URL } from "../../api/api";


const Genres = ({ genresList, with_genres, resetGenres, onChange }) => (

    <React.Fragment >
        <div>
            <button
                type="button"
                className="btn btn-outline-dark mb-2"
                onClick={resetGenres}
            >
                Показать все жанры
          </button>
        </div>
        {
            genresList.map(genre => (
                <div key={genre.id} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={genre.id}
                        id={`genre${genre.id}`}
                        onChange={onChange}
                        checked={with_genres.includes(String(genre.id))}
                    />
                    <label className="form-check-label" htmlFor={`genre${genre.id}`}>
                        {genre.name}
                    </label>
                </div>
            ))
        }
    </React.Fragment >
)



Genres.propTypes = {
    // movies: PropTypes.array.isRequired
    genresList: PropTypes.array.isRequired,
    with_genres: PropTypes.array.isRequired,
    resetGenres: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired

}

export default Genres;





// class Genres extends React.Component {
//     constructor() {
//         super();

//         this.state = {
//             genresList: []
//         };
//     }

//     componentDidMount() {
//         const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
//         fetch(link)
//             .then(response => {
//                 return response.json();
//             })
//             .then(data => {
//                 // console.log(data)
//                 this.setState({
//                     genresList: data.genres
//                 });
//             });
//     }

//     onChange = event => {
//         console.log(event.target.checked)
//         this.props.onChangeFilters({
//             target: {
//                 name: "with_genres",
//                 value: event.target.checked
//                     ? [...this.props.with_genres, event.target.value]
//                     : this.props.with_genres.filter(genre => genre !== event.target.value)
//             }
//         });
//     };

//     resetGenres = () => {
//         this.props.onChangeFilters({
//             target: {
//                 name: "with_genres",
//                 value: []
//             }
//         });
//     };

//     render() {
//         const { genresList } = this.state;
//         const { with_genres } = this.props;
//         return (
//             <React.Fragment>
//                 <div>
//                     <button
//                         type="button"
//                         className="btn btn-outline-dark mb-2"
//                         onClick={this.resetGenres}
//                     >
//                         Показать все жанры
//           </button>
//                 </div>
//                 {genresList.map(genre => (
//                     <div key={genre.id} className="form-check">
//                         <input
//                             className="form-check-input"
//                             type="checkbox"
//                             value={genre.id}
//                             id={`genre${genre.id}`}
//                             onChange={this.onChange}
//                             checked={with_genres.includes(String(genre.id))}
//                         />
//                         <label className="form-check-label" htmlFor={`genre${genre.id}`}>
//                             {genre.name}
//                         </label>
//                     </div>
//                 ))}
//             </React.Fragment>
//         );
//     }
// }

// export default Genres;