import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import AdminAbout from "./AdminAbout";
import AdminSideBar from "../AdminSideBar";

const AdminDetailRejectIns = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [adminData, setAdminData] = useState("");
  const [viewIns, setViewIns] = useState([]);
  const [insData, setInsData] = useState("");
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios.get(`${requestURL}/admindashboard/${params.aid}`).then((res) => {
      setAdminData(res.data.admin);
      setViewIns(res.data.admin.instituteList);
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

  const [rejectInsData, setRejectInsData] = useState({
    rejectReason: "",
    status: "Rejected",
  });

  const InstRejectHandler = (e) => {
    const { name, value } = e.target;
    setRejectInsData({
      ...rejectInsData,
      [name]: value,
    });
  };

  const InstRejectHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/admin/${params.aid}/reject/ins/${params.id}`,
        rejectInsData
      )
      .then((res) => {
        setTimeout(() => {
          navigate(`/admindashboard/${params.aid}`);
        }, 100);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };
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
              <div className={`${styles.about}`} style={{ marginTop: "22px" }}>
                <div className={` ${styles.outer2}`}>
                  <form className="row" onSubmit={InstRejectHandlerChange}>
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
                      <label htmlFor="afirstname" className="form-group mb-2">
                        Institute Name
                      </label>
                      <input
                        type="text"
                        name="studentFirstName"
                        className="form-control"
                        id="afirstname"
                        value={insData.insName}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="alastname" className="form-group mb-2">
                        Institute Email
                      </label>
                      <input
                        type="text"
                        name="studentLastName"
                        className="form-control"
                        id="alastname"
                        value={insData.insEmail}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="anational" className="form-group mb-2">
                        Institute Phone Number
                      </label>
                      <input
                        type="text"
                        name="studentNationality"
                        className="form-control"
                        id="anational"
                        value={insData.insPhoneNumber}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="acast" className="form-group mb-2">
                        Institute Mode of Teaching
                      </label>
                      <input
                        type="text"
                        name="studentCast"
                        className="form-control"
                        id="acast"
                        value={insData.insMode}
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="abirth" className="form-group mb-2">
                        Institute Type
                      </label>
                      <input
                        type="text"
                        name="studentBirthPlace"
                        className="form-control"
                        id="abirth"
                        value={insData.insType}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="aaddress" className="form-group mb-2">
                        Address
                      </label>
                      <textarea
                        type="text"
                        name="studentAddress"
                        className="form-control"
                        rows="4"
                        cols="40"
                        id="aaddress"
                        value={insData.insAddress}
                      ></textarea>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="users" className="form-label">
                        Reason
                      </label>
                      <input
                        type="tel"
                        name="rejectReason"
                        id="users"
                        className="form-control"
                        placeholder="Enter Reason"
                        onChange={InstRejectHandler}
                        required
                      />
                    </div>
                    <div className="col-12 d-flex justify-content-center my-5">
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
                      <button
                        type="submit"
                        className="btn btn-outline-info mx-auto px-5 "
                        // onClick={() => navigate("/staffrequest")}
                      >
                        Reject Institute
                      </button>
                      <button
                        type="submit"
                        className="btn btn-outline-secondary mx-auto px-5 "
                        onClick={() => navigate(-1)}
                      >
                        Cancel
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

export default AdminDetailRejectIns;