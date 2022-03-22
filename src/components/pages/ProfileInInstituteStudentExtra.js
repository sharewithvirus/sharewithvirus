import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewStudentDetailBar from "../NewStudentDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserAboutSection from "../UserAboutSection";
import UserStudentSideBar from "../UserStudentSideBar";
import InstituteRoleTab from "../InstituteRoleTab";

const ProfileInInstituteStudentExtra = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [studentDesignation, setStudentDesignation] = useState([]);
  const [studentClassData, setStudentClassData] = useState("");
  const [studentIns, setStudentIns] = useState("");
  const [eventData, setEventData] = useState([])

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
        setEventData(res.data.student.sportEvent)
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
                <UserAboutSection uid={params.id}/>
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
                  <UserStudentSideBar sid={params.sid} uid={params.id} data={studentClassData ? studentClassData : ''}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <h4>Profile In ({studentIns.insName})</h4>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection />
                  <NewStudentDetailBar
                    name={`${studentDesignation.studentFirstName} ${
                      studentDesignation.studentMiddleName
                        ? studentDesignation.studentMiddleName
                        : ""
                    } ${studentDesignation.studentLastName}`}
                    studentClass={studentClassData}
                    head1="Joining No."
                    body1={`${studentDesignation.studentCode}`}
                    head2="Extra-Curricular Points: "
                    body2={studentDesignation.extraPoints}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                  <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-12 col-md-6">                      
                    <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/student/profile/${params.sid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />{" "}
                        </span>
                      </div>
                      </div>
                    <div className="col-12 col-md-6">
                      <div className={`${styles.dTab}`}>
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <h4>Extra-Curricular</h4>
                    {eventData && eventData.map((et) => (
                    <div className="col-12 col-md-4 mt-4">
                    <Link to={`/user/${params.id}/student/profile/${params.sid}/extra/event/${et._id}`} style={{textDecoration: 'none'}}>
                      <div className={` ${styles.dlogo} ${styles.cardView}`}>
                        <img
                          className={styles.dlogoImages}
                          src="https://w7.pngwing.com/pngs/14/191/png-transparent-animated-film-cartoon-graphic-design-design-team-public-relations-business-thumbnail.png"
                        />
                        <p className={styles.dlogoText}>
                          <small>{et.sportEventName ? et.sportEventName : 'Event Name'} </small>
                          <small>At - {et.sportEventDate ? et.sportEventDate : 'Date'}</small>
                        </p>
                      </div>
                      </Link>
                    </div>
                    ))}
                    {/* <div className="col-12 col-md-4 mt-4">
                      <div className={` ${styles.dlogo} ${styles.cardView}`}>
                        <img
                          className={styles.dlogoImages}
                          src="https://w7.pngwing.com/pngs/14/191/png-transparent-animated-film-cartoon-graphic-design-design-team-public-relations-business-thumbnail.png"
                        />
                        <p className={styles.dlogoText}>
                          <small>Name of Event </small>
                          <small>At - 01-01-2022</small>
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <div className={` ${styles.dlogo} ${styles.cardView}`}>
                        <img
                          className={styles.dlogoImages}
                          src="https://w7.pngwing.com/pngs/14/191/png-transparent-animated-film-cartoon-graphic-design-design-team-public-relations-business-thumbnail.png"
                        />
                        <p className={styles.dlogoText}>
                          <small>Name of Event </small>
                          <small>At - 01-01-2022</small>
                        </p>
                      </div>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default ProfileInInstituteStudentExtra;
