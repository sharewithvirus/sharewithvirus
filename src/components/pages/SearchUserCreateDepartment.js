import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import AboutSection from "../AboutSection";
import InstituteSidebar from "../InstituteSidebar";
import ProfileDisplaySection from "../ProfileDiaplaySection";
import NewDetailsBar from "../NewDetailsBar";
import InstituteStatsSection from "../InstituteStatsSection";
import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";

const SearchUserCreateDepartment = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [createdepartmentData, setCreateDepartmentData] = useState([]);
  const [createdepartmentStaffData, setCreateDepartmentStaffData] =
    useState("");
  const [batchDataText, setBatchDataText] = useState("");
  useEffect(() => {
    axios
      .get(`${requestURL}/department/${params.did}`)
      .then((res) => {
        const depart = res.data.department;
        setCreateDepartmentData(depart);
        setCreateDepartmentStaffData(res.data.department.dHead);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [createdepartmentData]);

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.sid} />
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />

                <InstituteSidebar id={params.id} />
                <div className={styles.rightCols}>
                  <InstituteStatsSection />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection />
                  <NewDetailsBar dData={createdepartmentData} />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div className="col-4">
                        <div className={`${styles.dTab} `}>
                          <span>
                          <img src="/images/info-icon.svg" title="Info" />
                          </span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className={`${styles.dTab} ${styles.active} `}>
                          <span>
                          <img src="/images/class-icon.svg" title="Class" />
                          </span>
                        </div>
                      </div>

                      <div className="col-4">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                          onClick={() =>
                            navigate(
                              `/user/${params.sid}/${params.id}/currentbatch/${createdepartmentData._id}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/batch-icon.svg" title="Batch" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form className="row mt-0">
                    <div className="col-12 mb-4">
                      <label for="dhead" className="form-label">
                        Department Head
                      </label>
                      <input
                        type="text"
                        name="dhead"
                        className="form-control"
                        id="dhead"
                        value={
                          createdepartmentData.dHead
                            ? `${createdepartmentData.dHead.staffFirstName} ${
                                createdepartmentData.dHead.staffMiddleName
                                  ? createdepartmentData.dHead.staffMiddleName
                                  : ""
                              } ${createdepartmentData.dHead.staffLastName}`
                            : "Department Head"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="dname" className="form-label">
                        Department Name
                      </label>
                      <input
                        type="text"
                        name="dname"
                        className="form-control"
                        id="dname"
                        value={
                          createdepartmentData.dName
                            ? createdepartmentData.dName
                            : "Department Name"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="dabout" className="form-label">
                        About Department
                      </label>
                      <input
                        type="text"
                        name="dabout"
                        className="form-control"
                        id="dabout"
                        value={
                          createdepartmentData.dAbout
                            ? createdepartmentData.dAbout
                            : "About Department"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="demail" className="form-label">
                        Department Email
                      </label>
                      <input
                        type="email"
                        name="demail"
                        className="form-control"
                        id="demail"
                        value={
                          createdepartmentData.dEmail
                            ? createdepartmentData.dEmail
                            : "Department Email"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="dnumber" className="form-label">
                        Department Phone No.
                      </label>
                      <input
                        type="tel"
                        name="dnumber"
                        className="form-control"
                        id="dnumber"
                        value={
                          createdepartmentData.dPhoneNumber
                            ? createdepartmentData.dPhoneNumber
                            : "Department Phone Number"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="dvice" className="form-label">
                        Vice Principle Name
                      </label>
                      <input
                        type="tel"
                        name="dvice"
                        className="form-control"
                        id="dvice"
                        value={
                          createdepartmentData.dVicePrinciple
                            ? createdepartmentData.dVicePrinciple
                            : "Department Vice Principle"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="dspeaker" className="form-label">
                        Department Speaker
                      </label>
                      <input
                        type="tel"
                        name="dspeaker"
                        className="form-control"
                        id="dspeaker"
                        value={
                          createdepartmentData.dSpeaker
                            ? createdepartmentData.dSpeaker
                            : "Department Speaker"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="dstudent" className="form-label">
                        Student President Name
                      </label>
                      <input
                        type="tel"
                        name="dstudent"
                        className="form-control"
                        id="dstudent"
                        value={
                          createdepartmentData.dStudentPresident
                            ? createdepartmentData.dStudentPresident
                            : "Student President Name"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <label for="dadmin" className="form-label">
                        Admin / Clerk Name
                      </label>
                      <input
                        type="tel"
                        name="dadmin"
                        className="form-control"
                        id="dadmin"
                        value={
                          createdepartmentData.dAdminClerk
                            ? createdepartmentData.dAdminClerk
                            : "Admin / Clerk Name"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.sid} />
      </div>
    </>
  );
};

export default SearchUserCreateDepartment;
