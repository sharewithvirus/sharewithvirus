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

const Notification = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [notifyData, setNotifyData] = useState("");

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        const notify = res.data.user;
        setNotifyData(notify);
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
                      <h4>Notification Setting</h4>
                    </div>
                    <h4 className={`${styles.home} my-3`}>
                      Where You Receive These Notifications?
                    </h4>
                    <div className="col-12 col-md-6 mt-4">
                      <div className={styles.notify}>
                        <i
                          class={`fas fa-toggle-off mt-1 ${styles.notifyInner}`}
                        ></i>
                        <p>
                          <span className={styles.emailLabel}>Email</span>
                          <span className={styles.textLabel}>
                            Not Available
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <div className={styles.notify}>
                        <i
                          class={`fas fa-toggle-on mt-1 ${styles.notifyInner}`}
                        ></i>
                        <p>
                          <span className={styles.emailLabel}>SMS</span>
                          <span className={styles.textLabel}>
                            OTP Verifications For Approval
                          </span>
                        </p>
                      </div>
                    </div>
                    <h4 className={`${styles.home} my-3`}>
                      Other Notifications
                    </h4>
                    <div className="col-12 col-md-6 mt-4">
                      <div className={styles.notify}>
                        <i
                          class={`fas fa-toggle-off mt-1 ${styles.notifyInner}`}
                        ></i>
                        <p>
                          <span className={styles.emailLabel}>Sound</span>
                          <span className={styles.textLabel}>
                            Not Available
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <div className={styles.notify}>
                        <i
                          class={`fas fa-toggle-off mt-1 ${styles.notifyInner}`}
                        ></i>
                        <p>
                          <span className={styles.emailLabel}>Vibration</span>
                          <span className={styles.textLabel}>
                            Not Available
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <div className={styles.notify}>
                        <i
                          class={`fas fa-toggle-off mt-1 ${styles.notifyInner}`}
                        ></i>
                        <p>
                          <span className={styles.emailLabel}>
                            Friend Request
                          </span>
                          <span className={styles.textLabel}>
                            Not Available
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <div className={styles.notify}>
                        <i
                          class={`fas fa-toggle-off mt-1 ${styles.notifyInner}`}
                        ></i>
                        <p>
                          <span className={styles.emailLabel}>Comment</span>
                          <span className={styles.textLabel}>
                            Not Available
                          </span>
                        </p>
                      </div>
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

export default Notification;
