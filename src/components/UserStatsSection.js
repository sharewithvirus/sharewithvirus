import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const UserStats = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.about} ${styles.wrapper}`}
      style={{marginTop: '-82px'}}
      >
        <div
          className={`${styles.about}  ${styles.statsSection} ${styles.shiftLeft}`}
        >
          <div className={styles.insStats}>
            <div className={styles.insStatsText}>
              <p>
                <span>
                <img
                  src="/images/joined-icon.svg"
                  // className={`${style.userimg} ${style.svgIcon}`}
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Joined"
                />
                </span>
              </p>
              <p>
                <span>Joined</span>
              </p>
            </div>
            <div
              className={styles.insStatsText}
              onClick={() => navigate(`/all/user/${props.uid}/institute`)}
            >
              <p>
                <span>
                <img
                  src="/images/institute-icon.svg"
                  // className={`${style.userimg} ${style.svgIcon}`}
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Joined"
                />
                </span>
              </p>
              <p>
                <span>Institutes</span>
              </p>
            </div>
          </div>
          <div className={styles.insStats}>
            <div
              className={styles.insStatsText}
              onClick={() => navigate(`/all/user/${props.uid}/staff`)}
            >
              <p>
                <span>
                <img
                  src="/images/mentor-icon.svg"
                  // className={`${style.userimg} ${style.svgIcon}`}
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Joined"
                />
                </span>
              </p>
              <p>
                <span>Mentor</span>
              </p>
            </div>
            <div
              className={styles.insStatsText}
              onClick={() => navigate(`/user/random/${props.uid}`)}
            >
              <p>
                <span>
                <img
                  src="/images/user-icon.svg"
                  // className={`${style.userimg} ${style.svgIcon}`}
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Joined"
                />
                </span>
              </p>
              <p>
                <span>Users</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStats;
