import React from 'react';
import Loader from 'react-loader-spinner'

const Load = () => {
    return (
        <div className="loader">
            <Loader
                type="Puff"
                color="#047AFB"
                height="100"
                width="100"
            />
        </div>);
}

export default Load;