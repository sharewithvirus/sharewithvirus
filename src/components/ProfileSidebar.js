import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "./ReqUrl";
import axios from "axios";
import { Success } from "../components/SnackBar";
import TextField from '@mui/material/TextField';


const ProfileSidebar = () => {
  const navigate = useNavigate();
  const [insLogin, setInsLogin] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const LogoutHandler = () => {
    axios
      .get(`${requestURL}/ins-logout`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: "include",
      })
      .then((res) => {
        setInsLogin({ showMessages: true, msg: res.data.message });
        localStorage.removeItem('userId')
        navigate("/login", { replace: true });
      })
      .catch((e) => {
        setInsLogin({ showMessages: true, msg: "something went wrong" });
      });
  };
  return (
    <>
      {insLogin.showMessages ? <Success msg={insLogin.msg} /> : null}
      <div className={styles.leftBar}>
        <div className={`${styles.about} ${styles.leftMenu}`}>
        <div className={styles.dabout}>
            <img
              src="/images/favourites-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Favourites"
            /> Saved Post
        </div>
          <div className={styles.dabout}>
            <img
              src="/images/language-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Language"
            /> Language
        </div>
        <div className={styles.dabout}>
            <img
              src="/images/support-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Support"
            /> Support
        </div>
        <div className={styles.dabout}>
            <img
              src="/images/about-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="About Us"
            /> About Us
        </div>
        <div className={styles.dabout} onClick={LogoutHandler}>
            <img
              src="/images/logout-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Logout"
            /> Logout
        </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
