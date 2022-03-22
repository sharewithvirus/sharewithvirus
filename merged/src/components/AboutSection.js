import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";

const AboutSection = (props) => {
  const [insData, setInsData] = useState("");
  const [first, setFirst] = useState(false);
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${props.id ? props.id : ""}`)
      .then((res) => {
        setInsData(res.data.institute);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something Went wrong");
      });
  }, []);

  return (
    <>
      <div className={`${styles.about} ${styles.profileCard}`}>
        <img
          className={styles.profileInfo}
          src={
            insData.photoId === "1"
              ? "/images/institute-avatar.jpeg"
              : first
              ? `${requestURL}/insprofileabout/photo/${insData.insProfilePhoto}`
              : null
          }
          alt="Profile"
        />
        <p>
          <span className={styles.name}>{insData.insName}</span>
          <br />
        </p>
        {/* ${styles.button} */}
        <div className={`text-center mx-auto`}>{insData.insAbout}</div>
      </div>
    </>
  );
};

AboutSection.defaultProps = {
  name: "Profile Name",
  imageSrc: "/images/blank-profile.png",
  button: "About",
};

export default AboutSection;
