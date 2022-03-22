import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { passFailHandler, round } from "../finalReportFormula";
import Pdf from "react-to-pdf";
import moment from 'moment'


import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReportCardStyle from "../ReportCardStyle";
import ReportCardBothSideStyle from "../ReportCardBothSideStyle";

const ref = React.createRef();

const ReportCard = () => {
  const [date, setDate] = useState(new Date)

  const navigate = useNavigate();
  const params = useParams();

  const [studentText, setStudentText] = useState([]);
  const [instituteText, setInstituteText] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classTeacherText, setClassTeacherText] = useState(!!classData);
  
  const [finalReportTotalData, setFinalReportTotalData ] = useState([]);
  const [finalReportSubjectData, setFinalReportSubjectData ] = useState([]);
  const [stBehaviourData, setStBehaviourData] = useState([{
    bimprovements: "Improvments in Student",
    blackIn: "Lake in Something",
    bratings: "3",
}])


  useEffect(() => {

  axios
  .get(`${requestURL}/studentdetaildata/${params.suid}`)
  .then((res) => {
      const stdata = res.data.student;

      setStudentText(res.data.student);
      console.log(res.data.student)
      setStBehaviourData(res.data.behaviour)
 
  setFinalReportSubjectData(res.data.student.studentFinalReportData.SubjectWiseMarks);
  setFinalReportTotalData(res.data.student.studentFinalReportData)
  console.log(res.data.student.studentFinalReportData);
  })
  .catch((e) => {
      console.log("Something Went Wrong");
  });


    axios
        .get(`${requestURL}/class-detail/${params.cid}`)
        .then((res) => {
          setInstituteText(res.data.classData.institute)
          // setBatchText(res.data.classData.batch)
          setClassTeacherText(res.data.classData.classTeacher)
          setClassData(res.data.classData)
        console.log(res.data.classData)
        })
        .catch((e) => {
          console.log("Something Went Wrong");
      });
}, []);

let totalPersantage = "";
let resultFinal = "";
let rating = "";
let behav = "";


if(classData){

totalPersantage = round((Number(round(finalReportTotalData.FinalObtainMarksTotal, 1))/Number(round(finalReportTotalData.FinalTotalMarksTotal, 1)))*Number(100), 1);

resultFinal = passFailHandler(totalPersantage);
rating = stBehaviourData[0] ? stBehaviourData[0].bratings: "3" ;

switch (Number(rating)) {
        case 1:
            behav = "Very Bad";
        break;
        case 2:
            behav = "Bad";
        break;
        case 3:
            behav = "Good";
        break;
        case 4:
            behav = "Very Good";
        break;
        case 5:
            behav = "Excellent";
        break;

        // eslint-disable-next-line no-unused-expressions
        default: "Good";
    }

}


  return (
    <>

    
    {/* /* {classData ?  */}
    <div className={`col-md-5 mx-auto ${styles.report}`} style={{"width": "40%"}} ref={ref}>
      <div className={`mx-md-3`}>
        <div className={` row `} style={{height: "155px"}}>
          <div style={{ zIndex: "2" }} className={`my-5 col-sm-10 `}>
            <div className={`row d-flex justify-content-center`}>
              <div
                className={`col-sm-3 col-md-2 `}
                style={{ textAlign: "right" }}
              >
                <img
                  className={`${styles.schoolLogo}`}
                  src="https://image.shutterstock.com/image-vector/genuine-product-blue-emblem-geometric-260nw-1157999449.jpg"
                  alt="finalReportIns"

                />
              </div>
              <div
                className={`col-sm-9 col-md-7`}
                style={{ textAlign: "center" }}
              >
                <h3>{instituteText.insName}</h3>
                <p style={{ textAlign: "center" }}>
                  Village/Town, District - Pin code:- {instituteText.insPincode}
                </p>
              </div>
            </div>
            <div className="mx-5 row d-flex justify-content-center">
              <div className="col-md-8">
                <h6 style={{ textAglin: "left" }}>
                  Phone : {instituteText.insPhoneNumber}, Email : {instituteText.insEmail}
                </h6>
              </div>
            </div>
          </div>
          <div className={`col-sm-2 `}>
            <ReportCardStyle />
          </div>
        </div>
        <div
          style={{ textAlign: "left" }}
          className="col-sm-12 mx-1 offset-md-1"
        >
          <div className={`row my-3 my-md-5`} style={{ marginRight: "-25px" }}>
            <div className={`row my-2`}>
              <h4 className={`col-sm-6 ${styles.reportSomeColor1}`}>
                {studentText.studentFirstName} {studentText.studentMiddleName} {studentText.studentLastName}
              </h4>
              <h5 className={`col-sm-6`} id={styles.reportRoll}>
                Roll No. : {studentText.studentGRNO}
              </h5>
            </div>
            <div className={`row`}>
              <div className={`col-sm-8`}>
                <h5 className={`${styles.reportSomeColor1}`}>GR. No. : {studentText.studentGRNO}</h5>
                <h5>
                  <span
                    style={{ fontSize: "calc(1rem + .2vw)" }}
                    className={`${styles.reportSomeColor1}`}
                  >
                    Class Co-Ordinator :
                  </span>
                  {classTeacherText.staffFirstName} {classTeacherText.staffMiddleName} {classTeacherText.staffLastName}
                </h5>
              </div>
              <div className={`col-sm-4 `}>
                <ReportCardBothSideStyle classdData={classData ? classData : ''} />
              </div>
            </div>
          </div>
          <div className={`row`} style={{ marginRight: "-2px" }}>
            <div className={`col-sm-2 col-md-2 `}>
              <h6
                style={{ textAlign: "left" }}
                className={`py-2 px-md-2 px-sm-1  text-white ${styles.reportAttendance}`}
              >
                SUBJECT
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2  text-white ${styles.reportSomeColor}`}
              >
                FINAL
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportSomeColor}`}
              >
                OUT OF
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportSomeColor}`}
              >
                OTHER
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{
                  textAlign: "center",
                  zIndex: "2",
                  position: "relative",
                }}
                className={`py-2 text-white ${styles.reportSomeColor}`}
              >
                OUT OF
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2 `}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                TOTAL
              </h6>
            </div>
          </div>
          {finalReportSubjectData.map((val, index) => (
            <div
              key={index}
              className={`row`}
              style={{ marginRight: "-2px", marginBottom: "-10px" }}
            >
              <div className={`col-sm-2 col-md-2 `}>
                <h6
                  style={{ textAlign: "left" }}
                  className={`py-2 px-md-2 px-sm-2  text-grey ${
                    index % 2 === 0 ? styles.reportTable1 : styles.reportTable2
                  }`}
                >
                  {val.subName ? val.subName:"" }
                </h6>
              </div>
              <div className={`col-sm-2 col-md-2`}>
                <h6
                  style={{ textAlign: "center" }}
                  className={`py-2  text-grey ${
                    index % 2 === 0 ? styles.reportTable1 : styles.reportTable2
                  }`}
                >
                  {round(val.finalExamObtain, 0) ? round(val.finalExamObtain, 0): ""}
                </h6>
              </div>
              <div className={`col-sm-2 col-md-2`}>
                <h6
                  style={{ textAlign: "center" }}
                  className={`py-2 text-grey ${
                    index % 2 === 0 ? styles.reportTable1 : styles.reportTable2
                  }`}
                >
                  {round(val.finalExamTotal, 0) ? round(val.finalExamTotal, 0) : ""}
                </h6>
              </div>
              <div className={`col-sm-2 col-md-2`}>
                <h6
                  style={{ textAlign: "center" }}
                  className={`py-2 text-grey ${
                    index % 2 === 0 ? styles.reportTable1 : styles.reportTable2
                  }`}
                >
                  {round(val.otherExamObtain, 0)}
                </h6>
              </div>
              <div className={`col-sm-2 col-md-2`}>
                <h6
                  style={{ textAlign: "center" }}
                  className={`py-2 text-grey ${
                    index % 2 === 0 ? styles.reportTable1 : styles.reportTable2
                  }`}
                >
                  {round(val.otherExamTotal, 0)}
                </h6>
              </div>
              <div className={`col-sm-2 col-md-2 `}>
              {console.log(val.finalTotalTotal)}
              {val.finalTotalTotal === 100 ?
                <h6
                  style={{ textAlign: "center" }}
                  className={`py-2 text-grey ${
                    index % 2 === 0 ? styles.reportTable1 : styles.reportTable2
                  }`}
                >
                  {round(Number(val.finalObtainTotal), 0)}/{round(val.finalTotalTotal, 0)}
                </h6>
                :
                <h6
                  style={{ textAlign: "center" }}
                  className={`py-2 text-grey ${
                    index % 2 === 0 ? styles.reportTable1 : styles.reportTable2
                  }`}
                >
                {/* {round(Number(val.finalObtainTotal), 0)} */}
                  {(val.finalObtainTotal)}
                </h6>
              }
              </div>
            </div>
          ))}
          <div className={`row mt-3`} style={{ marginRight: "-2px" }}>
            <div className={`col-sm-2 col-md-2 `}>
              <h6
                style={{ textAlign: "left" }}
                className={`py-2 px-md-3 px-sm-1 text-white ${styles.reportAttendance}`}
              >
                Total
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                {round(finalReportTotalData.finalObtainTotal, 0)}
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                {round(finalReportTotalData.finalMarksTotalTotal, 0)}
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                {round(finalReportTotalData.OtherMarksObtainTotal, 0)}
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                {round(finalReportTotalData.OtherMarksTotalTotal, 0)}
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6 style={{ textAlign: "center" }} className={`py-2 text-white ${styles.reportAttendance}`} >
                {round(finalReportTotalData.FinalObtainMarksTotal, 0)}/{round(finalReportTotalData.FinalTotalMarksTotal, 0)}
              </h6>
            </div>
          </div>
          <div className={`row my-2`} style={{ marginRight: "-2px" }}>
            <div className={`col-sm-5 col-md-4`}>
              <h6
                style={{ textAlign: "left" }}
                className={`py-2 text-white px-md-3 px-sm-1 ${styles.reportSomeColor}`}
              >
                Percentage : {totalPersantage} %
              </h6>
            </div>
            <div className={`col-sm-7 col-md-8`}>
              <h6
                style={{ textAlign: "left" }}
                className={`py-2 text-white px-md-3 px-sm-1 ${styles.reportSomeColor}`}
              >
                Remark : {resultFinal}
              </h6>
            </div>
          </div>
          <div className={`row`} style={{ marginRight: "-2px" }}>
            <div className={`col-sm-5 col-md-4`}>
              <h6
                style={{ textAlign: "left" }}
                className={`py-2 text-white px-md-3 px-sm-1 ${styles.reportAttendance}`}
              >
                Extra-Curricular Points
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                0%
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                0/200
              </h6>
            </div>
            <div className={`col-sm-3 col-md-4 `}>
              <p style={{fontSize: "1rem" }}>
                Note : Not given by institute, Universal in all institutes by
                Qviple
              </p>
            </div>
          </div>
          <div className={`row`} style={{ marginRight: "-2px" }}>
            <div className={`col-sm-3 col-md-4`}>
              <h6
                style={{ textAlign: "left" }}
                className={`py-2 text-white  px-md-3 px-sm-1 ${styles.reportAttendance}`}
              >
                Attendance
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                0%
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                0/200
              </h6>
            </div>
            <div className={`col-sm-3 col-md-2`}>
              <h6
                style={{ textAlign: "left" }}
                className={`py-2 text-white px-md-3 px-sm-1 ${styles.reportAttendance}`}
              >
                Behavior
              </h6>
            </div>
            <div className={`col-sm-2 col-md-2`}>
              <h6
                style={{ textAlign: "center" }}
                className={`py-2 text-white ${styles.reportAttendance}`}
              >
                {behav}
              </h6>
            </div>
          </div>
          <div className={`row my-3 ${styles.reportBottom}`}>
            <div className={`col-sm-5 ${styles.reportBottomImprove}`}>
              <h5 className="mt-2" style={{ textAlign: "center" }}>
                {stBehaviourData[0] ? stBehaviourData[0].bimprovements : "Need Improvements" }
              </h5>
              {/* <p className={` ${styles.reportBottomLine}`}></p>
              <p className={`my-4 ${styles.reportBottomLine}`}></p>
              <p className={`${styles.reportBottomLine}`}></p> */}
            </div>
            <div className={`col-sm-5 ${styles.reportBottomLack}`}>
              <h5 className="mt-2" style={{ textAlign: "center" }}>
              {stBehaviourData[0] ? stBehaviourData[0].blackIn : "No Lackings"}
              </h5> 
              {/* <p className={` my-4 ${styles.reportBottomLine}`}></p>
              <p className={`${styles.reportBottomLine}`}></p>
              <p className={` my-4 ${styles.reportBottomLine}`}></p>
              <p className={`${styles.reportBottomLine}`}></p> */}
            </div>

            <div className={`row mb-3 ${styles.reportBottomDate}`}>
                <h6 className={`col-sm-5`} style={{ textAlign: "left" }}>
                  {moment(date).format("DD/MM/YYYY")} <br /> Date
                </h6>
                <h6 className={`col-sm-4`}>
                  {classTeacherText.staffFirstName} <br />{" "}
                  {classData.classTitle}
                </h6>
                <h6 className={`col-sm-3`} style={{ textAlign: "right" }}>
                  {instituteText.insPrinciple ? instituteText.insPrinciple : ""}
                  <br /> Principal
                </h6>
              </div>
          </div>
        </div>
        <div className={`row px-md-5`}>
          <p
            style={{ textAlign: "left" }}
            className={`col-sm-12 ${styles.reportBottomPara}`}
          >
            Note : Percentage ration for final and other marks in report is
            60:40.
          </p>
        </div>
      </div>
      <Pdf targetRef={ref} filename={`${studentText.studentFirstName}-report.pdf`}>
        {({ toPdf }) => (
          <button
            type="button"
            className="btn btn-outline-danger btn-sm my-5 px-5 mx-auto"
            onClick={toPdf}
          >
            Download Pdf
          </button>
        )}
      </Pdf>
    </div>
    {/* :""} */}
    </>
  );
};

export default ReportCard;
