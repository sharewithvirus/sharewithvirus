import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../Home.module.css";
import UserStaffAboutSection from "../../UserStaffAboutSection";
const SideBar = (props) => {
  return (
    <div className={`${styles.leftside}`}>
      <div className={styles.leftBar}>
        <div className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}>
          <select
            className="form-control-plaintext"
            id="usermember"
            name="usermember"
          >
            <option value="ABC Institute ( staff )">
              ABC Institute ( staff )
            </option>
            <option value="ABC Institute ( student )">
              ABC Institute (student )
            </option>
          </select>
        </div>
        <UserStaffAboutSection sid={props.sid} />
        <div className={` ${styles.about} ${styles.leftMenu}`}>
          <div className={styles.dabout}>Id Card</div>
          <div className={styles.dabout}>Complaints Box</div>
          <div className={styles.dabout}>Leave</div>
          <div className={styles.dabout}>Transfer</div>
          <div className={styles.dabout}>Settings</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
