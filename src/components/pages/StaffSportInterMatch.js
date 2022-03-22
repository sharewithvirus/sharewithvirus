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
import { Multiselect } from "multiselect-react-dropdown";

const StaffSportInterMatch = () => {
  const navigate = useNavigate();
  const [matchData, setMatchData] = useState('')
  const [matchFree, setMatchFree] = useState([])
  const params = useParams();
  const [options, setOptions] = useState();

  useEffect(() => {
    axios.get(`${requestURL}/match/detail/${params.mid}`)
      .then((res) => {
         setMatchData(res.data.match)
         setMatchFree(res.data.match.sportFreePlayer)
         let data = res.data.match.sportFreePlayer
          const ListData = [];
  
          for (let i = 0; i < data.length; i++) {
            let student = {
              studentName: `${data[i].studentFirstName} ${data[i].studentLastName}`,
              studentId: `${data[i]._id}`,
            };
            ListData.push(student);
          }
          setOptions(ListData);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [params.mid, matchData]);

  const [rank, setRank] = useState({
      studentRankTitle: '',
      studentPlayer: '',
      studentOpponentPlayer: ''
  })

  const RankDataHandler = (e) =>{
    const { name, value } = e.target;
    setRank({
      ...rank,
      [name]: value,
    });
  }

  const RankDataHandlerChange = (e) =>{
    e.preventDefault()
    axios.post(`${requestURL}/match/${params.mid}/update/inter/individual`, rank)
    .then((res) =>{
        alert(res.data.message)
    })
  }

  const [team, setTeam] = useState({
    studentRankTitle: '',
    teamPlayer: '',
    teamOpponentPlayer: ''
})

const TeamDataHandler = (e) =>{
  const { name, value } = e.target;
  setTeam({
    ...team,
    [name]: value,
  });
}

const TeamDataHandlerChange = (e) =>{
  e.preventDefault()
  axios.post(`${requestURL}/match/${params.mid}/update/inter/team`, team)
  .then((res) =>{
      alert(res.data.message)
  })
}


  const [studentPlayerData, setStudentPlayerData] = useState([])

  function onSelect(selectedList, selectedItem) {
    setStudentPlayerData(selectedList);
  }

  function onRemove(selectedList, removedItem) {
    setStudentPlayerData(selectedList);

  }

const [free, setFree] = useState({
    studentRankTitle: '',
    studentPlayer: '',
    studentOpponentPlayer: '',
    studentParticipants: ''
})

const FreeDataHandler = (e) =>{
  const { name, value } = e.target;
  setFree({
    ...free,
    [name]: value,
  });
}

const FreeDataHandlerChange = (e) =>{
  e.preventDefault()
  free.studentParticipants = studentPlayerData
  axios.post(`${requestURL}/match/${params.mid}/update/inter/free`, free)
  .then((res) =>{
      alert(res.data.message)
  })
}

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
                    <h4 className="my-2">{matchData ? matchData.sportEventMatchName : ''}</h4>
                      <h5 className="my-2">{matchData ? matchData.sportEventMatchCategory : ''}</h5>
                {matchData.sportEventMatchCategory === 'Individual' ? 
                  <form className="row mt-5" onSubmit={RankDataHandlerChange}>
                    <div className="row d-flex justify-content-between">
                      <div className="col-12 col-md-6  mt-2">
                          <label htmlFor="rTitle" className="form-group">Rank Title
                          <span className={styles.requireField}>*</span>
                          </label>
                      <select
                        name="studentRankTitle"
                        id="rTitle"
                        className="form-control"
                        onChange={RankDataHandler}
                        required
                    >
                        <option value="Select Rank Title" selected disabled>
                        Select Rank Title
                        </option>
                        <option value="Winner">Winner</option>
                        <option value="Runner">Runner</option>
                    </select>
                      </div>
                      <div className="col-12 col-md-6  mt-2">
                          <label htmlFor="rPlayer" className="form-group">Select Player
                          <span className={styles.requireField}>*</span>
                          </label>
                      <select
                        name="studentPlayer"
                        className="form-control"
                        onChange={RankDataHandler}
                        id="rPlayer"
                        required
                    >
                        <option value="Select Player" selected disabled>
                        Select Player
                        </option>
                        <option value={matchData.sportPlayer1._id}>{`${matchData.sportPlayer1.studentFirstName} ${matchData.sportPlayer1.studentMiddleName ? matchData.sportPlayer1.studentMiddleName : ''} ${matchData.sportPlayer1.studentLastName}`}</option>
                    </select>
                      </div>
                      <div className="col-12 col-md-6  mt-2">
                      <label htmlFor="rRunnerPlayer" className="form-group">Enter Opponent Player Name
                      <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        name="studentOpponentPlayer"
                        id="rRunnerPlayer"
                        className="form-control"
                        onChange={RankDataHandler}
                        placeholder="Enter Opponent player name"
                        required
                    />
                    </div>
                    <div className="col-12 col-md-6 mt-5">
                        <button type="submit" className="btn btn-primary mx-auto px-5">
                            Complete Match
                        </button>
                    </div>
                    </div>
                  </form>
                  : 
                  matchData.sportEventMatchCategory === 'Team' ? 
                  <form className="row mt-5" onSubmit={TeamDataHandlerChange}>
                    <div className="row d-flex justify-content-between">
                    <div className="col-12 col-md-6  mt-2">
                          <label htmlFor="rTitle" className="form-group">Rank Title
                          <span className={styles.requireField}>*</span>
                          </label>
                      <select
                        name="studentRankTitle"
                        id="rTitle"
                        className="form-control"
                        onChange={TeamDataHandler}
                        required
                    >
                        <option value="Select Rank Title" selected disabled>
                        Select Rank Title
                        </option>
                        <option value="Winner">Winner</option>
                        <option value="Runner">Runner</option>
                    </select>
                      </div>
                      <div className="col-12 col-md-6  mt-2">
                      <label htmlFor="rTeam" className="form-group">Select Team
                      <span className={styles.requireField}>*</span>
                      </label>
                      <select
                        name="teamPlayer"
                        id="rTeam"
                        className="form-control"
                        onChange={TeamDataHandler}
                        required
                    >
                        <option value="Select Team" selected disabled>
                        Select Team
                        </option>
                        <option value={matchData.sportTeam1._id}>{`${matchData.sportTeam1.sportClassTeamName}`}</option>
                    </select>
                      </div>
                      <div className="col-12 col-md-6  mt-2">
                      <label htmlFor="rRunnerUp" className="form-group">Enter Opponent Team Name
                      <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        name="teamOpponentPlayer"
                        className="form-control"
                        id="rRunnerUp"
                        onChange={TeamDataHandler}
                        placeholder="Enter Opponent Team Name"
                        required
                    />
                    </div>
                    <div className="col-12 col-md-6 mt-5">
                        <button type="submit" className="btn btn-primary mx-auto px-5">
                            Complete Match
                        </button>
                    </div>
                    </div>
                  </form>
                  : 
                  matchData.sportEventMatchCategory === 'Free' ?
                  <form className="row mt-5" onSubmit={FreeDataHandlerChange}>
                    <div className="row d-flex justify-content-between">
                    <div className="col-12 col-md-6  mt-2">
                          <label htmlFor="rTitle" className="form-group">Rank Title
                          <span className={styles.requireField}>*</span>
                          </label>
                      <select
                        name="studentRankTitle"
                        id="rTitle"
                        className="form-control"
                        onChange={FreeDataHandler}
                        required
                    >
                        <option value="Select Rank Title" selected disabled>
                        Select Rank Title
                        </option>
                        <option value="Winner">Winner</option>
                        <option value="Runner">Runner</option>
                    </select>
                      </div>
                      <div className="col-12 col-md-6  mt-2">
                      <label htmlFor="rPlayers" className="form-group">Select Player
                      <span className={styles.requireField}>*</span>
                      </label>
                      <select
                        name="studentPlayer"
                        id="rPlayers"
                        className="form-control"
                        onChange={FreeDataHandler}
                        required
                    >
                        <option value="Select Player" selected disabled>
                        Select Player
                        </option>
                        {matchFree && matchFree.map((ct) => (
                            <option value={ct._id}>{`${ct.studentFirstName} ${ct.studentMiddleName ? ct.studentMiddleName : ''} ${ct.studentLastName}`}</option>
                        ))}                    
                        </select>
                      </div>
                      <div className="col-12 col-md-6  mt-2">
                      <label htmlFor="rRunners" className="form-group">Enter Opponent Player Name
                      <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        name="studentOpponentPlayer"
                        className="form-control"
                        id="rRunners"
                        onChange={FreeDataHandler}
                        placeholder="Enter Opponent Player Name"
                        required
                    />
                    </div>
                      <div className="col-12  mt-2">
                        <label htmlFor="rParticipants" className="form-group">Enter Participants
                        <span className={styles.requireField}>*</span>
                        </label>
                        <Multiselect
                            options={options}
                            displayValue="studentName"
                            placeholder="Select Participants"
                            closeIcon="circle"
                            onSelect={onSelect}
                            onRemove={onRemove}
                        />
                    </div>
                    <div className="col-12 mt-5">
                        <button type="submit" className="btn btn-primary mx-auto px-5">
                            Complete Match
                        </button>
                    </div>
                    </div>
                  </form>
                  : ''
                  }
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

export default StaffSportInterMatch;
