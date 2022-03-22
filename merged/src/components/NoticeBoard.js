import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NoticeBoard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${styles.about}
`}
      >
        <div className={styles.insUserBoard}>
          <img
            className={styles.insUserAnnounce}
            src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-announcement-icon-png-image_3660817.jpg"
          />
          <small className={styles.insUserAnnounceAt}>{props.content}</small>
        </div>
      </div>
    </>
  );
};

export default NoticeBoard;
