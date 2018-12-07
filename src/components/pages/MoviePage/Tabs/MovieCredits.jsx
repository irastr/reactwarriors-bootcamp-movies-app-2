import React from 'react';
import CallApi from '../../../../api/api';


class MovieCredits extends React.Component {
    state = {
        credits: []
    }

    componentDidMount() {
        // console.log(this.props.id)
        // this.props.getFavoritesWatchlist()

        CallApi.get(`/movie/${this.props.id}/credits`, {
            params: {
                language: "ru-RU"
            }
        })
            .then(data => {
                console.log(data.cast)
                this.setState({
                    credits: data.cast
                });

            })

    }


    render() {

        const { credits } = this.state

        // console.log("videos", this.state.videos)
        return (<div className="d-flex justify-content-center flex-wrap ">

            {
                (credits.length) > 0 ? (
                    credits.map((item) => {
                        if (item.profile_path) {
                            return (
                                <React.Fragment key={item.cast_id} >
                                    <img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt="" className="cast-img" />
                                </React.Fragment>
                            )
                        }
                    })
                ) : (null)
            }

        </div>);
    }
}

export default MovieCredits;