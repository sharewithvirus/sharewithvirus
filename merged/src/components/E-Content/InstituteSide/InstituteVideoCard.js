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
      <div className={styles.videoPlaylistCard_overlay}>
        <h3>{name}</h3>
      </div>
    </div>
  );
}
