import React from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const NewClassDetailBar = (props) => {

let classSubjectCount = 0;
let classStudentCount = 0;
  
  if(props.cData == null || props.cData === undefined ){
  }else{
    classSubjectCount = (props.cData.subject ? props.cData.subject.length : 0)
    classStudentCount = (props.cData.ApproveStudent ? props.cData.ApproveStudent.length : 0)
  }

  return (
    <>
      <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
        <div className={styles.barMainrow}>
          <div
            className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
          >
            <div className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}>
              <p>{classSubjectCount}</p>
              <p>Subjects</p>
            </div>
            <div className={` ${styles.barInnersLeft} ${styles.barRightShort}`}>
              <p>{classStudentCount}</p>
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
              <p> &nbsp; {props.body1}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NewClassDetailBar.defaultProps = {
    name:"Department Name",
    sFirst:"Class",
    sFirstCount:12,
    sSecond:"Students",
    SSecondCount:500,
    head1:"Department",
    body1:"Description",
};

export default NewClassDetailBar;
