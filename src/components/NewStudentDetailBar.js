import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NewStudentDetailBar = (props) => {
  return (
    <>
      <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
        <div className={styles.barMainrow}>
          <div
            className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
          >
            <div className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}>
              <p>{props.studentClass.className}</p>
              <p>Class</p>
            </div>
            <div className={` ${styles.barInnersLeft} ${styles.barRightShort}`}>
              {/* <p>{props.staffDepart.length >=1 && 'Department(H)'}</p>
              <p>{props.staffClass.length >=1 && 'Class (T)'}</p>
              <p>{props.staffSubject.length >=1 && 'Subject (T)'}</p> */}
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
              <p>{props.head1} </p>
              <p> &nbsp; {props.body1}</p>
            </div>
            <div className={styles.barInnersRight}>
              <p>{props.head2} </p>
              <p>&nbsp; {props.body2}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NewStudentDetailBar.defaultProps = {
    name:"Student Name",
    // sFirst:"Class",
    // sFirstCount:12,
    // sSecond:"Students",
    // SSecondCount:500,
    head1:"Joining Code",
    body1:"123",
    head2:"GR No.",
    body2:"01"
};

export default NewStudentDetailBar;
