import React, { useState, useEffect } from "react";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoCard from "../components/VideoCard";
import { requestURL } from "../../ReqUrl";
import axios from "axios";
import AddVideo from "../components/AddVideo";
const PlaylistDetails = (props) => {
  const [data, setData] = useState([]);
  const [videoFun, setVideoFun] = useState([]);
  useEffect(() => {
    if (props.runEffect || videoFun) {
      // console.log("This is playlist details");
      axios
        .get(`${requestURL}/playlist/${props.pid}/topic`)
        .then((res) => {
          setData(res.data.playlist.topic);
          props.runFunction();
          setVideoFun(false);
        })
        .catch(() => {
          console.log("Some thing Went wrong");
        });
    }
  }, [props.runEffect, videoFun]);

  const videoFunction = () => {
    setVideoFun(true);
  };
  return (
    <>
      {data &&
        data.map((dt, index) => (
          <div className="my-2" key={index}>
            <div>
              <div className="row">
                <h3
                  className="col-12 d-flex"
                  style={{ backgroundColor: "#e3e3e6" }}
                >
                  {index + 1}. {dt.topicName}
                </h3>
              </div>
              <div className="row">
                <AddVideo
                  key={dt._id}
                  tid={dt._id}
                  videoFunction={videoFunction}
                />
              </div>
            </div>
            <div
              className={styles.playlistContainer}
              style={{ justifyContent: "flex-start" }}
            >
              {dt.video &&
                dt.video.map((vid) => (
                  <VideoCard
                    key={vid._id}
                    pid={props.pid}
                    tid={dt._id}
                    vid={vid._id}
                    name={vid.name}
                    image={vid.video}
                    access={vid.access}
                    time={vid.videoTime}
                    price={vid.price}
                    id={props.id}
                    sid={props.sid}
                    setVideoFun={setVideoFun}
                  />
                ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default PlaylistDetails;
