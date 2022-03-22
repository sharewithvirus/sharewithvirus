import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import UserAboutSection from "../UserAboutSection";
import { Link } from "react-router-dom";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewStaffDetailBar from "../NewStaffDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import StaffCalendar from "../StaffCalendar";
import { requestURL } from "../ReqUrl";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import UserStaffSideBar from "../UserStaffSideBar";
import InstituteRoleTab from "../InstituteRoleTab";

const ProfileInInstituteStaffAttendence = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [staffDesignation, setStaffDesignation] = useState([]);
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
        <NavbarTopUser uid={params.id} />
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
                <UserAboutSection uid={params.id} uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                  <div className={`text-center mx-auto`}>
                  <button type="button" className="btn btn-primary mx-auto text-white px-5">
                  <Link to={(-1)} style={{color: 'white', textDecoration: 'none'}}>
                    View Dashboard
                  </Link>
                  </button>
                </div>
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar sid={params.sid} uid={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <h4>Profile In ({staffIns.insName}) </h4>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection />
                  <NewStaffDetailBar
                    name={`${staffDesignation.staffFirstName} ${
                      staffDesignation.staffMiddleName
                        ? staffDesignation.staffMiddleName
                        : ""
                    } ${staffDesignation.staffLastName}`}
                    staffDepart={staffDepartmentData}
                    staffClass={staffClassData}
                    staffSubject={staffSubjectData}
                    head1="Joining No."
                    body1={`${staffDesignation.staffCode}`}
                    head2="Roll No."
                    body2="01"
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-12 col-md-6">
                      <div className={`${styles.dTab} ${styles.active}`}
                      onClick={() =>
                        navigate(
                          `/user/${params.id}/staff/profile/${params.sid}`
                        )
                      }
                      >
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />{" "}
                        </span>
                      </div>
                      </div>
                      <div className="col-12 col-md-6">
                      <div
                        className={`${styles.dTab}`}
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <StaffCalendar staffId={params.sid} />
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default ProfileInInstituteStaffAttendence;
