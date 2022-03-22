import React from "react";
import styles from "../../Home.module.css";
import { Link } from "react-router-dom";
import { requestURL } from "../../ReqUrl";
// import ReactPlayer from "react-player";
export default function PlaylistCard(props) {
  return (
    <Link
      to={`/user/${props.uid}/staff/${props.sid}/playlistdetail/${props.id}`}
    >
      <div
        className={`${styles.playsitCard}`}
        style={{ justifyContent: "flex-start" }}
      >
        <div className={styles.playlistCardHeader}>
          {/* <ReactPlayer url={`${requestURL}/video/${props.image}`} /> */}
          <img src={props.src} alt="playlist" />
        </div>
        <div className={styles.playlistCardFooter}>
          <h5>{props.item.name}</h5>
          <h5>By: {props.item.by}</h5>
        </div>
      </div>
    </Link>
  );
}
