import React from "react";
import styles from "./Scroll.module.css";
import { Link } from "react-router-dom";
export default function UserPlaylistCard(props) {
  return (
    <Link to={`/user/${props.id}/e-content/playlist/${props.pid}`}>
      <div className={styles.rplaylist}>
        <img src={props.src} alt="playlist" />
        <div className={styles.rplaylistfooter}>
          <div>
            <h5>{props.item.name}</h5>
            <h6>Created By: {props.item.by}</h6>
          </div>
        </div>
      </div>
    </Link>
  );
}
