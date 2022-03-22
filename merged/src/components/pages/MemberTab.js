import React from "react";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MemberTab = () => {
  return (
    <div>
      <div className={styles.newMember}>
        <div>
          <div className={styles.memberprofile}>
            <p>Profile Password</p>
          </div>
        </div>
        <p className={styles.memberText}>When Switching for First Time</p>
        <div>
          <div className={styles.memberprofile}>
            <p>Create Profile Password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberTab;
