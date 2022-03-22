import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewStaffDetailBar from "../NewStaffDetailBar";
// import UserAboutSection from "../UserAboutSection";
import axios from "axios";
import { requestURL } from "../ReqUrl";
// import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import UserStaffSideBar from "../UserStaffSideBar";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import UserStaffAboutSection from "../UserStaffAboutSection";
const ProfileInInstituteViewStaff = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [staffDesignation, setStaffDesignation] = useState([]);
  const [first, setFirst] = useState(false);
  const [staffDepartmentData, setStaffDepartmentData] = useState([]);
  const [staffClassData, setStaffClassData] = useState([]);
  const [staffSubjectData, setStaffSubjectData] = useState([]);
  const [staffIns, setStaffIns] = useState("");

  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const dStaff = res.data.staff;
        const institute = res.data.staff.institute;
        const department = res.data.staff.staffDepartment;
        const classes = res.data.staff.staffClass;
        const subject = res.data.staff.staffSubject;
        setStaffDesignation(dStaff);
        setStaffIns(institute);
        setStaffDepartmentData(department);
        setStaffClassData(classes);
        setStaffSubjectData(subject);
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
                {/* <UserAboutSection uid={params.id} /> */}
                <UserStaffAboutSection sid={params.sid} />
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                  {staffIns && (
                    <p
                      className="text-white mx-2"
                      style={{
                        border: "1px solid grey",
                        cursor: "pointer",
                        padding: "4px",
                      }}
                    >
                      {staffIns.insName} ( Staff )
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
                {/* <BackButton /> */}
                {/* <StaffSelectInstituteRole id={params.id} sid={params.sid} /> */}
                <h4>Profile In ({staffIns.insName}) </h4>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection
                    profilePicSrc={
                      staffDesignation.photoId === "1"
                        ? "/images/image-boy2.png"
                        : first
                        ? `${requestURL}/search/insdashboard/staffdata/photo/${staffDesignation.staffProfilePhoto}`
                        : null
                    }
                  />
                  <NewStaffDetailBar
                    name={`${staffDesignation.staffFirstName} ${
                      staffDesignation.staffMiddleName
                        ? staffDesignation.staffMiddleName
                        : ""
                    } ${staffDesignation.staffLastName}`}
                    // sFirst="Class"
                    // sFirstCount={12}
                    // sSecond="Students"
                    // SSecondCount={500}
                    staffDepart={staffDepartmentData}
                    staffClass={staffClassData}
                    staffSubject={staffSubjectData}
                    head1="Joining No."
                    body1={`${staffDesignation.staffCode}`}
                    head2="Roll No."
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
                        // onClick={() =>
                        //   navigate(
                        //     `/user/${params.id}/staff/profile/attendence/${params.sid}`
                        //   )
                        // }
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      {/* <div
                        className={`${styles.dTab} ${styles.active}`}
                      >
                        <span>
                          <img src="/images/icon-classroom.svg" alt="class" />
                        </span>
                      </div> */}
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
                        value={staffDesignation.staffFirstName}
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
                          staffDesignation.staffMiddleName
                            ? staffDesignation.staffMiddleName
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
                        value={staffDesignation.staffLastName}
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
                        value={staffDesignation.staffDOB}
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
                        value={staffDesignation.staffGender}
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
                        value={staffDesignation.staffNationality}
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
                        value={staffDesignation.staffMTongue}
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
                        value={staffDesignation.staffCastCategory}
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
                        disabled
                        readonly
                        value={staffDesignation.staffCast}
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
                        value={staffDesignation.staffReligion}
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
                        value={staffDesignation.staffBirthPlace}
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
                        value={staffDesignation.staffDistrict}
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
                        value={staffDesignation.staffState}
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
                        value={staffDesignation.staffAddress}
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
                        value={staffDesignation.staffPhoneNumber}
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
                        value={staffDesignation.staffAadharNumber}
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="aqual" className="form-group mb-2">
                        Qualification
                      </label>
                      <textarea
                        type="text"
                        name="staffQualification"
                        className="form-control"
                        rows="2"
                        cols="40"
                        id="aqual"
                        value={staffDesignation.staffQualification}
                        disabled
                        readonly
                      ></textarea>
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

export default ProfileInInstituteViewStaff;
