import React, { useState, useEffect } from "react";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Multiselect } from "multiselect-react-dropdown";

const NewTeamCard = (props) => {

  const [options, setOptions] = useState();

  useEffect(() => {
    axios.get(`${requestURL}/sport/class/detail/${props.sid}`)
      .then((res) => {
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
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [props.sid]);

  const [studentTeamData, setStudentTeamData] = useState([])

  function onSelect(selectedList, selectedItem) {
    setStudentTeamData(selectedList);
  }

  function onRemove(selectedList, removedItem) {
    setStudentTeamData(selectedList);

  }

  

  const [teamData, setTeamData] = useState({
    sportClassTeamName: '',
    sportStudentData: ''
  });

  const TeamDataHandler = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };

  const TeamDataHandlerChange = (e) => {
    e.preventDefault();
    teamData.sportStudentData = studentTeamData
    axios
      .post(
        `${requestURL}/sport/class/${props.sid ? props.sid : ''}/team`,
        teamData
      )
      .then((res) => {
        if (
          res.data.message
        ) {
          props.setAddClassFunction(false);
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
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="mb-2">Add Team</h4>
          <form onSubmit={TeamDataHandlerChange}>
            <div className="row my-2">
            <div className="col-12 mt-2">
            <label htmlFor="teamName" className="form-group mb-1">Enter Team Name
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="sportClassTeamName"
                className="form-control"
                id="teamName"
                placeholder="Enter Team Name " 
                onChange={TeamDataHandler}
                required
              />
            </div>
            <div className="col-12 mt-2">
            <label htmlFor="teamStudent" className="form-group mb-1">Select Student 
            <span className={styles.requireField}>*</span>
            </label>
            <Multiselect
                options={options}
                displayValue="studentName"
                placeholder="Select student"
                closeIcon="circle"
                onSelect={onSelect}
                onRemove={onRemove}
              />
              {/* <select
                name="sportStudentList"
                className="form-control"
                onChange={TeamDataHandler}
                required
                multiple
              >
                <option value="Select Student">
                  Select Student
                </option>
                {props.studentList && props.studentList.map((st) => (
                  <option value={st._id}>
                    {`${st.studentFirstName} ${st.studentMiddleName ? st.studentMiddleName : ''} ${st.studentLastName}`}
                  </option>
                ))}
              </select> */}
            </div>
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                <i class="fas fa-plus mt-1 mx-1"></i>Add Team
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

export default NewTeamCard;
