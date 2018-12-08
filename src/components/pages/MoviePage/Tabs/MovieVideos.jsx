import React from 'react';
import CallApi from '../../../../api/api';
import Loader from 'react-loader-spinner'

class MovieVideos extends React.Component {
    state = {
        videos: [],
        preloader: false
    }

    componentDidMount() {
        this.setState({
            preloader: true
        });

        CallApi.get(`/movie/${this.props.id}/videos`, {
            params: {
                language: "ru-RU"
            }
        })
            .then(data => {
                console.log(data.results)
                this.setState({
                    videos: data.results,
                    preloader: false
                });
            })

    }


    render() {

        const {videos, preloader} = this.state
    
        console.log("videos", this.state.videos)
        return (<div className="d-flex justify-content-center flex-wrap">

        { preloader ? (
              <div className="loader mt-5">
              <Loader
                  type="Puff"
                  color="#047AFB"
                  height="100"
                  width="100"
              />
          </div>
        ) : (

            (videos.length) > 0  ? (
                videos.map((item)=> {
                    return (
                        
                        <iframe key={item.key}
                            width="550" height="315" 
                            src={`https://www.youtube.com/embed/${item.key}`} 
                            frameBorder="0" allow="accelerometer; 
                            autoplay; encrypted-media; gyroscope;
                            picture-in-picture" 
                            title={item.key}
                            allowFullScreen>
                        </iframe>
                        
                    )
                })
            ): (<div className="mt-5">Нет видео</div>) )
        }

        </div>);
    }
}

export default MovieVideos;