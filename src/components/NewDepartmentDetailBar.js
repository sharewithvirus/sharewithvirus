import React from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getdepartmenttotalstudent } from "./finalReportFormula"

const NewDepartmentDetailBar = (props) => {

  let studentCount = 0;
  let subjectCount = 0

  if(props.batchData == null || props.batchData === undefined  && props.classList == null || props.classList === undefined){
  }else{

      let bdataClasslist = props.classList ? props.classList: 0
      let classLength = bdataClasslist.length ? bdataClasslist.length : 0
          studentCount = getdepartmenttotalstudent(bdataClasslist, classLength);
          subjectCount = (props.batchData.subjectMasters ? props.batchData.subjectMasters.length : 1)
    }

  return (
    <>
      <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
        <div className={styles.barMainrow}>
          <div
            className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
          >
            <div className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}>
              <p>{subjectCount}</p>
              <p>Subjects</p>
            </div>
            <div className={` ${styles.barInnersLeft} ${styles.barRightShort}`}>
              <p>{studentCount}</p>
              <p>Students</p>
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
          </div>
        </div>
      </div>
    </>
  );
};

NewDepartmentDetailBar.defaultProps = {
    name:"Department Name",
    sFirst:"Class",
    sFirstCount:12,
    sSecond:"Students",
    SSecondCount:500,
};

export default NewDepartmentDetailBar;
