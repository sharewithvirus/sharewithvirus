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

const ProfileInInstituteStudentExtraMatch = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [studentDesignation, setStudentDesignation] = useState([]);
  const [studentClassData, setStudentClassData] = useState("");
  const [studentIns, setStudentIns] = useState("");
  const [matchData, setMatchData] = useState([])
  const [matchStudentData, setMatchStudentData] = useState([])

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
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

      axios.get(`${requestURL}/event/detail/${params.eid}`)
      .then((res) => {
          setMatchData(res.data.event.sportEventMatch)
        //   setMatchStudentData(res.data.event.sportEventMatch.sportEventMatchClass.sportStudent)
      })
      .catch((e) =>{
          console.log('something went wrong')
      })

  }, []);

//   console.log(matchStudentData)
  console.log(matchData)

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
                    {matchData && matchData.map((et) => (
                        et.sportEventMatchClass.sportStudent ? 
                        et.sportEventMatchClass.sportStudent.some((dt) => dt._id === params.sid) ?
                    <div className="col-12 col-md-4 mt-4">
                      <div className={` ${styles.dlogo} ${styles.cardView}`}>
                        <img
                          className={styles.dlogoImages}
                          src="https://w7.pngwing.com/pngs/14/191/png-transparent-animated-film-cartoon-graphic-design-design-team-public-relations-business-thumbnail.png"
                        />
                        <p className={styles.dlogoText}>
                          <small>{et.sportEventMatchName ? et.sportEventMatchName : 'Event Name'} </small>
                          <small>{et.sportEventMatchCategoryLevel ? ` (${et.sportEventMatchCategoryLevel})` : 'Category Level'}</small>
                        </p>
                        <p className={styles.dlogoText}>
                          <small>At - {et.sportEventMatchDate ? et.sportEventMatchDate : 'Date'}</small>
                          <small>{et.sportEventMatchCategory ? ` (${et.sportEventMatchCategory})` : 'Event Category'} </small>
                        </p>
                        {et.sportEventMatchCategory === 'Individual' ?
                        <p className={styles.dlogoText}>
                          <small>{et.sportWinner ? `Winner - ${et.sportWinner.studentFirstName} ${et.sportWinner.studentLastName}` : ''}</small><br/>
                          <small>{et.sportRunner ? `Runner - ${et.sportRunner.studentFirstName} ${et.sportRunner.studentLastName}` : ''} </small>
                        </p>
                        : 
                        et.sportEventMatchCategory === 'Team' ?
                        <p className={styles.dlogoText}>
                          <small>{et.sportWinnerTeam ? `Winner - ${et.sportWinnerTeam.sportClassTeamName}` : ''}</small><br/>
                          <small>{et.sportRunnerTeam ? `Runner - ${et.sportRunnerTeam.sportClassTeamName}` : ''} </small>
                        </p>
                        :
                        et.sportEventMatchCategory === 'Free' ?
                        <p className={styles.dlogoText}>
                          <small>{et.sportWinner ? `Winner - ${et.sportWinner.studentFirstName} ${et.sportWinner.studentLastName}` : ''}</small><br/>
                          <small>{et.sportRunner ? `Runner - ${et.sportRunner.studentFirstName} ${et.sportRunner.studentLastName}` : ''} </small>
                        </p>
                        : 
                        et.sportEvent.sportEventCategory === 'Inter/State/National' ?
                        <p className={styles.dlogoText}>
                          <small>{et.rankMatch ? `Status - ${et.rankMatch}` : ''}</small><br/>
                        </p>
                        : ''
                        }
                      </div>
                    </div>
                : 'You will not participated in this event'    
                : ''
                    ))}
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

export default ProfileInInstituteStudentExtraMatch;
