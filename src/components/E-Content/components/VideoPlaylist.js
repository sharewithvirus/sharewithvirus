import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPlayer from "react-player";

const VideoPlaylist = () => {
  return (
    <>
      <ReactPlayer
        // url={`${requestURL}/video/${image}`}
        controls={true}
        height="110px"
        width="200px"
      />
      <h1>This is perticular video play</h1>
    </>
  );
};

export default VideoPlaylist;
