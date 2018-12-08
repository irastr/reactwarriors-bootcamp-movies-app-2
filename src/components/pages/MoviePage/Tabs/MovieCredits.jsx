import React from 'react';
import CallApi from '../../../../api/api';
import Loader from 'react-loader-spinner'


class MovieCredits extends React.Component {
    state = {
        credits: [],
        preloader: false
    }

    componentDidMount() {
        this.setState({
            preloader: true
        });

        CallApi.get(`/movie/${this.props.id}/credits`, {
            params: {
                language: "ru-RU"
            }
        })
            .then(data => {
                console.log(data.cast)
                this.setState({
                    credits: data.cast,
                    preloader: false
                });

            })

    }


    render() {

        const { credits, preloader } = this.state


        return (<div className="d-flex justify-content-center flex-wrap ">

            {preloader ? (
                <div className="loader mt-5">
                    <Loader
                        type="Puff"
                        color="#047AFB"
                        height="100"
                        width="100"
                    />
                </div>
            ) : (
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
                    ) : (<div className="mt-5">Нет информации</div>))
            }

        </div>);
    }
}

export default MovieCredits;