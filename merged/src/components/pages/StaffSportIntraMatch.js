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

const StaffSportIntraMatch = () => {
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
      studentWinner: '',
      studentRunner: ''
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
    if(rank.studentWinner === rank.studentRunner){
        alert('Winner and Runner will not be the same')
    }
    else{
    axios.post(`${requestURL}/match/${params.mid}/update/individual`, rank)
    .then((res) =>{
        alert(res.data.message)
    })
    }
  }

  const [team, setTeam] = useState({
    teamWinner: '',
    teamRunner: ''
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
  if(team.teamWinner === team.teamRunner){
      alert('Winner and Runner will not be the same')
  }
  else{
  axios.post(`${requestURL}/match/${params.mid}/update/team`, team)
  .then((res) =>{
      alert(res.data.message)
  })
  }
}

const [studentFree, setStudentFree] = useState([])

function onSelect(selectedList, selectedItem) {
  setStudentFree(selectedList);
}

function onRemove(selectedList, removedItem) {
  setStudentFree(selectedList);

}

const [free, setFree] = useState({
    studentWinner: '',
    studentRunner: '',
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
  free.studentParticipants = studentFree
  if(free.studentWinner === free.studentRunner){
      alert('Winner and Runner will not be the same')
  }
  else{
  axios.post(`${requestURL}/match/${params.mid}/update/free`, free)
  .then((res) =>{
      alert(res.data.message)
  })
  }
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
                      <label htmlFor="pWinner" className="form-group">Select Winner 
                      {matchData && matchData.sportEventMatchCategoryLevel === 'Final Match' ? ` (Points - 25) ` : ''}
                      <span className={styles.requireField}>*</span></label>
                      <select
                        name="studentWinner"
                        className="form-control"
                        id="pWinner"
                        onChange={RankDataHandler}
                        required
                    >
                        <option value="Select Winner" selected disabled>
                        Select Winner
                        </option>
                        <option value={matchData.sportPlayer1._id}>{`${matchData.sportPlayer1.studentFirstName} ${matchData.sportPlayer1.studentMiddleName ? matchData.sportPlayer1.studentMiddleName : ''} ${matchData.sportPlayer1.studentLastName}`}</option>
                        <option value={matchData.sportPlayer2._id}>{`${matchData.sportPlayer2.studentFirstName} ${matchData.sportPlayer2.studentMiddleName ? matchData.sportPlayer2.studentMiddleName : ''} ${matchData.sportPlayer2.studentLastName}`}</option>
                    </select>
                      </div>
                      <div className="col-12 col-md-6  mt-2">
                      <label htmlFor="pRunner" className="form-group">Select Runner Up 
                      {matchData && matchData.sportEventMatchCategoryLevel === 'Final Match' ? ` (Points - 15) ` : ''}
                      <span className={styles.requireField}>*</span></label>
                      <select
                        name="studentRunner"
                        className="form-control"
                        id="pRunner"
                        onChange={RankDataHandler}
                        required
                    >
                        <option value="Select Runner up" selected disabled>
                        Select Runner up
                        </option>
                        <option value={matchData.sportPlayer1._id}>{`${matchData.sportPlayer1.studentFirstName} ${matchData.sportPlayer1.studentMiddleName ? matchData.sportPlayer1.studentMiddleName : ''} ${matchData.sportPlayer1.studentLastName}`}</option>
                        <option value={matchData.sportPlayer2._id}>{`${matchData.sportPlayer2.studentFirstName} ${matchData.sportPlayer2.studentMiddleName ? matchData.sportPlayer2.studentMiddleName : ''} ${matchData.sportPlayer2.studentLastName}`}</option>
                    </select>
                    </div>
                    <div className="col-12 mt-5">
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
                      <label htmlFor="tWinner" className="form-group">Select Winner Team 
                      {matchData && matchData.sportEventMatchCategoryLevel === 'Final Match' ? ` (Points - 25) ` : ''}
                      <span className={styles.requireField}>*</span></label>
                      <select
                        name="teamWinner"
                        className="form-control"
                        id="tWinner"
                        onChange={TeamDataHandler}
                        required
                    >
                        <option value="Select Winner Team" selected disabled>
                        Select Winner Team
                        </option>
                        <option value={matchData.sportTeam1._id}>{`${matchData.sportTeam1.sportClassTeamName}`}</option>
                        <option value={matchData.sportTeam2._id}>{`${matchData.sportTeam2.sportClassTeamName}`}</option>
                    </select>
                      </div>
                      <div className="col-12 col-md-6  mt-2">
                      <label htmlFor="tRunner" className="form-group">Select Runner Up Team 
                      {matchData && matchData.sportEventMatchCategoryLevel === 'Final Match' ? ` (Points - 15) ` : ''}
                      <span className={styles.requireField}>*</span></label>
                      <select
                        name="teamRunner"
                        className="form-control"
                        id="tRunner"
                        onChange={TeamDataHandler}
                        required
                    >
                        <option value="Select Runner Up Team" selected disabled>
                        Select Runner Up Team
                        </option>
                        <option value={matchData.sportTeam1._id}>{`${matchData.sportTeam1.sportClassTeamName}`}</option>
                        <option value={matchData.sportTeam2._id}>{`${matchData.sportTeam2.sportClassTeamName}`}</option>
                    </select>
                    </div>
                    <div className="col-12 mt-5">
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
                      <label htmlFor="fWinner" className="form-group">Select Winner 
                      {matchData && matchData.sportEventMatchCategoryLevel === 'Final Match' ? ` (Points - 25) ` : ''}
                      <span className={styles.requireField}>*</span></label>
                      <select
                        name="studentWinner"
                        className="form-control"
                        id="fWinner"
                        onChange={FreeDataHandler}
                        required
                    >
                        <option value="Select Winner" selected disabled>
                        Select Winner
                        </option>
                        {matchFree && matchFree.map((ct) => (
                            <option value={ct._id}>{`${ct.studentFirstName} ${ct.studentMiddleName ? ct.studentMiddleName : ''} ${ct.studentLastName}`}</option>
                        ))}                    
                        </select>
                      </div>
                      <div className="col-12 col-md-6  mt-2">
                      <label htmlFor="fRunner" className="form-group">Select Runner Up 
                      {matchData && matchData.sportEventMatchCategoryLevel === 'Final Match' ? ` (Points - 15) ` : ''}
                      <span className={styles.requireField}>*</span></label>
                      <select
                        name="studentRunner"
                        className="form-control"
                        id="fRunner"
                        onChange={FreeDataHandler}
                        required
                    >
                        <option value="Select Runner up" selected disabled>
                        Select Runner up
                        </option>
                        {matchFree && matchFree.map((ct) => (
                            <option value={ct._id}>{`${ct.studentFirstName} ${ct.studentMiddleName ? ct.studentMiddleName : ''} ${ct.studentLastName}`}</option>
                        ))}                    
                        </select>
                    </div>
                      <div className="col-12  mt-2">
                      <label htmlFor="fParticipants" className="form-group">Select Participants 
                      {matchData && matchData.sportEventMatchCategoryLevel === 'Final Match' ? ` (Points - 5) ` : ''}
                      <span className={styles.requireField}>*</span></label>
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

export default StaffSportIntraMatch;
