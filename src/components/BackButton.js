import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const BackButton = (props) => {
  let navigate = useNavigate();
  return (
    <>
      <div className={styles.backBtn}>
        <div onClick={() => navigate(-1)}>
          <img src="/images/icon-back.svg" alt="&lt;" />
          Back
        </div>
        <div className={styles.settingBtn}>
          <Link to={props.setting}>
            <img src="/images/icon-setting.svg" alt="setting" />
          </Link>
        </div>
      </div>
    </>
  );
};

BackButton.defaultProps = {
  setting: "",
};
export default BackButton;
