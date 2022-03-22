import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import AdminAbout from "./AdminAbout";
import AdminSideBar from '../AdminSideBar'


const AdminDashboard = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [adminData, setAdminData] = useState("");
  const [approveIns, setApproveIns] = useState([]);
  const [rejectIns, setRejectIns] = useState([]);
  const [viewIns, setViewIns] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [blockedUser, setBlockedUser] = useState([]);

  useEffect(() => {
    axios.get(`${requestURL}/admindashboard/${params.aid}`).then((res) => {
      setAdminData(res.data.admin);
      setApproveIns(res.data.admin.ApproveInstitute);
      setRejectIns(res.data.admin.RejectInstitute);
      setViewIns(res.data.admin.instituteList);
      setAllUsers(res.data.admin.users);
      setBlockedUser(res.data.admin.blockedUsers);
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
              <h3 className={styles.welcome} style={{ marginTop: "22px" }}>
                WELCOME BACK, <i>{adminData.adminName ? adminData.adminName : ''}</i>
              </h3>
              <div className={` ${styles.appStats}`}>
                <div
                  class={`col-xl-5 col-lg-6 col-sm-6 col-11 ${styles.userContainer}`}
                >
                  <div className={`${styles.about} ${styles.tusers}`}>
                    <div
                      className="row my-4"
                      onClick={() =>
                        navigate(`/admin/usersrequest/${params.aid}`)
                      }
                    >
                      <div className="col">
                        <img src="/images/Icon-ausers.svg" alt="users" />
                      </div>
                      <div className="col">
                        <div className={` ${styles.countBox1}`}>
                          {allusers.length}
                        </div>
                      </div>
                    </div>
                    <div className={styles.textBox}>
                      <h3>Total Users</h3>
                      <p> *Includes all staff and student</p>
                    </div>
                  </div>
                  <div
                    className={`${styles.about} ${styles.statsBox} ${styles.tother}`}
                  >
                    <div className="row d-flex justify-content-around my-2">
                      <div className="col">
                        <img
                          src="/images/icon-ablockeduser.svg"
                          alt="pending"
                        />
                      </div>
                      <div className="col">
                        <div className={` ${styles.countBox2}`}>
                          {blockedUser.length}
                        </div>
                      </div>
                    </div>
                    <div className={styles.textBox}>
                      <h6>Blocked Users</h6>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-xl-4 col-lg-4 col-sm-4 col-11 ${styles.insContainer}`}
                >
                  <div
                    className={`${styles.about} ${styles.tother} ${styles.statsBox}`}
                    onClick={() => navigate(`/admin/insverified/${params.aid}`)}
                  >
                    <div className="row d-flex flex-row my-2">
                      <div className="col">
                        <img
                          src="/images/icon-ainsverified.svg"
                          alt="verified"
                        />
                      </div>
                      <div className="col">
                        <div className={` ${styles.countBox2}`}>
                          {approveIns.length}
                        </div>
                      </div>
                    </div>
                    <div className={styles.textBox}>
                      <h6>Verified Institutes</h6>
                    </div>
                  </div>
                  <div
                    className={`${styles.about} ${styles.tother} ${styles.statsBox}`}
                    onClick={() => navigate(`/admin/insrequests/${params.aid}`)}
                  >
                    <div className="row d-flex justify-content-around my-2">
                      <div className="col">
                        <img src="/images/icon-ainspending.svg" alt="pending" />
                      </div>
                      <div className="col">
                        <div className={` ${styles.countBox2}`}>
                          {viewIns.length}
                        </div>
                      </div>
                    </div>
                    <div className={styles.textBox}>
                      <h6>Pending Institutes</h6>
                    </div>
                  </div>
                  <div
                    className={`${styles.about} ${styles.tother} ${styles.statsBox}`}
                    onClick={() => navigate(`/admin/insreject/${params.aid}`)}
                  >
                    <div className="row d-flex justify-content-around my-2">
                      <div className="col">
                        <img src="/images/icon-ainsblocked.svg" alt="pending" />
                      </div>
                      <div className="col">
                        <div className={` ${styles.countBox2}`}>
                          {rejectIns.length}
                        </div>
                      </div>
                    </div>
                    <div className={styles.textBox}>
                      <h6>Reject Institutes</h6>
                    </div>
                  </div>
                </div>
                <div
                  className={`col-xl-2 col-lg-2 col-sm-2 col-11 ${styles.helpContainer}`}
                >
                  <div className={`${styles.about} ${styles.tother}`}>
                    <img src="/images/icon-mails.svg" alt="Mails" />
                    <h6>E-mails</h6>
                  </div>
                  <div className={`${styles.about} ${styles.tother}`}
                  onClick={() => navigate(`/admin/${params.aid}/query`)}
                  >
                    <img src="/images/icon-queries.svg" alt="Queries" />
                    <h6>Queries</h6>
                  </div>
                  <div className={`${styles.about} ${styles.tother}`}
                  onClick={() => navigate(`/admindashboard/${params.aid}/report`)}
                  >
                    <img src="/images/icon-report.svg" alt="Reported" />
                    <h6>Reports - {adminData.reportList ? adminData.reportList.length : 0}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <NavbarBottomInstitute /> */}
      </div>
    </>
  );
};

export default AdminDashboard;
