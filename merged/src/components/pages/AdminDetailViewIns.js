import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import AdminAbout from "./AdminAbout";
import TextField from "@mui/material/TextField";
import AdminSideBar from "../AdminSideBar";

const AdminDetailViewIns = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [date, setDate] = useState(new Date())

  var p_date = date.getDate()
  var p_month = date.getMonth() + 1
  var p_year = date.getFullYear()
  if(p_month <= 10){
    p_month = `0${p_month}`
  }
  var DOB = `${p_year}-${p_month}-${p_date}`

  const [adminData, setAdminData] = useState("");
  const [viewIns, setViewIns] = useState([]);
  const [userData, setUserData] = useState([]);
  const [insData, setInsData] = useState("");
  const [first, setFirst] = useState(false);
  const [allIns, setAllIns] = useState([])

  useEffect(() => {
    axios.get(`${requestURL}/admindashboard/${params.aid}`).then((res) => {
      setAdminData(res.data.admin);
      // console.log(res.data.admin)
      setViewIns(res.data.admin.instituteList);
    });

    axios
      .get(`${requestURL}/all/user/referal`)
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    
    axios.get(`${requestURL}/all/referral/ins/detail`).then((res) =>{
      setAllIns(res.data.institute)
    })
    .catch((e) =>{
      console.log('Error in All Institute')
    })

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

  const [approveInsData, setApproveInsData] = useState({
    insFreeLastDate: '',
    insPaymentLastDate: '',
    referalPercentage: "",
    userID: "",
    status: "Approved",
  });

  const InstApproveHandler = (e) => {
    const { name, value } = e.target;
    setApproveInsData({
      ...approveInsData,
      [name]: value,
    });
  };

  const InstApproveHandlerChange = (e) => {
    e.preventDefault();
    if(approveInsData.insFreeLastDate < DOB && approveInsData.insPaymentLastDate < DOB){
      
    }
    else{
    axios
      .post(
        `${requestURL}/admin/${params.aid}/approve/ins/${params.id}`,
        approveInsData
      )
      .then((res) => {
        setTimeout(() => {
          navigate(`/admin/insverified/${params.aid}`);
        }, 100);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    }
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
                  <form className="row" onSubmit={InstApproveHandlerChange}>
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
                        alt="not found"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="iName">Institute Name</label>
                      <input 
                      type="text"
                      name="insName"
                      className="form-control"
                      id="iName"
                      value={`${insData.insName}`}
                      readOnly
                      disabled
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                    <label htmlFor="iEmail">Institute Email</label>
                      <input 
                      type="text"
                      name="insEmail"
                      className="form-control"
                      id="iEmail"
                      value={`${insData.insEmail}`}
                      readOnly
                      disabled
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                    <label htmlFor="iNumber">Institute Mobile Number</label>
                      <input 
                      type="text"
                      name="insPhoneNumber"
                      className="form-control"
                      id="iNumber"
                      value={`${insData.insPhoneNumber}`}
                      readOnly
                      disabled
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                    <label htmlFor="iMode">Institute (Mode Of Teaching)</label>
                      <input 
                      type="text"
                      name="insMode"
                      className="form-control"
                      id="iMode"
                      value={`${insData.insMode}`}
                      readOnly
                      disabled
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-4">
                    <label htmlFor="iType">Institute Type</label>
                      <input 
                      type="text"
                      name="insType"
                      className="form-control"
                      id="iType"
                      value={`${insData.insType}`}
                      readOnly
                      disabled
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                    <label htmlFor="iAddress">Institute Address</label>
                      <input 
                      type="text"
                      name="insAddress"
                      className="form-control"
                      id="iAddress"
                      value={`${insData.insAddress}`}
                      readOnly
                      disabled
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                    <label htmlFor="fLast">Free Tier Last Date
                    <span className={styles.requireField}>*</span>
                    </label>
                      <input 
                      type="date"
                      name="insFreeLastDate"
                      className="form-control"
                      id="fLast"
                      placeholder="Enter Free Tier Last Date"
                      onChange={InstApproveHandler}
                      required
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                    <label htmlFor="pLast">Payment Last Date
                    <span className={styles.requireField}>*</span>
                    </label>
                      <input 
                      type="date"
                      name="insPaymentLastDate"
                      className="form-control"
                      id="pLast"
                      placeholder="Enter Payment Last Date"
                      onChange={InstApproveHandler}
                      required
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="user" className="form-group">
                        Referrals (User & Institute)
                      </label>
                      <select
                        name="userID"
                        id="user"
                        className="form-select"
                        onChange={InstApproveHandler}
                      >
                        <option value="Select User or Institute" selected disabled>Select User or Institute</option>
                        {userData &&
                          userData.map((ct) => (
                            <option value={ct._id}>{ct.userLegalName}</option>
                          ))}
                        {allIns && allIns.map((dt) => (
                          dt._id === insData._id ? '' :
                            <option value={dt._id}>{dt.insName}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                    <label htmlFor="rPercentage">Credit Count</label>
                      <input 
                      type="tel"
                      name="referalPercentage"
                      className="form-control"
                      id="rPercentage"
                      placeholder="Enter no. of credits to give"
                      onChange={InstApproveHandler}
                      
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
                        className="btn btn-outline-success mx-auto px-5 "
                      >
                        Approve Institute
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
      </div>
    </>
  );
};

export default AdminDetailViewIns;