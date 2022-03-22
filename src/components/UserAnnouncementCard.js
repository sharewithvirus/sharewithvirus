import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import axios from "axios";
import moment from "moment";
import { requestURL } from "./ReqUrl";

const UserAnnouncementCard = (props) => {
  const navigate = useNavigate();
  const [userAnnData, setUserAnnData] = useState([]);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${props.uid ? props.uid : ""}`)
      .then((res) => {
        setUserAnnData(res.data.user.userInstituteFollowing);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <>
      {userAnnData &&
        userAnnData.length === 0 ? 
        <div className={` ${styles.about} ${styles.statsSection}`}>
         <p className={styles.dlogoText}>No Announcement</p>
        </div> : 
        userAnnData.map((st) =>
          st.announcement.map((et) => (
            <div
              className={` ${styles.about} ${styles.statsSection}`}
              onClick={() =>
                navigate(
                  `/${props.uid ? props.uid : ""}/user/announcementdetail/${
                    et._id
                  }`
                )
              }
              key={et._id}
            >
              <div className={styles.insStats}>
                <p>
                  <span>
                    <img
                      className="img-fluid"
                      src={
                        st.photoId === "1"
                          ? "/images/institute-avatar.jpeg"
                          : first
                          ? `${requestURL}/insprofileabout/photo/${st.insProfilePhoto}`
                          : null
                      }
                    />
                  </span>
                  <span className="mx-2">{et.insAnnTitle}</span>
                </p>
              </div>
              <div className={styles.insStats}>
                <p>
                  <span>
                    {et.insAnnDescription
                      ? `${et.insAnnDescription.substr(0, 17)}... `
                      : ""}
                  </span>
                  <span>
                    <small className="mx-2">
                      ({moment(et.createdAt).format("DD-MM-YYYY")})
                    </small>
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
    </>
  );
};

export default UserAnnouncementCard;
