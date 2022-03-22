import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
import UserVideoCard from "./UserVideoCard";
import styles from "../../Home.module.css";

const WatchLater = () => {
  const [data, setData] = useState("");
  const params = useParams();
  useEffect(() => {
    axios
      .get(`${requestURL}/user/${params.id}/userside`)
      .then((res) => {
        setData(res.data.userSide);
      })
      .catch(() => {
        console.log("some thing went wrong");
      });
  }, []);
  const videoFunctionId = () => {};
  return (
    <div
      className={styles.playlistContainer}
      style={{ justifyContent: "flex-start" }}
    >
      {data &&
        data.videoSave &&
        data.videoSave.map((vid) => (
          <UserVideoCard
            key={vid._id}
            pid={vid.topic.playlist._id}
            tid={vid.topic._id}
            vid={vid._id}
            name={vid.name}
            image={vid.video}
            access={vid.access}
            createdAt={vid.createdAt}
            id={params.id}
            videoFunctionId={videoFunctionId}
          />
        ))}
      {!data.videoSave && <p>No any video for watch later</p>}
    </div>
  );
};

export default WatchLater;
