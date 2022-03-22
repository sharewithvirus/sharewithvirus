import React from "react";
import styles from "../../Home.module.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function PlaylistContainer(props) {
  const navigate = useNavigate();
  const subjectID = props.sid;

  return (
    <>
      <Link to={`/topicplaylist/${subjectID}/${props.id}`}>
        <div className={styles.playlistCard}>
          <img src={props.image} />
          <div className={styles.playlistCard_overlay}>
            <h3>{props.name}</h3>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PlaylistContainer;

//{`/${topic_name}`}
