import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InsBankRqst from "../InsBankRqst";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import AdminSideBar from "../AdminSideBar";
import AdminAbout from "./AdminAbout";

const AdminInsBankDetail = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [adminData, setAdminData] = useState("");
  const [viewIns, setViewIns] = useState([]);

  useEffect(() => {
    axios.get(`${requestURL}/admindashboard/${params.aid}`).then((res) => {
      const data = res.data.admin;
      setAdminData(data);
      setViewIns(res.data.admin.ApproveInstitute);
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
                    <h4>Institute Account Details</h4>
                    <div className={`mb-5 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-4">
                        <div
                          className={`${styles.dTab} `}
                        //   onClick={() =>
                        //     navigate(`/admin/insrequests/${params.aid}`)
                        //   }
                        >
                          <span>
                            <img
                              src="/images/passbook-admin-icon.svg"
                              alt="Account"
                            />
                          </span>
                        </div>
                        </div>
                      <div className="col-4">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                        //   onClick={() =>
                        //     navigate(`/admin/insverified/${params.aid}`)
                        //   }
                        >
                          <span>
                          <img
                              src="/images/verify-ins-icon.svg"
                              title="Verified"
                            />
                          </span>
                        </div>
                        </div>
                      <div className="col-4">
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                        //   onClick={() =>
                        //     navigate(`/admin/insreject/${params.aid}`)
                        //   }
                        >
                          <span>
                          <img
                              src="/images/block-ins-icon.svg"
                              title="Blocked"
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
                    
                    <InsBankRqst
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

export default AdminInsBankDetail;
