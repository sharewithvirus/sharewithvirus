import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getdepartmenttotalstudent } from "./finalReportFormula";

const NewSportDetailBar = (props) => {

  return (
    <>
        <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
          <div className={styles.barMainrow}>
            <div
              className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
            >
              <div
                className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}
              >
                {/* <p>{props.sportText.financeHead ? 
                    `${props.sportText.financeHead.staffFirstName} ${props.sportText.financeHead.staffMiddleName ? props.sportText.financeHead.staffMiddleName : ''}
                    ${props.sportText.financeHead.staffLastName}` : ''
                }</p> */}
                <p>Sports and Arts</p>
              </div>
            </div>
            <div
              className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
            >
              <div className={`w-100 ${styles.barInnerCenter}`}>
                <p className={` ${styles.profileName}`}>
                  {`Sport Department`}
                </p>
              </div>
            </div>
            <div
              className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}
            >
              <div className={styles.barInnersRight}>
                <p>{props.sportText.sportAbout ? "" : 'About Sport'} </p>
                <p>
                  {" "}
                  &nbsp;{" "}
                  {props.sportText.sportAbout ? props.sportText.sportAbout.substr(0, 28) : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};


export default NewSportDetailBar;
