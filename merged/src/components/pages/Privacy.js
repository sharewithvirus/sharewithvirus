import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from '../UserAboutSection'
import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import UserSettingSideBar from "../UserSettingSideBar";

const Privacy = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [privacyData, setPrivacyData] = useState("");

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        const privacy = res.data.user;
        setPrivacyData(privacy);
      });
  }, []);
  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.id}/>
        <div className={`${styles.mainContent}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <UserAboutSection uid={params.id}/>
                <div className={`${styles.about} ${styles.leftMenu}`}>
                    <UserSettingSideBar id={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <div className="col-12">
                      <h4>Privacy Setting</h4>
                    </div>
                    <div className="col-12 mt-4">
                      <label for="inputState" className="form-label">
                        Who Can See Your Future Post?
                      </label>
                      <select id="inputState" className="form-select">
                        <option value="Every One">Every One</option>
                        <option value="Circle">Circle</option>
                        <option value="Only me">Only me</option>
                      </select>
                    </div>
                    <div className="col-12 mt-4">
                      <label for="inputState" className="form-label">
                        Who Can Send You Friend Request?
                      </label>
                      <select id="inputState" className="form-select">
                        <option value="Every One">Every One</option>
                        <option value="Circle">Circle</option>
                        <option value="Only me">Only me</option>
                      </select>
                    </div>
                    <div className="col-12 mt-4">
                      <label for="inputState" className="form-label">
                        Who Can See Your Email Address Provided?
                      </label>
                      <select id="inputState" className="form-select">
                        <option value="Circle">Circle</option>
                        <option value="Every One">Every One</option>
                        <option value="Only me">Only me</option>
                      </select>
                    </div>
                    <div className="col-12 mt-4">
                      <label for="inputState" className="form-label">
                        Who Can See Your Phone Number Provided?
                      </label>
                      <select id="inputState" className="form-select">
                        <option value="Only me">Only me</option>
                        <option value="Every One">Every One</option>
                        <option value="Circle">Circle</option>
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id}/>
      </div>
    </>
  );
};

export default Privacy;
