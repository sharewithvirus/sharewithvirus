import React from "react";
import styles from "./Home.module.css";
export default function EachRow(props) {
  return (
    <div className={styles.certifyflex}>
      <div className={styles.left}>
        <h6>{props.feild}</h6>
      </div>
      <div className={styles.right}>
        <h6>{props.value}</h6>
      </div>
    </div>
  );
}

export function EachSubRow(props) {
  return (
    <div className={styles.certiflex}>
      <div className={styles.certileft}>
        <div className={`${styles.certifydata} ${styles.feildd}`}>
          <h6>{props.feild1}</h6>
        </div>
        <div className={styles.certifydata}>
          <h6>{props.value1}</h6>
        </div>
      </div>
      <div className={styles.certileft}>
        <div className={`${styles.certifydata} ${styles.feildd}`}>
          <h6>{props.feild2}</h6>
        </div>
        <div className={styles.certifydata}>
          <h6>{props.value2}</h6>
        </div>
      </div>
    </div>
  );
}

export function TopRow(props) {
  return (
    <>
      <div className={styles.certop}>
        <img src={`/images/seal_icon.jpeg`} alt="not found"></img>
        <h1>NAME OF THE INSTITUTE</h1>
      </div>
      <div className={styles.certop2}>
        <h6>Village/Town: Ballupur, Dist: Moga, PinCode:</h6>
      </div>

      <div className={styles.certifybottom}>
        <div className={styles.certifybottomflex}>
          <h6 className={styles.gred6}>Gr No.</h6>
        </div>
        <div className={styles.certifybottomflex}>
          <h6>Certificate No.</h6>
        </div>
      </div>

      <div>
        <h4>---: Leaving Certificate :---</h4>
        <h6>Editable Text File.....................</h6>
        <p>
          -------------------------------------------------------------------------------------------------
          ----------------------------------------------------------------------------------------------------------------------
        </p>
      </div>
    </>
  );
}

export function BottomRow(props) {
  return (
    <>
      <div className={styles.certifybottom}>
        <div className={styles.certifybottomflex}>
          <h6>Date:</h6>
          <p>{props.date}</p>
        </div>
        <div className={styles.certifybottomflex}>
          <h6>Principal Signature</h6>
          <p>Sign</p>
        </div>
      </div>
    </>
  );
}

export function ExamTop(props) {
  return (
    <>
      <div className={styles.examtop}>
        <h3>LUCKNOW UNIVERSITY</h3>
      </div>

      <h3 className={styles.examtoph3}>---: {props.exam} Examination :---</h3>
      <hr />
    </>
  );
}

export function ExamRow(props) {
  return (
    <>
      <div className={`${styles.exmarow} ${styles.dTab} ${styles.active}  `}>
        <h6>
          {props.feild1}
          {props.value1}
        </h6>
        <h6>
          {props.feild2}
          {props.value2}
        </h6>
      </div>
    </>
  );
}
