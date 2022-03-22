import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import StaffUserRqst from "../StaffUserRqst";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import AdminAbout from "./AdminAbout.js";
import AdminSideBar from "../AdminSideBar";

const AllUsers = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [adminData, setAdminData] = useState("");
  const [viewIns, setViewIns] = useState([]);

  useEffect(() => {
    axios.get(`${requestURL}/admindashboard/${params.aid}`).then((res) => {
      setAdminData(res.data.admin);
      setViewIns(res.data.admin.users);
    });
  }, []);

  return (
    <>
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AdminAbout name={`${adminData.adminName}`} />

                <div className={`pt-5 ${styles.about} ${styles.leftMenu}`}>
                  <AdminSideBar aid={params.aid}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "22px" }}>
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <h4>User Requests</h4>
                    <div className={`mb-5 ${styles.ddetail}`}>
                    <div className="row my-5 col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-6">
                        <div
                          className={`${styles.dTab} `}
                        >
                          <span>
                            <img
                              src="/images/user-admin-icon.svg"
                              title="Users"
                            />
                          </span>
                        </div>
                        </div>
                      <div className="col-6">
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                        >
                          <span>
                            <img
                              src="/images/block-ins-icon.svg"
                              alt="Blocked"
                            />
                          </span>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="row d-flex justify-content-between align-items-center mb-4">
                      <div
                        className={`col-6 col-xl-3 ${styles.barInnersLeft} ${styles.countSection}`}
                      >
                        <p>{viewIns.length}</p>
                        <p>Action Pending</p>
                      </div>
                    </div>
                    <StaffUserRqst
                      requestData={viewIns}
                      aid={params.aid}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
