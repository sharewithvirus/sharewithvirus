import React from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getdepartmenttotalstudent } from "./finalReportFormula"

const NewSportHeadDetailBar = (props) => {


  return (
    <>
      <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
        <div className={styles.barMainrow}>
          <div
            className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
          >
            <div className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}>
              <p>{props.eData.sportStudent ? props.eData.sportStudent.length : 0}</p>
              <p>Students</p>
            </div>
            <div className={` ${styles.barInnersLeft} ${styles.barRightShort}`}>
              <p>{props.eData ? props.eData.length : 0}</p>
              <p>Class</p>
            </div>
          </div>
          <div
            className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
          >
            <div className={`w-100 ${styles.barInnerCenter}`}>
              <p className={` ${styles.profileName}`}>
                {props.name}</p>
            </div>
          </div>
          <div
            className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}
          >
            <div className={styles.barInnersRight}>
              <p>About </p>
              <p> &nbsp; {props.body1}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSportHeadDetailBar;
