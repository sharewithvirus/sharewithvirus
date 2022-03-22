import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDiaplaySection from "../ProfileDiaplaySection";
import NewStudentDetailBar from "../NewStudentDetailBar";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import UserStudentAboutSection from "../UserStudentAboutSection";

const ProfileInInstituteViewStudent = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [studentDesignation, setStudentDesignation] = useState([]);
  const [studentClassData, setStudentClassData] = useState("");
  const [studentIns, setStudentIns] = useState("");
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/studentdesignationdata/${params.sid}`)
      .then((res) => {
        const dStudent = res.data.student;
        const institute = res.data.student.institute;
        const classes = res.data.student.studentClass;
        setStudentDesignation(dStudent);
        setStudentIns(institute);
        setStudentClassData(classes);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const selectChange = (value) => {
    navigate(`/${value}`);
  };

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.iid} />
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                {/* <UserAboutSection uid={params.id} />  */}
                <UserStudentAboutSection sid={params.sid} />
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                  {studentIns && (
                    <p
                      className="text-white mx-2"
                      style={{
                        border: "1px solid grey",
                        cursor: "pointer",
                        padding: "4px",
                      }}
                    >
                      {studentIns.insName} (Student)
                    </p>
                  )}
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <h4>Profile In ({studentIns.insName})</h4>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDiaplaySection
                    profilePicSrc={
                      studentDesignation.photoId === "1"
                        ? "/images/image-boy2.png"
                        : first
                        ? `${requestURL}/search/insdashboard/studentdata/photo/${studentDesignation.studentProfilePhoto}`
                        : null
                    }
                  />
                  <NewStudentDetailBar
                    name={`${studentDesignation.studentFirstName} ${
                      studentDesignation.studentMiddleName
                        ? studentDesignation.studentMiddleName
                        : ""
                    } ${studentDesignation.studentLastName}`}
                    studentClass={studentClassData}
                    // staffSubject={staffSubjectData }
                    head1="Joining No."
                    body1={`${studentDesignation.studentCode}`}
                    head2="GR No."
                    body2="01"
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div className={`${styles.dTab}`}>
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />{" "}
                        </span>
                      </div>
                      <div
                        className={`${styles.dTab} ${styles.active}`}  
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <div className="col-12"></div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="afirstname" className="form-group mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="staffFirstName"
                        className="form-control"
                        id="afirstname"
                        value={studentDesignation.studentFirstName}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="amiddlename" className="form-group mb-2">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control"
                        id="amiddlename"
                        value={
                          studentDesignation.studentMiddleName
                            ? studentDesignation.studentMiddleName
                            : ""
                        }
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="alastname" className="form-group mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="staffLastName"
                        className="form-control"
                        id="alastname"
                        value={studentDesignation.studentLastName}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="adob" className="form-group mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        name="staffDOB"
                        className="form-control"
                        id="adob"
                        value={studentDesignation.studentDOB}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="agender" className="form-group mb-2">
                        Gender
                      </label>
                      <input
                        type="text"
                        name="staffDOB"
                        className="form-control"
                        id="agender"
                        value={studentDesignation.studentGender}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="anational" className="form-group mb-2">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="staffNationality"
                        className="form-control"
                        id="anational"
                        value={studentDesignation.studentNationality}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="aspeak" className="form-group mb-2">
                        Mother Tongue
                      </label>
                      <input
                        type="text"
                        name="staffNationality"
                        className="form-control"
                        id="aspeak"
                        value={studentDesignation.studentMTongue}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="acastcat" className="form-group mb-2">
                        Cast Category
                      </label>
                      <input
                        type="text"
                        name="staffNationality"
                        className="form-control"
                        id="acastcat"
                        value={studentDesignation.studentCastCategory}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="acast" className="form-group mb-2">
                        Cast
                      </label>
                      <input
                        type="text"
                        name="staffCast"
                        className="form-control"
                        id="acast"
                        value={studentDesignation.studentCast}
                        disabled
                        readonly
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="arel" className="form-group mb-2">
                        Religion
                      </label>
                      <input
                        type="text"
                        name="staffCast"
                        className="form-control"
                        id="arel"
                        value={studentDesignation.studentReligion}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="abirth" className="form-group mb-2">
                        Birth Place
                      </label>
                      <input
                        type="text"
                        name="staffBirthPlace"
                        className="form-control"
                        id="abirth"
                        value={studentDesignation.studentBirthPlace}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="adistrict" className="form-group mb-2">
                        District
                      </label>
                      <input
                        type="text"
                        name="staffDistrict"
                        className="form-control"
                        id="adistrict"
                        value={studentDesignation.studentDistrict}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="astate" className="form-group mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="staffState"
                        className="form-control"
                        id="astate"
                        value={studentDesignation.studentState}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="aaddress" className="form-group mb-2">
                        Address
                      </label>
                      <textarea
                        type="text"
                        name="staffAddress"
                        className="form-control"
                        rows="2"
                        cols="40"
                        id="aaddress"
                        value={studentDesignation.studentAddress}
                        disabled
                        readonly
                      ></textarea>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="phone" className="form-group mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="staffPhoneNumber"
                        className="form-control"
                        id="phone"
                        maxLength="10"
                        minLength="10"
                        value={studentDesignation.studentPhoneNumber}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="aadhar" className="form-group mb-2">
                        Aadhar Number
                      </label>
                      <input
                        type="tel"
                        name="staffAadharNumber"
                        className="form-control"
                        id="aadhar"
                        maxLength="12"
                        minLength="12"
                        value={studentDesignation.studentAadharNumber}
                        disabled
                        readonly
                      />
                    </div>
                    {/* <div className="col-12 mt-4">
                      <label htmlFor="aqual" className="form-group mb-2">
                        Qualification
                      </label>
                      <textarea
                        type="text"
                        name="staffQualification"
                        className="form-control"
                        rows="4"
                        cols="40"
                        id="aqual"
                        value={staffDesignation.staffQualification}                        
                      ></textarea>
                    </div> */}
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="attach" className="form-group mb-2">
                        Parents / Guardian Name
                      </label>
                      <input
                        type="text"
                        name="staffDocuments"
                        className="form-control"
                        id="attach"
                        value={studentDesignation.studentParentsName}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="atel" className="form-group mb-2">
                        Parents / Guardian Mobile No.
                      </label>
                      <input
                        type="text"
                        name="staffDocuments"
                        className="form-control"
                        id="atel"
                        value={studentDesignation.studentParentsPhoneNumber}
                        disabled
                        readonly
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.iid} />
      </div>
    </>
  );
};

export default ProfileInInstituteViewStudent;
