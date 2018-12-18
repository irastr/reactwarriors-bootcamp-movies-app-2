import React from 'react';
import CallApi from '../../../../api/api';
import Load from "../../../Loader/Load"


class MovieCredits extends React.Component {
    state = {
        credits: [],
        preloader: false
    }

    componentDidMount() {
        this.setState({
            preloader: true
        });

        CallApi.get(`/movie/${this.props.match.params.id}/credits`, {
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

        console.log(credits)
        return (<div className="d-flex justify-content-center flex-wrap ">

            {preloader ? (
                <div className="mt-5">
                    <Load />
                </div>
            ) : (

                    (credits.length) > 0 ? (
                        credits.map((item) => {
                            if (item.profile_path) {
                                return (
                                    <React.Fragment key={item.cast_id} >
                                        <div className="card" style={{ "width": "12rem", "margin": "15px" }}>
                                            <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt="Card cap" />
                                            <div className="card-body">
                                                <p style={{ "fontWeight": "bold", "margin": "0", "font-size": "0.85rem" }}>{item.name} </p>
                                                <p style={{ "margin": "0", "fontSize": "0.85rem" }}>{item.character} </p>
                                            </div>
                                        </div>
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