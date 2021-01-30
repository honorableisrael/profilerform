import React from 'react'
import './landing.css';

const VideoSection =()=>{
    return (
        <div className="rdvideoSection">
            <h2 className="rdvideoSection__heading">Still confused? <br/>Check out our short video clip</h2>
            <iframe 
                src="https://www.youtube.com/embed/LQ_41yuGttA?rel=0"
                title="main_video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            >
            </iframe>
        </div>
    )
}

export default VideoSection;