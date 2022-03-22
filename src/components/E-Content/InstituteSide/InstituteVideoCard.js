import React from "react";
import styles from "../../Home.module.css";
import { requestURL } from "../../ReqUrl";
import ReactPlayer from "react-player";

export default function PlaylistCard({ name, image }) {
  return (
    <div className={styles.playlistCard}>
      <ReactPlayer
        url={`${requestURL}/video/${image}`}
        height="110px"
        width="200px"
      />
      <div
        className={styles.videoPlaylistCard_overlay}
        style={{ marginTop: "20px", color: "black" }}
      >
        <h5>{name}</h5>
      </div>
    </div>
  );
}
