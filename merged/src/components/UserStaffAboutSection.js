import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";
import { Link } from 'react-router-dom'

const UserStaffAboutSection = (props) => {
  const [staffData, setStaffData] = useState("");
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${props.sid ? props.sid : ""}`)
      .then((res) => {
        setStaffData(res.data.staff);
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
            staffData.photoId === "1"
              ? "/images/image-boy2.png"
              : first
              ? `${requestURL}/search/insdashboard/staffdata/photo/${staffData.staffProfilePhoto}`
              : null
          }
          alt="Profile"
        />
        <p>
          <span className={styles.name}>{`${staffData.staffFirstName} ${
            staffData.staffMiddleName ? staffData.staffMiddleName : ""
          } ${staffData.staffLastName}`}</span>
          <br />
        </p>
        <div className={`text-center mx-auto`}>
          <button type="button" className="btn btn-primary mx-auto text-white px-5">
          <Link to={`/user/${props.uid ? props.uid : ''}/staff/profile/${props.sid ? props.sid : ''}`} style={{color: 'white', textDecoration: 'none'}}>
            View Profile
          </Link>
          </button>
        </div>
      </div>
    </>
  );
};

UserStaffAboutSection.defaultProps = {
  name: "Profile Name",
  imageSrc: "/images/image-boy2.png",
  button: "About",
};

export default UserStaffAboutSection;
