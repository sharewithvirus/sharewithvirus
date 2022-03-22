import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
import UserPlaylistCard from "./UserPlaylistCard";
import styles from "../../Home.module.css";

const JoinedPlaylist = () => {
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
  return (
    <div
      className={styles.playlistContainer}
      style={{ justifyContent: "flex-start" }}
    >
      {data &&
        data.playlistJoin &&
        data.playlistJoin.map((item) => (
          <UserPlaylistCard
            item={item}
            key={item._id}
            pid={item._id}
            id={params.id}
            src={`${requestURL}/playlist/thumbnail/${item.photo}`}
          />
        ))}
    </div>
  );
};

export default JoinedPlaylist;
