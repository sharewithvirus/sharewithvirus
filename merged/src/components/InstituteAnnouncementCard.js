import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";

const InstituteAnnouncementCard = (props) => {
  const [insAnnData, setInsAnnData] = useState([]);
  const [insData, setInsData] = useState([]);
  const [first, setFirst] = useState(false);
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${props.id ? props.id : ""}`)
      .then((res) => {
        // const announcement = res.data.institute.announcement;
        setInsAnnData(res.data.institute.announcement);
        setInsData(res.data.institute);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <>
      {insAnnData &&
      insAnnData.length === 0 ? 
      <div className={` ${styles.about} ${styles.statsSection}`}>
       <p className={styles.dlogoText}>No Announcement</p>
      </div> : 
        insAnnData.map((st, index) => (
          <div
            className={` ${styles.about} ${styles.statsSection}`}
            key={index}
          >
            <div
              className={styles.insStats}
              style={{
                display: "flex",
                margin: "0px",
                justifyContent: "space-between",
              }}
            >
              <p>
                <span style={{ color: "white" }}>
                  <img
                    style={{ width: "70px", hieght: "70px", filter: "none" }}
                    className={styles.dlogoImages}
                    src={
                      insData.photoId === "1"
                        ? "/images/institute-avatar.jpeg"
                        : first
                        ? `${requestURL}/insprofileabout/photo/${insData.insProfilePhoto}`
                        : null
                    }
                  />
                </span>
                <span style={{ color: "black" }}>{st.insAnnTitle}</span>
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default InstituteAnnouncementCard;
