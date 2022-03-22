import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import UserStaffAboutSection from "../UserStaffAboutSection";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";
import NewMatchCard from './NewMatchCard'
import NewInterMatchCard from './NewInterMatchCard'
import UpdateMatchPopUp from '../UpdateMatchPopUp'

const StaffSportEventMatch = () => {
  const navigate = useNavigate();
  const [addClass, setAddClass] = useState(false);
  const [interMatch, setInterMatch] = useState(false);
  const [eventData, setEventData] = useState('')
  const [sportData, setSportData] = useState([])
  const [eventMatchData, setEventMatchData] = useState([])
  const [playEdit, setPlayEdit] = useState(false);
  const [matchDataId, setMatchDataId] = useState('')
  const params = useParams();

  useEffect(() => {
    axios.get(`${requestURL}/event/detail/${params.eid}`)
      .then((res) => {
         setEventData(res.data.event)
         setEventMatchData(res.data.event.sportEventMatch)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
      axios.get(`${requestURL}/sport/detail/${params.ssid}`)
      .then((res) => {
         setSportData(res.data.sport.sportClass)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [params.eid, params.ssid, eventData]);

  const setAddClassFunction = () => {
    setAddClass(false);
  };

  const setMatchFunction = () => {
    setInterMatch(false);
  };


  const playEditFunction = () => {
    setPlayEdit(false);
  };

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
                  <UserStaffSideBar />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}></div>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <form className="row mt-5">
                      <h4 className="my-2">{eventData ? eventData.sportEventName : 'Event'}</h4>
                    <div className="row d-flex justify-content-between">
                      <div className="col-6 col-lg-8  mb-2">
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          placeholder="Search Event Match"
                        />
                      </div>
                      {sportData && sportData.length >=1 ?
                      <div className="mb-3 col col-6 col-lg-4 d-flex justify-content-end">
                        {eventData.sportEventCategory === 'Intra' ?
                      <button
                          type="button"
                          className="btn btn-outline-primary "
                          onClick={() => {
                            setAddClass(true);
                          }}
                        >
                          <i class="far fa-plus-square mt-1 mx-2"></i> Add Match
                        </button>
                        : 
                        <button
                          type="button"
                          className="btn btn-outline-primary "
                          onClick={() => {
                            setInterMatch(true);
                          }}
                        >
                          <i class="far fa-plus-square mt-1 mx-2"></i> Add Inter Match
                        </button>
                        }
                      </div>
                      : ''}
                    </div>
                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                      {eventData.sportEventCategory === 'Intra' ?
                      eventMatchData &&
                        eventMatchData.map((st) => (
                          st.matchStatus === 'Completed' ? 
                          <div className={` ${styles.dlogo} ${styles.cardView}`}>

                          <img
                            src="/images/three-vertical-icon.svg"
                            alt="user"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Menu"
                            style={{
                              width: "2rem",
                              height: "3rem",
                              cursor: "Pointer",
                            }}
                            onClick={() => {
                              setPlayEdit(true)
                              setMatchDataId(st._id)
                            }}
                          />
                    { 
                            playEdit && 
                            <UpdateMatchPopUp 
                            key={matchDataId}
                            playEditFunction={playEditFunction}
                            setPlayEdit={setPlayEdit}
                            playEdit={playEdit}
                            eid={params.eid} 
                            matchId={matchDataId}
                            />
                           }

                            <img className={styles.dlogoImages} src="/images/logo-classroom.png" alt="classroom"/>
                            <p className={styles.dlogoText}>
                              <small>{st.sportEventMatchName ? `${st.sportEventMatchName} Match ` : ""}</small>
                              <small>{st.sportEventMatchCategory ? `(${st.sportEventMatchCategory})` : ""}</small>
                            </p>
                          </div>
                          : 
                          // st.sportEventMatchCategoryLevel === 'Final Match' ?
                          <div
                            className={` ${styles.dlogo} ${styles.cardView}`}
                          >

                          <img
                            src="/images/three-vertical-icon.svg"
                            alt="user"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Menu"
                            style={{
                              width: "2rem",
                              height: "3rem",
                              cursor: "Pointer",
                            }}
                            onClick={() => {
                              setPlayEdit(true)
                              setMatchDataId(st._id)
                            }}
                          />
                    { 
                            playEdit && 
                            <UpdateMatchPopUp 
                            key={matchDataId}
                            playEditFunction={playEditFunction}
                            setPlayEdit={setPlayEdit}
                            playEdit={playEdit}
                            eid={params.eid} 
                            matchId={matchDataId}
                            />
                           }


                            <img
                              className={styles.dlogoImages}
                              src="/images/logo-classroom.png"
                              alt="classroom"
                              onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/sport/${params.ssid}/event/${params.eid}/match/${st._id}`)}
                            />
                            <p className={styles.dlogoText}>
                              <small>
                                {st.sportEventMatchName ? `${st.sportEventMatchName} Match ` : ""}
                              </small>
                              <small>
                                {st.sportEventMatchCategory ? `(${st.sportEventMatchCategory})` : ""}
                              </small>
                            </p>
                          </div>
                          
                        )) : 
                        eventMatchData &&
                        eventMatchData.map((st) => (
                          st.matchStatus === 'Completed' ? 
                          <div className={` ${styles.dlogo} ${styles.cardView}`}>
                          <img
                          src="/images/three-vertical-icon.svg"
                          alt="user"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Menu"
                          style={{
                            width: "2rem",
                            height: "3rem",
                            cursor: "Pointer",
                          }}
                          onClick={() => {
                            setPlayEdit(true)
                            setMatchDataId(st._id)
                          }}
                        />
                  { 
                          playEdit && 
                          <UpdateMatchPopUp 
                          key={matchDataId}
                          playEditFunction={playEditFunction}
                          setPlayEdit={setPlayEdit}
                          playEdit={playEdit}
                          eid={params.eid} 
                          matchId={matchDataId}
                          />
                         }
                            <img className={styles.dlogoImages} src="/images/logo-classroom.png" alt="classroom"/>
                            <p className={styles.dlogoText}>
                              <small>{st.sportEventMatchName ? `${st.sportEventMatchName} Match ` : ""}</small>
                              <small>{st.sportEventMatchCategory ? `(${st.sportEventMatchCategory})` : ""}</small>
                            </p>
                          </div>
                          : 
                          // st.sportEventMatchCategoryLevel === 'Final Match' ?
                          <div
                            className={` ${styles.dlogo} ${styles.cardView}`}
                          >
                                                      <img
                            src="/images/three-vertical-icon.svg"
                            alt="user"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Menu"
                            style={{
                              width: "2rem",
                              height: "3rem",
                              cursor: "Pointer",
                            }}
                            onClick={() => {
                              setPlayEdit(true)
                              setMatchDataId(st._id)
                            }}
                          />
                    { 
                            playEdit && 
                            <UpdateMatchPopUp 
                            key={matchDataId}
                            playEditFunction={playEditFunction}
                            setPlayEdit={setPlayEdit}
                            playEdit={playEdit}
                            eid={params.eid} 
                            matchId={matchDataId}
                            />
                           }

                            <img
                              className={styles.dlogoImages}
                              src="/images/logo-classroom.png"
                              alt="classroom"
                              onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/sport/${params.ssid}/event/${params.eid}/inter/match/${st._id}`)}
                            />
                            <p className={styles.dlogoText}>
                              <small>
                                {st.sportEventMatchName ? `${st.sportEventMatchName} Match ` : ""}
                              </small>
                              <small>
                                {st.sportEventMatchCategory ? `(${st.sportEventMatchCategory})` : ""}
                              </small>
                            </p>
                          </div>
                        ))}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomUser uid={params.id} />
        <NewMatchCard
            setAddClassFunction={setAddClassFunction}
            trigger={addClass}
            setTrigger={setAddClass}
            eid={params.eid}
            sportClassData={sportData}
            id={params.id}
            sid={params.sid}
            ssid={params.ssid}
        />

          <NewInterMatchCard
            setMatchFunction={setMatchFunction}
            trigger={interMatch}
            setTrigger={setInterMatch}
            eid={params.eid}
            sportClassData={sportData}
            id={params.id}
            sid={params.sid}
            ssid={params.ssid}
        />
    </>
  );
};

export default StaffSportEventMatch;
