import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import TextField from "@mui/material/TextField";
import AdminAbout from "./AdminAbout";
import AdminSideBar from "../AdminSideBar";

const AdminInsApplication = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [adminData, setAdminData] = useState("");
  const [viewIns, setViewIns] = useState([]);
  const [userData, setUserData] = useState([]);
  const [insData, setInsData] = useState("");
  const [first, setFirst] = useState(false);
  useEffect(() => {
    axios.get(`${requestURL}/admindashboard/${params.aid}`).then((res) => {
      setAdminData(res.data.admin);
      setViewIns(res.data.admin.instituteList);
    });

    axios
      .get("${requestURL}/all/user/referal")
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setInsData(res.data.institute);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <>
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AdminAbout name={`${adminData.adminName}`} />
                <div className={`pt-5 ${styles.about} ${styles.leftMenu}`}>
                  <AdminSideBar aid={params.aid} />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "25px" }}>
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <div className="col-12">
                      <h4>Preview of ({insData.insName})</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <img
                        className={styles.appImages}
                        src={
                          insData.photoId === "1"
                            ? "/images/institute-avatar.jpeg"
                            : first
                            ? `${requestURL}/insprofileabout/photo/${insData.insProfilePhoto}`
                            : null
                        }
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <TextField
                        label="Institute Name"
                        color="primary"
                        className="mt-2 mb-3"
                        name="studentFirstName"
                        focused
                        value={`${insData.insName}`}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <TextField
                        label="Institute Email"
                        color="primary"
                        className="mt-2 mb-3"
                        name="studentLastName"
                        focused
                        value={`${insData.insEmail}`}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <TextField
                        label="Institute Phone Number"
                        color="primary"
                        className="mt-2 mb-3"
                        name="studentNationality"
                        focused
                        value={`${insData.insPhoneNumber}`}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <TextField
                        label="Institute Mode of Teaching"
                        color="primary"
                        className="mt-2 mb-3"
                        name="studentCast"
                        focused
                        value={`${insData.insMode}`}
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-4">
                      <TextField
                        label="Institute Type"
                        color="primary"
                        className="mt-2 mb-3"
                        name="studentBirthPlace"
                        focused
                        value={`${insData.insType}`}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <TextField
                        label="Address"
                        name="studentAddress"
                        color="primary"
                        className="mt-2 mb-3"
                        focused
                        value={`${insData.insAddress}`}
                      />
                    </div>
                    <div className="col-6 d-flex justify-content-center my-5">
                      <span
                        className="btn btn-outline-primary mx-auto px-5 "
                        onClick={() =>
                          openInNewTab(
                            `${requestURL}/ins-register/doc/${insData.insDocument}`
                          )
                        }
                      >
                        View Document
                      </span>
                    </div>
                    <div className="col-6 d-flex justify-content-center my-5">
                      <button
                        type="button"
                        className="btn btn-outline-primary mx-auto px-5 "
                        onClick={() => navigate(-1)}
                      >
                        Go Back
                      </button>
                    </div>
                  </form>
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

export default AdminInsApplication;