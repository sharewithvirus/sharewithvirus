import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportRqst from "../ReportRqst";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import AdminAbout from "./AdminAbout";
import AdminSideBar from "../AdminSideBar";

const AdminReportUsersPost = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [adminData, setAdminData] = useState("");
  const [reportListData, setReportListData] = useState([]);

  useEffect(() => {
    axios.get(`${requestURL}/admindashboard/${params.aid}`).then((res) => {
      const data = res.data.admin;
      setAdminData(data);
      setReportListData(res.data.admin.reportList);
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
                    <h4>Report Post</h4>
                    {/* <div className={`mb-5 ${styles.ddetail}`}>

                    </div> */}

                    <div className="row d-flex justify-content-between align-items-center mb-4">
                      <div
                        className={`col-6 col-xl-3 ${styles.barInnersLeft} ${styles.countSection}`}
                      >
                        <p>{reportListData.length}</p>
                        <p>Report Action Pending</p>
                      </div>
                    </div>

                    <ReportRqst
                        rData={reportListData ? reportListData.map(et => et).reverse() : ''}
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

export default AdminReportUsersPost;
