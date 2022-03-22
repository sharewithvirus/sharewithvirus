import React from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
function ExploreSection(props) {
  // const recent = localStorage.getItem("recent");
  // const arr = [2, 5, "fg", 9];
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${styles.popupbg2}`}
        onClick={() => props.changeExplore(false)}
      ></div>

      <div className={`${styles.explorepostContainer}`}>
        <div className={styles.exploreitems}>
          <div className={styles.exploreitemContainer} id={styles.exploreitem1}>
            <div className={styles.exploreitem}>
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
            </div>
            <p>Joined</p>
          </div>

          <div
            className={styles.exploreitemContainer}
            id={styles.exploreitem2}
            onClick={() => navigate(`/all/user/${props.id}/institute`)}
          >
            <div className={styles.exploreitem} style={{ marginLeft: "4px" }}>
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
            </div>
            <p>Institutions</p>
          </div>

          <div
            className={styles.exploreitemContainer}
            id={styles.exploreitem3}
            onClick={() => navigate(`/all/user/${props.id}/staff`)}
          >
            <div className={styles.exploreitem}>
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
            </div>
            <p>Mentor</p>
          </div>

          <div
            className={styles.exploreitemContainer}
            id={styles.exploreitem4}
            onClick={() => navigate(`/user/random/${props.id}`)}
          >
            <div className={styles.exploreitem}>
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
            </div>
            <p>Users</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExploreSection;