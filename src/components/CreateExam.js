import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ExamForm from "./ExamForm";
import { ExamRow, ExamTop } from "./EachRow";
import { requestURL } from "./ReqUrl";
import axios from "axios";

const CreateExam = (props) => {
  const params = useParams();
  const handleClick = (e) => {
    setOpenForm(true);
  };
  const [openForm, setOpenForm] = useState(false);
  const [data, setData] = useState({});
  const [examData, setexamData] = useState([



  ]);

  // const {
    // examName,
    // cid,
    // examDate,
    // suid,
    // examTime,
    // examType,
    // examWeight,
    // totalMarks,
  // } = examData;

  useEffect(() => {

    axios
      .get(`${requestURL}/exam/batch/${params.did}`)
      .then((res) => {
        const examData = res.data.exams;
        // setexamData(examData);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  return (
    <>
      {!openForm && (
        <>
          <>
          {examData &&
                  examData.map((st) => (
              <div className={styles.examCardContainer}>
                
                    <div className={styles.testSetCard}>
                      <ExamTop exam={st.examName} />
                      <ExamRow
                        exam={st.examName}
                        feild1="Class: "
                        value1={st.examForClass}
                        feild2="Total Marks: "
                        value2={st.totalMarks}
                      />
                      <ExamRow
                        exam={st.examName}
                        feild1="Subject: "
                        value1={st.subject.subjectName}
                        feild2="Mode: "
                        value2={st.examType}
                      />
                      <ExamRow
                        exam={st.examName}
                        feild1="Date: "
                        value1={st.examDate}
                        feild2="Time: "
                        value2={st.examTime}
                      />
                      <ExamRow
                        exam={st.examName}
                        feild1="Exam Weaght: "
                        value1={st.examWeight}
                      />
                    </div>
              </div>
                  ))}
          </>

          {/* Need to Change code here for Proper aigment */}
          <div className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-2 d-flex justify-content-center ${styles.examCardContainer}`}>
            <button
              type="submit"
              className="btn btn-success px-5 mx-5 mt-4"
              onClick={handleClick}
            >
              Create New Exam
            </button>
          </div>
        </>
      )}

      {openForm && (
        <ExamForm
          changeform={(w) => setOpenForm(w)}
          chnageData={(w) => setData(w)}
          BatchId={props.bid}
        />
      )}
    </>
  );
};

export default CreateExam;
