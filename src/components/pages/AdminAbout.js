import React from "react";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
const AdminAbout = (props) => {
  return (
    <>
      <div className={`${styles.about} ${styles.profileCard}`}>
        <img
          className={styles.profileInfo}
          src={`/images/image-boy2.png`}
          alt="Profile"
        />
        <p>
          <span className={styles.name}>{props.name}</span>
          <br />
        </p>
      </div>
    </>
  );
};

export default AdminAbout;
