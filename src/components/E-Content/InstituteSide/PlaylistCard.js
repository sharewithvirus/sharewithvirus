import React from "react";
import styles from "../../Home.module.css";
import { Link } from "react-router-dom";
export default function PlaylistCard(props) {
  return (
    <Link to={`/institute/${props.id}/playlist/${props.pid}`}>
      <div className={styles.playsitCard}>
        <div className={styles.playlistCardHeader}>
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
