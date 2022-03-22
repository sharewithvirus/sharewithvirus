import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../Home.module.css";

const UserSide = (props) => {
  const joinedHandler = () => {
    props.joinedHandler();
  };
  const likeHandler = () => {
    props.likeHandler();
  };
  const watchHandler = () => {
    props.watchHandler();
  };
  return (
    <div className={`${styles.leftside}`}>
      <div className={styles.leftBar}>
        <div className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}>
          <input type="text" className="form-control" placeholder="Search..." />
        </div>

        <div className={` ${styles.about} ${styles.leftMenu}`}>
          <div className="row mb-3" style={{ cursor: "pointer" }}>
            <input
              type="text"
              className="form-control"
              value="Watch History"
              disabled
              readOnly
            />
          </div>
          <div
            className="row mb-3"
            onClick={joinedHandler}
            style={{ cursor: "pointer" }}
          >
            <input
              type="text"
              className="form-control"
              value="Joined"
              disabled
              readOnly
            />
          </div>
          <div
            className="row mb-3"
            onClick={likeHandler}
            style={{ cursor: "pointer" }}
          >
            <input
              type="text"
              className="form-control"
              value="Liked"
              disabled
              readOnly
            />
          </div>
          {/* <div className="row mb-3">
            <input
              type="text"
              className="form-control"
              value="Downloads"
              disabled
              readOnly
            />
          </div> */}
          <div
            className="row mb-3"
            onClick={watchHandler}
            style={{ cursor: "pointer" }}
          >
            <input
              type="text"
              className="form-control"
              value="Watch Later"
              disabled
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSide;
