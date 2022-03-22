import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "./ReqUrl";
import axios from "axios";
import { Success } from "./SnackBar";
import { arrSum, round } from "./finalReportFormula";
import moment from "moment";

const StudentProgress = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [examDataList, setExamDataList] = useState([]);
  const [actExData, setActExData] = useState();
  const [report, setReport] = useState([]);
  const [reportTotal, setReportTotal] = useState({});

  function arryMacker(b) {
    let examDataSub = b[0].examId.subject;
    let examreportSub = b[0].subjectMarks;

    let arr = [];
    for (let i = 0; i < examreportSub.length; i++) {
      let NewObj = {
        subName: examreportSub[i].subjectName,
        subObtainMarks: examreportSub[i].obtainMarks,
        subTotalMarks: examDataSub[i].totalMarks,
        examTime: examDataSub[i].examTime,
        examDate: examDataSub[i].examDate,
      };
      arr.push(NewObj);
    }

    return arr;
  }

  function arrTotal(b) {
    let examDataSub = b[0].examId.subject;
    let examreportSub = b[0].subjectMarks;
    let examObtain = [];
    let examTotal = [];

    for (let i = 0; i < examreportSub.length; i++) {
      let o = examreportSub[i].obtainMarks;
      let t = examDataSub[i].totalMarks;
      examObtain.push(o);
      examTotal.push(t);
    }

    let obtain = arrSum(examObtain);
    let total = arrSum(examTotal);

    let newObj = {
      obtainTotal: obtain[0],
      totalTotal: total[0],
    };

    return newObj;
  }

  function seExData(e) {
    const ex = e.target.value;
    let finalExam = examDataList.filter((e) => {
      return e.examId._id === `${ex}`;
    });
    setActExData(finalExam);
    let d = arryMacker(finalExam);
    setReport(d);
    let t = arrTotal(finalExam);
    setReportTotal(t);
  }

  useEffect(() => {
    axios
      .get(
        `${requestURL}/studentdesignationdata/${
          props.studentId ? props.studentId : ""
        }`
      )
      .then((res) => {
        setExamDataList(res.data.student.studentMarks);
      })
      .catch((e) => {
        console.log(`Something Went Wrong , ${e}`);
      });
  }, [props.studentId]);

  return (
    <>
      {examDataList ? (
        <div>
          {/* {showMsg ? <Success msg={showMsg} /> : null} */}
          <div className="row ml-5">
            <div className={styles.scoreGlobal}>
              <div className={styles.scoreSelect}>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={seExData}
                  placeholder="Select Exam"
                >
                  <option hidden>Select Exam</option>
                  {examDataList &&
                    examDataList.map((ct) => (
                      <option value={ct.examId._id} key={ct.examId._id}>
                        {ct.examId.examName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className={styles.scoreGlobal}>
              <div className={styles.scoreContainer}>
                <div className={styles.scoreTop}>
                  {actExData ? <h4>{actExData[0].examId.examName}</h4> : ""}
                  <div className={styles.scoreTech}></div>
                </div>
                <div className={styles.examCardContainer}>
                  <table className={styles.attendenceTable}>
                    <thead>
                      <tr>
                        <th>Subjects</th>
                        <th>Obtain Marks</th>
                        <th>Total Marks</th>
                        <th>Exam Time</th>
                        <th>Exam Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {report
                        ? report.map((e) => (
                            <tr>
                              <td>{e.subName}</td>
                              <td>{round(e.subObtainMarks, 0)}</td>
                              <td>{round(e.subTotalMarks, 0)}</td>
                              <td>{e.examTime}</td>
                              <td>{moment(e.examDate).format("DD-MM-YYYY")}</td>
                            </tr>
                          ))
                        : ""}

                      {reportTotal ? (
                        <tr className={styles.activeRow}>
                          {console.log(reportTotal)}
                          <td>Total</td>
                          <td>{round(reportTotal.obtainTotal, 0)}</td>
                          <td>{round(reportTotal.totalTotal, 0)}</td>
                          <td>Exam Time</td>
                          <td>Exam Date</td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default StudentProgress;
