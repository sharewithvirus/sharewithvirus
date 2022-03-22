import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../Home.module.css";
import AboutSection from "../../AboutSection";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
const SideBar = (props) => {
  const [insData, setInsData] = useState("");
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${props.id}`)
      .then((res) => {
        setInsData(res.data.institute);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);
  return (
    <div className={`${styles.leftside}`}>
      <div className={styles.leftBar}>
        <AboutSection id={props.id} />
        <div className={`${styles.about} ${styles.leftMenu}`}>
          <div className={styles.dabout}>
            <img
              src="/images/operating-admin-icon.svg"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Operating Admin"
            />
            {insData.insOperatingAdmin
              ? insData.insOperatingAdmin
              : "Operating Admin"}
          </div>

          <div className={styles.dabout}>
            <img
              src="/images/principal-icon.svg"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Principal"
            />
            {insData.insPrinciple ? insData.insPrinciple : "Principle"}
          </div>

          <div className={styles.dabout}>
            <img
              src="/images/student-president-icon.svg"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Student President"
            />
            {insData.insStudentPresident
              ? insData.insStudentPresident
              : "Student President"}
          </div>
          <div className={styles.dabout}>
            <img
              src="/images/chairman-icon.svg"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Chairman"
            />
            {insData.insTrusty ? insData.insTrusty : "Chairman"}
          </div>
          <div className={styles.dabout}>
            <img
              src="/images/admin-clerk-icon.svg"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Admin Clerk"
            />
            {insData.insAdminClerk ? insData.insAdminClerk : "Admin Clerk"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
