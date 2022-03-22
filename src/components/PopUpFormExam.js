import React, { useState } from "react";
import styles from "./Home.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

const PopUpFormExam = (props) => {
  const [subData, setSubData] = useState({
    examSubId: "Subject",
    examSubName: "Subject",
    examSubDate: "DD/MM/YY",
    examSubTime: "HH/MM/AM/PM",
    examSubTotalMarks: "0",
  });

  const handleSubInput = (e) => {
    setSubData({ ...subData, [e.target.name]: e.target.value });
    console.log(subData);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    props.PopUp(false);
    props.addSubject(subData);
  };

  return (
    <>
      {/* ============================================================================== */}

      <div className={`${styles.popupbg}`}>
        <form className={`${styles.popUpExam}`} onSubmit={saveHandler}>
          <h3>Add Subject</h3>
          <div className="row">
            <div className="col-12 mt-3">
          <select
            class="form-select"
            aria-label="Default select example"
            name="examSubId"
            placeholder="Select Exam Mode"
            onChange={handleSubInput}
          >
            <option value="" disabled selected>
              Select Subject
            </option>
            {props.subData &&
              props.subData.map((st) => (
                <option value={st.subjectName}>{st.subjectName}</option>
              ))}
          </select>
          </div>
          <div className="col-12 col-md-6 mt-3">
          <input
            name="examSubDate"
            type="date"
            className="form-control"
            placeholder="Date"
            onChange={handleSubInput}
          />
          </div>
          <div className="col-12 col-md-6 mt-3">
          <input
            name="examSubTime"
            type="time"
            className="form-control"
            placeholder="Time"
            onChange={handleSubInput}
          />
          </div>
          <div className="col-12 col-md-6 mt-3">
          <input
            name="examSubTotalMarks"
            type="number"
            className="form-control"
            placeholder="Total Marks"
            min={0}
            onChange={handleSubInput}
          />
          </div>
          <div className="col-12 col-md-6 mt-3">
          <input type="submit" placeholder="Save" />
          </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PopUpFormExam;
