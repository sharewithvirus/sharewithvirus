import React from "react";
import style from "./Navbar.module.css";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutSection from "./AboutSection";
import InstituteSidebar from "./InstituteSidebar";
import InstituteStatsSection from "./InstituteStatsSection";

const NavSidebar = ({ profilePicSrc, name }) => {
  return (
    <>
      <div className={`col-8 col-sm-6 col-md-5  pt-3 pb-5 ${style.sidebar}`}>
        <div className={`mt-5 ${styles.leftBar}`}>
          <AboutSection imageSrc={profilePicSrc} name={name} />

          <InstituteSidebar />
          <div className={styles.rightCols}>
            <InstituteStatsSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavSidebar;
