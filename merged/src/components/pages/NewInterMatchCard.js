import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Multiselect } from "multiselect-react-dropdown";


const NewInterMatchCard = (props) => {
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
    sportPlayer: '',
    sportTeam: '',
    sportPlayerFree: ''
  });

  if(matchData.sportEventMatchCategory === 'Individual'){
    const player1 = document.querySelector('.inplayer1')
    const tplayer1 = document.querySelector('.tplayer1')
    const free = document.querySelector('.freePlayer')
    player1.style.display = 'block'
    tplayer1.style.display = 'none'
    free.style.display = 'none'
  }
  else if(matchData.sportEventMatchCategory === 'Team'){
    const player1 = document.querySelector('.inplayer1')
    const tplayer1 = document.querySelector('.tplayer1')
    const free = document.querySelector('.freePlayer')
    tplayer1.style.display = 'block'
    player1.style.display = 'none'
    free.style.display = 'none'
  }
  else if(matchData.sportEventMatchCategory === 'Free'){
    const player1 = document.querySelector('.inplayer1')
    const tplayer1 = document.querySelector('.tplayer1')
    const free = document.querySelector('.freePlayer')
    free.style.display = 'block'
    player1.style.display = 'none'
    tplayer1.style.display = 'none'
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
      axios
      .post(
        `${requestURL}/event/${props.eid ? props.eid : ''}/inter/match`,
        matchData
      )
      .then((res) => {
        if (
          res.data.message === "Match Created" &&
          res.status == 200
        ) {
          props.setMatchFunction(false);
          navigate(`/user/${props.id ? props.id : ''}/staff/${props.sid ? props.sid : ''}/sport/${props.ssid ? props.ssid :''}`)
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    
  };

  return props.trigger ? (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-7 col-md-6 col-lg-5 col-xl-5  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setMatchFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="mb-2">Add Inter Match</h4>
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
            <div className="col-12 mt-2 inplayer1" style={{display: 'none'}}>
            <label htmlFor="inPlayer1" className="form-group mb-1">Select Player
            <span className={styles.requireField}>*</span>
            </label>
            <select
                name="sportPlayer"
                className="form-control"
                id="inPlayer1"
                onChange={MatchDataHandler}
                required
              >
                <option value="Select Player" selected disabled>
                  Select Player
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
            <div className="col-12 mt-2 tplayer1" style={{display: 'none'}}>
            <label htmlFor="tPlayer" className="form-group mb-1">Select Team 
            <span className={styles.requireField}>*</span>
            </label>
            <select
                name="sportTeam"
                className="form-control"
                id="tPlayer"
                onChange={MatchDataHandler}
                required
              >
                <option value="Select Team" selected disabled>
                  Select Team
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
                <i class="fas fa-plus mt-1 mx-1"></i>Add Inter Match
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

export default NewInterMatchCard;
