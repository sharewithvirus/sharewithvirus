import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
// import AboutSection from "../AboutSection";
// import BackButton from "../BackButton";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
// import { createTheme } from "@mui/system";
import CataCard from "../CataCard";
import { requestURL } from "../ReqUrl";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const ClassCatalog = (props) => {
  const navigate = useNavigate();

  const params = useParams();

  const [catalogIns, setCatalogIns] = useState("");
  const [classData, setClassData] = useState("");
  const [catalogStudent, setCatalogStudent] = useState([]);
  const [first, setFirst] = useState(false)

  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        // console.log(res)
        const institute = res.data.staff.institute;
        setCatalogIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {
        // console.log(res)
        const Cdata = res.data.classes;
        const studentData = res.data.classes.ApproveStudent;
        setClassData(Cdata);
        setCatalogStudent(studentData);
        setFirst(true)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);


  return (
    <>
        <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
                <UserStaffAboutSection sid={params.sid} uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar sid={params.sid} uid={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div className={styles.insTitle}>
                  <h3>{classData.className} Class Catalog</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  {/* <h4 className="my-3">Class Catalog</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-2">
                      <div className={`${styles.dTab} my-2`}>
                        <span>
                        <img src="/images/catalog-icon.svg" alt="Register" />
                          <p className={styles.ttext}>  &nbsp; Catalog </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/mark/attendence/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/s-attendence-icon.svg" title="Attendence"/> 
                          <p className={styles.ttext}> &nbsp; Attendence </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/fee/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/finance-icon.svg" title="Finance"/> 
                          <p className={styles.ttext}>  &nbsp; Fee </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/behaviour/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/behaviour-icon.svg" title="Behaviour"/>
                          <p className={styles.ttext}>  &nbsp; Behaviour </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/finalreport/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/final-report-icon.svg" title="Final Report"/>
                          <p className={styles.ttext}>  &nbsp; Final Report </p>
                        </span>
                      </div>
                      </div>
                    </div>
                    {/* <hr/> */}
                    <div className="row mt-4 mb-5">
                      <div className="col-12 col-md-8 mt-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search students here...."
                        />
                      </div>
                      <div className="col-12 col-md-4 mt-4">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/checklist/${params.cid}`
                            )
                          }
                        >
                          Checklist
                        </button>
                      </div>
                    </div>
                    <CataCard cataData={catalogStudent} first={first}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomUser uid={params.id} />
    </>
  );
};

export default ClassCatalog;
