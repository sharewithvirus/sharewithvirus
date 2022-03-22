import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";

const UserAboutSection = (props) => {
  const [userData, setUserData] = useState("");
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${props.uid ? props.uid : ""}`)
      .then((res) => {
        setUserData(res.data.user);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);



  return (
    <>
      <div className={`${styles.about} ${styles.profileCard}`}>
        <img
          className={styles.profileInfo}
          src={
            userData.photoId === "1"
              ? "/images/image-boy2.png"
              : first
              ? `${requestURL}/userprofileabout/photo/${userData.profilePhoto}`
              : null
          }
          alt="Profile"
        />
        <p>
          <span className={styles.name}>{userData.userLegalName}</span>
          <br />
        </p>
        <div className={`text-center mx-auto`}>{userData.userBio}</div>
      </div>
    </>
  );
};

UserAboutSection.defaultProps = {
  name: "Profile Name",
  imageSrc: "/images/image-boy2.png",
  button: "About",
};

export default UserAboutSection;
