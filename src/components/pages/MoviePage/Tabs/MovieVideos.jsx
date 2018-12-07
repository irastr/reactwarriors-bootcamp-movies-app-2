import React from 'react';
import CallApi from '../../../../api/api';

class MovieVideos extends React.Component {
    state = {
        videos: []
    }

    componentDidMount() {
        // console.log(this.props.id)
        // this.props.getFavoritesWatchlist()

        CallApi.get(`/movie/${this.props.id}/videos`, {
            params: {
                language: "ru-RU"
            }
        })
            .then(data => {
                console.log(data.results)
                this.setState({
                    videos: [ ...data.results ]
                });

            })

    }


    render() {

        const {videos} = this.state
        // (!!videos && videos.length) >0  ? (""): ("")
        // console.log(this.props.id)
        console.log("videos", this.state.videos)
        return (<div className="d-flex justify-content-center flex-wrap">

        {
            (videos.length) > 0  ? (
                videos.map((item)=> {
                    return (
                        // <React.Fragment key={item.key}>
                        <iframe key={item.key}
                            width="600" height="315" 
                            src={`https://www.youtube.com/embed/${item.key}`} 
                            frameBorder="0" allow="accelerometer; 
                            autoplay; encrypted-media; gyroscope;
                            picture-in-picture" 
                            title={item.key}
                            allowFullScreen>
                            
                            
                        </iframe>
                        // </React.Fragment>
                    )
                })
            ): (null)
        }

        </div>);
    }
}

export default MovieVideos;