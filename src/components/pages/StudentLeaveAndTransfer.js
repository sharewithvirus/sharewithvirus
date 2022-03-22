import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import UserStaffAboutSection from "../UserStaffAboutSection";
import NavbarBottomUser from "../NavbarBottomUser";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";
import StudentLeaveRqst from "../StudentLeaveRqst";
import StudentTransferRqst from '../StudentTransferRqst'
import UserStaffSideBar from "../UserStaffSideBar";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const StudentLeaveAndTransfer = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [studentLeaveData, setStudentLeaveData] = useState([]);
  const [studentData, setStudentData] = useState([])
  const [studentTransferData, setStudentTransferData] = useState([])
  const [classData, setClassData] = useState("");
  useEffect(() => {
    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {
        setStudentLeaveData(res.data.classes.studentLeave);
        setStudentTransferData(res.data.classes.studentTransfer)
        setClassData(res.data.classes);
        setStudentData(res.data.classes.ApproveStaff)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [studentLeaveData]);
  // }, [classData]);

  return (
    <>
    <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
                <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
                <UserStaffAboutSection sid={params.sid} />
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
              <div className={`${styles.about}`}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                  <h3>{classData.className} Class Catalog</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  {/* <h4 className="my-3">Class Catalog</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/catalog/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/catalog-icon.svg" alt="Register" />
                          &nbsp; Catalog
                        </span>
                      </div>
                      <div className={`${styles.dTab} my-2`}>
                        <span>
                        <img src="/images/s-attendence-icon.svg" title="Attendence"/> 
                          &nbsp; Leave & Transfer
                        </span>
                      </div>
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
                          &nbsp; Fee
                        </span>
                      </div>
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
                          &nbsp; Behaviour
                        </span>
                      </div>
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
                          &nbsp; Final Report
                        </span>
                      </div>
                    </div>
                    <hr />
                    
                    <div className="row d-flex justify-content-between align-items-center mb-4">
                      <div
                        className={`col-6 col-xl-3 ${styles.barInnersLeft} ${styles.countSection}`}
                      >
                        <p>{studentLeaveData.length + studentTransferData.length}</p>
                        <p>Action Pending</p>
                      </div>
                    </div>
                    {studentLeaveData && (
                      <StudentLeaveRqst
                        reqData={studentLeaveData}
                        name="Staff Name"
                        // imgSrc="/images/image-staff.png"
                        cid={params.cid}
                      />
                    )}
                    {
                        studentTransferData ? 
                        <StudentTransferRqst 
                        reqData={studentTransferData}
                        studentDataList={studentData ? studentData : ''}
                        name="Staff Name"
                        // imgSrc="/images/image-staff.png"
                        cid={params.cid}
                        bid={classData ? classData.batch._id : ''}
                        did={classData ? classData.department._id : ''}
                        />
                        : ''
                    }

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

export default StudentLeaveAndTransfer;


