import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Multiselect } from "multiselect-react-dropdown";


const NewMatchCard = (props) => {
  const navigate = useNavigate()
  const params = useParams();

  const [studentList, setStudentList] = useState([])
  const [studentTeam, setStudentTeam] = useState([])
  const [options, setOptions] = useState();
  const [classData, setClassData] = useState('')

  const ClassStudentHandler = (e) =>{
    var id = e.target.value
    axios.get(`${requestURL}/sport/class/detail/${id ? id : ''}`)
    .then((res) =>{
      setClassData(res.data.classes)
      setStudentList(res.data.classes.sportStudent)
      setStudentTeam(res.data.classes.sportTeam)
      let data = res.data.classes.sportStudent
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
  }

    
  const [studentPlayerData, setStudentPlayerData] = useState([])

  function onSelect(selectedList, selectedItem) {
    setStudentPlayerData(selectedList);
  }

  function onRemove(selectedList, removedItem) {
    setStudentPlayerData(selectedList);

  }

  const [matchData, setMatchData] = useState({
    sportEventMatchName: '',
    sportEventMatchCategoryLevel: '',
    sportEventMatchClass: '',
    sportEventMatchCategory: '',
    sportEventMatchDate: '',
    sportInPlayer1: '',
    sportInPlayer2: '',
    sportTPlayer1: '',
    sportTPlayer2: '',
    sportPlayerFree: ''
  });

  if(matchData.sportEventMatchCategory === 'Individual'){
    const player1 = document.querySelector('.inplayer1')
    const player2 = document.querySelector('.inplayer2')
    const tplayer1 = document.querySelector('.tplayer1')
    const tplayer2 = document.querySelector('.tplayer2')
    const free = document.querySelector('.freePlayer')
    player1.style.display = 'block'
    player2.style.display = 'block'
    tplayer1.style.display = 'none'
    tplayer2.style.display = 'none'
    free.style.display = 'none'
  }
  else if(matchData.sportEventMatchCategory === 'Team'){
    const player1 = document.querySelector('.inplayer1')
    const player2 = document.querySelector('.inplayer2')
    const tplayer1 = document.querySelector('.tplayer1')
    const tplayer2 = document.querySelector('.tplayer2')
    const free = document.querySelector('.freePlayer')
    tplayer1.style.display = 'block'
    tplayer2.style.display = 'block'
    player1.style.display = 'none'
    player2.style.display = 'none'
    free.style.display = 'none'
  }
  else if(matchData.sportEventMatchCategory === 'Free'){
    const player1 = document.querySelector('.inplayer1')
    const player2 = document.querySelector('.inplayer2')
    const tplayer1 = document.querySelector('.tplayer1')
    const tplayer2 = document.querySelector('.tplayer2')
    const free = document.querySelector('.freePlayer')
    free.style.display = 'block'
    player1.style.display = 'none'
    player2.style.display = 'none'
    tplayer1.style.display = 'none'
    tplayer2.style.display = 'none'
  }

  const MatchDataHandler = (e) => {
    const { name, value } = e.target;
    setMatchData({
      ...matchData,
      [name]: value,
    });
  };

  const MatchDataHandlerChange = (e) => {
    e.preventDefault();
    matchData.sportPlayerFree = studentPlayerData
    matchData.sportEventMatchClass = classData ? classData._id : ''
    if((matchData.sportInPlayer1 && matchData.sportInPlayer2) && (matchData.sportInPlayer1 === matchData.sportInPlayer2)){
      alert('not same player')
    }
    if((matchData.sportTPlayer1 && matchData.sportTPlayer2) && (matchData.sportTPlayer1 === matchData.sportTPlayer2)){
      alert('not same team')
    }
    else{
      axios
      .post(
        `${requestURL}/event/${props.eid ? props.eid : ''}/match`,
        matchData
      )
      .then((res) => {
        if (
          res.data.message === "Match Created" &&
          res.status == 200
        ) {
          props.setAddClassFunction(false);
          navigate(`/user/${props.id ? props.id : ''}/staff/${props.sid ? props.sid : ''}/sport/${props.ssid ? props.ssid :''}`)
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    }
    
  };

  return props.trigger ? (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-7 col-md-6 col-lg-5 col-xl-5  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="mb-2">Add Match</h4>
          <form onSubmit={MatchDataHandlerChange}>
            <div className="row my-2">
            <div className="col-12 col-md-6 mt-2">
            <label htmlFor="matchName" className="form-group mb-1">Enter Match Name 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="sportEventMatchName"
                className="form-control"
                id="matchName"
                placeholder="Enter Match Name " 
                onChange={MatchDataHandler}
                required
              />
            </div>
            <div className="col-12 col-md-6 mt-2">
            <label htmlFor="matchTypes" className="form-group mb-1">Select Match Category 
            <span className={styles.requireField}>*</span>
            </label>
            <select
                name="sportEventMatchCategoryLevel"
                className="form-control"
                id="matchTypes"
                onChange={MatchDataHandler}
                required
              >
                <option value="Select Match Category" selected disabled>
                  Select Match Category
                </option>
                <option>Other Match</option>
                <option>Final Match</option>
              </select>
            </div>
            <div className="col-12 col-md-6 mt-2">
            <label htmlFor="matchClass" className="form-group mb-1">Select Classes 
            <span className={styles.requireField}>*</span>
            </label>
              <select
                name="sportEventMatchClass"
                className="form-control"
                id="matchClass"
                onChange={ClassStudentHandler}
                required
              >
                <option value="Select Classes" selected disabled>
                  Select Classes
                </option>
                {props.sportClassData && props.sportClassData.map((st) => (
                    <option value={st._id}>{st.sportClassName}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6 mt-2">
            <label htmlFor="matchType" className="form-group mb-1">Select Match Type 
            <span className={styles.requireField}>*</span>
            </label>
            <select
                name="sportEventMatchCategory"
                className="form-control"
                id="matchType"
                onChange={MatchDataHandler}
                required
              >
                <option value="Select Match Type" selected disabled>
                  Select Match Type
                </option>
                <option>Individual</option>
                <option>Team</option>
                <option>Free</option>
              </select>
            </div>
            {studentList ?
            <>
            <div className="col-12 col-md-6 mt-2 inplayer1" style={{display: 'none'}}>
            <label htmlFor="inPlayer1" className="form-group mb-1">Select Player 1 
            <span className={styles.requireField}>*</span>
            </label>
            <select
                name="sportInPlayer1"
                className="form-control"
                id="inPlayer1"
                onChange={MatchDataHandler}
                required
              >
                <option value="Select Player 1" selected disabled>
                  Select Player 1
                </option>
                {studentList && studentList.map((st) => (
                  <option value={st._id}>{`${st.studentFirstName} ${st.studentMiddleName ? st.studentMiddleName : ''} ${st.studentLastName}`}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6 mt-2 inplayer2" style={{display: 'none'}}>
            <label htmlFor="inPlayer2" className="form-group mb-1">Select Player 2 
            <span className={styles.requireField}>*</span>
            </label>
            <select
                name="sportInPlayer2"
                className="form-control"
                id="inPlayer2"
                onChange={MatchDataHandler}
                required
              >
                <option value="Select Player 2" selected disabled>
                  Select Player 2
                </option>
                {studentList && studentList.map((st) => (
                  <option value={st._id}>{`${st.studentFirstName} ${st.studentMiddleName ? st.studentMiddleName : ''} ${st.studentLastName}`}</option>
                ))}
              </select>
            </div>
            </>
            : ''}
            {studentTeam ? 
            <>
            <div className="col-12 col-md-6 mt-2 tplayer1" style={{display: 'none'}}>
            <label htmlFor="tPlayer1" className="form-group mb-1">Select Team 1 
            <span className={styles.requireField}>*</span>
            </label>
            <select
                name="sportTPlayer1"
                className="form-control"
                id="tPlayer1"
                onChange={MatchDataHandler}
                required
              >
                <option value="Select Team 1" selected disabled>
                  Select Team 1
                </option>
                {studentTeam && studentTeam.map((st) => (
                  <option value={st._id}>{`${st.sportClassTeamName} `}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6 mt-2 tplayer2" style={{display: 'none'}}>
            <label htmlFor="tPlayer2" className="form-group mb-1">Select Team 2 
            <span className={styles.requireField}>*</span>
            </label>
            <select
                name="sportTPlayer2"
                className="form-control"
                id="tPlayer2"
                onChange={MatchDataHandler}
                required
              >
                <option value="Select Team 2" selected disabled>
                  Select Team 2
                </option>
                {studentTeam && studentTeam.map((st) => (
                  <option value={st._id}>{`${st.sportClassTeamName} `}</option>
                ))}
              </select>
            </div>
            </>
            : ''}
            <div className="col-12 mt-2 freePlayer" style={{display: 'none'}}>
            <label htmlFor="freePlayer" className="form-group mb-1">Select Players 
            <span className={styles.requireField}>*</span>
            </label>
            <Multiselect
                options={options}
                displayValue="studentName"
                placeholder="Select Player"
                closeIcon="circle"
                onSelect={onSelect}
                onRemove={onRemove}
              />
            </div>
            <div className="col-12 col-md-6 mt-2">
            <label htmlFor="matchDate" className="form-group mb-1">Enter Match Date 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="date"
                name="sportEventMatchDate"
                className="form-control"
                id="matchDate"
                placeholder="Enter Event Date " 
                onChange={MatchDataHandler}
                required
              />
            </div>
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                <i class="fas fa-plus mt-1 mx-1"></i>Add Match
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default NewMatchCard;


{/* <input
  type="text"
  name="inPlayer1"
  className="form-control"
  placeholder="Enter Player 1 " 
  onChange={MatchDataHandler}
  required
/> */}

              {/* <input
                type="text"
                name="inPlayer2"
                className="form-control"
                placeholder="Enter Player 2 " 
                onChange={MatchDataHandler}
                required
              /> */}

                            {/* <input
                type="text"
                name="tPlayer1"
                className="form-control"
                placeholder="Enter Player Team 1 " 
                onChange={MatchDataHandler}
                required
              /> */}

                            {/* <input
                type="text"
                name="tPlayer2"
                className="form-control"
                placeholder="Enter Player Team 2 " 
                onChange={MatchDataHandler}
                required
              /> */}