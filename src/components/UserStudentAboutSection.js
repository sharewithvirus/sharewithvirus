import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";
import { Link } from 'react-router-dom'

const UserStudentAboutSection = (props) => {
  const [studentData, setStudentData] = useState("");
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/studentdesignationdata/${props.sid ? props.sid : ""}`)
      .then((res) => {
        setStudentData(res.data.student);
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
            studentData.photoId === "1"
              ? "/images/image-boy2.png"
              : first
              ? `${requestURL}/search/insdashboard/studentdata/photo/${studentData.studentProfilePhoto}`
              : null
          }
          alt="Profile"
        />
        <p>
          <span className={styles.name}>{`${studentData.studentFirstName} ${
            studentData.studentMiddleName ? studentData.studentMiddleName : ""
          } ${studentData.studentLastName}`}</span>
          <br />
        </p>
        <div className={`text-center mx-auto`}>
          <button type="button" className="btn btn-primary mx-auto text-white px-5">
          <Link to={`/user/${props.uid ? props.uid : ''}/student/profile/${props.sid ? props.sid : ''}`} style={{color: 'white', textDecoration: 'none'}}>
            View Profile
          </Link>
          </button>
        </div>
        </div>
    </>
  );
};

UserStudentAboutSection.defaultProps = {
  name: "Profile Name",
  imageSrc: "/images/image-boy2.png",
  button: "About",
};

export default UserStudentAboutSection;
