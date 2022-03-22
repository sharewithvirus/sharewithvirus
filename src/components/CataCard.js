import React from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "./ReqUrl";

const CataCard = (props) => {

  return (
    <>
        <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
        {props.cataData && props.cataData.map((dt) => (
        <div
        className={` ${styles.dlogo} ${styles.cardView}`}
        >
        <p className={styles.dlogoText}>
          <img className={styles.insUserProfiles}
          src={
            dt.photoId === "1"
              ? "/images/image-boy2.png"
              : props.first
              ? `${requestURL}/search/insdashboard/studentdata/photo/${dt.studentProfilePhoto}`
              : null
          }
          alt="Profile"
          />
          <br/>
          <small>({dt.studentGRNO})</small>
          <br/>
          <small> {`${dt.studentFirstName} ${dt.studentMiddleName ? dt.studentMiddleName : ''} ${dt.studentLastName}`}</small>
        </p>
        </div>
        ))}
        </div>
    </>
  );
};

export default CataCard;
