import React from 'react'

function VideoSection() {
    return (
        <div className="videoSection">
            <h2 className="videoSection__heading">Still confused? <br/>Check out our short video clip</h2>
            <iframe 
                src="https://www.youtube.com/embed/LQ_41yuGttA">
            </iframe>
        </div>
    )
}

export default VideoSection
