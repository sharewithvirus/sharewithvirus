import React, { useState, useEffect } from "react";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../../ReqUrl";
import UserVideoCard from "./UserVideoCard";
import axios from "axios";
const PlaylistDetails = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${requestURL}/playlist/${props.pid}/topic`)
      .then((res) => {
        setData(res.data.playlist.topic);
      })
      .catch(() => {
        console.log("Some thing Went wrong");
      });
  }, []);

  const videoFunctionId = (data) => {
    props.videoFunctionId(data);
  };
  return (
    <>
      {data.map((dt, index) => (
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
          </div>
          <div
            className={styles.playlistContainer}
            style={{ justifyContent: "flex-start" }}
          >
            {dt.video &&
              dt.video.map((vid) => (
                <UserVideoCard
                  key={vid._id}
                  pid={props.pid}
                  tid={dt._id}
                  vid={vid._id}
                  name={vid.name}
                  image={vid.video}
                  access={vid.access}
                  createdAt={vid.createdAt}
                  time={vid.videoTime}
                  price={vid.price}
                  id={props.id}
                  videoFunctionId={videoFunctionId}
                />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PlaylistDetails;
