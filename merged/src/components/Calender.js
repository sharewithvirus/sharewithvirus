import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from 'react-router-dom';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import axios from "axios";
import { requestURL } from "./ReqUrl";

const Calendars = (props) => {
  const [dateState, setDateState] = useState(new Date());
  const [studentStatus, setStudentStatus] = useState("");
  const [studentData, setStudentData] = useState("");

  const changeDate = (e) => {
    axios
      .post(`${requestURL}/attendence/status/student/${props.studentId}`, {
        dateStatus: moment(e).format("YYYY-MM-DD"),
      })
      .then((res) => {
        setStudentStatus(res.data.status);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    setDateState(e);
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/studentdesignationdata${props.studentId}`)
      .then((res) => {
        setStudentData(res.data.student);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);
  // },[studentData])

  return (
    <>
      <h4 className="my-2">({moment(dateState).format("Do MMMM YYYY")})</h4>
      <div className="mx-5 my-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <Calendar value={dateState} onChange={changeDate} />
          </div>
          <div className="col-12 col-md-6">
            <div className="my-5">
              {studentStatus === "Not Marking" ? (
                <h4>
                  Attendence is <b>not marked</b> on that day
                </h4>
              ) : studentStatus === "Present" ? (
                <h4>
                  You will be marked as <b className="text-primary">Present</b>
                </h4>
              ) : (
                // !studentStatus ?
                // <h4>Their will be no attendence</h4> :
                <h4>
                  You will be marked as <b className="text-danger">Absent</b>
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendars;
