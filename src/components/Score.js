import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "./ReqUrl";
import axios from "axios";
import { Success } from "./SnackBar";
 
const Score = (props) => {
 const navigate = useNavigate();
 const params = useParams();
 
 const [subExamList, setSubExamList] = useState([]);
 const [activeExamData, setActiveExamData] = useState({
   examName: "Select Exam From Dropdown List",
   totalMarks: 0,
   examWeight: 0,
 });
 const [activeExamStatus, setActiveExamStatus] =useState(false)
 const [ activeExamSub, setActiveExamSub ] = useState([]);
 const [activeExamMarksStatus, setActiveExamMarksStatus] = useState([]);
 const [catalogStudent, setCatalogStudent] = useState([]);
 const [studentText, setStudentText] = useState({studentFirstName: "Select Student From Below"});
 const [showMsg, setShowMsg] = useState();
 
 const [studentMarksData, setStudentMarksData] = useState({
   examId: activeExamData._id,
   obtainedMarks: "",
   subjectMarksStatus: "Updated"
 });
 
 
 const handleInput = (e) => {
   setStudentMarksData({
     ...studentMarksData,
     [e.target.name]: e.target.value,
   });
 };
 
 
 
 function seExData(e) {
   const ex = e.target.value;
 
   axios
     .get(`${requestURL}/exam/${ex}`)
     .then((res) => {
       const examData = res.data.exam;
       setActiveExamData(examData);
       setActiveExamStatus(true);
      
       let activeExSubList = res.data.exam.subject;
       // console.log(activeExSubList)
       let curExamActiveSub = findSub(activeExSubList)
       setActiveExamSub(curExamActiveSub)
         console.log(curExamActiveSub)
         // console.log(props.subData.subjectMasterName)
 
       axios.get(`${requestURL}/subject-detail/${params.suid}`).then((res) => {
         setCatalogStudent(res.data.classData.ApproveStudent);
         console.log(res.data.classData.ApproveStudent)
       });
     })
     .catch((e) => {
       console.log("Something Went Wrong");
     });
 }
 
 function findSub(array) {
 
   let exam = array.find(e =>
     props.subData.subjectMasterName === e.subjectName._id
   )
   return exam
 }
 
 function findExam(stData) {
 
   let array = stData.studentMarks;
   console.log(array)
   // let exam = array.find(e =>
   //   props.subData.subjectMasterName === e.subjectName._id
   // )
   // return exam
 }
 
 // function checkActExStinEtu(examlist, activeEx ){
 
 //   // let examlist = ctdata1.studentMarks;
 //   let suId = activeEx;
 //   let exam = examlist.find(e =>
 //     suId === e.subjectName.subjects[0]
 //   )
 //   console.log(exam)
 // }
 
 const StudentHandler = (id) => {
   //    console.log(id)
   axios
     .post(`${requestURL}/student/status`, {
       studentId: id,
     })
     .then((res) => {
       setStudentText(res.data.student);
     })
     .catch((e) => {
       console.log("Something Went Wrong");
     });
 };
 
 const handleObtainedMarks = () => {
   console.log(studentMarksData, studentText._id, activeExamData._id);
   axios
     .post(
       `${requestURL}/student/${
         studentText._id ? studentText._id : ""
       }/marks/${activeExamData._id ? activeExamData._id : ""}/${
         activeExamSub.subjectName._id ? activeExamSub.subjectName._id : ""
       }`, studentMarksData
     )
     .then((res) => {
       if (
         res.data.message === "Successfully Marks Save" &&
         res.status === 200
        
       ) {
         setShowMsg(res.data.message)
         console.log(res.data.message);
         axios
         .get(`${requestURL}/subject-detail/${params.suid}`)
         .then((res) => {
           setCatalogStudent(res.data.classData.ApproveStudent);
           console.log(res.data.classData.ApproveStudent)
         });
 
       } else {
         alert("something went wrong");
       }
     })
     .catch((e) => {
       console.log("Something Went Wrong");
     });
 };
 
 useEffect(() => {
   axios
     .get(`${requestURL}/exam/subject/${params.suid}`)
     .then((res) => {
       setSubExamList(res.data.subExamList);
       // console.log(res.data.subExamList)
     })
     .catch((e) => {
       console.log("Something Went Wrong");
     });
 
 
 }, []);
 
 // useEffect(()=>{
 
 
 // }, []);
 
 return (
   <div>
   {showMsg ? <Success msg={showMsg} /> : null}
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
             {subExamList &&
               subExamList.map((ct) => (
                 <option value={ct._id}>
                   {ct.examName} - {ct.examType}
                 </option>
               ))}
           </select>
         </div>
       </div>
 
       <div className={styles.scoreGlobal}>
         <div className={styles.scoreContainer}>
           <div className={styles.scoreTop}>
             <h4>{activeExamData.examName}</h4>
             <div className={styles.scoreTech}>
               <h6>Total Marks: {activeExamSub.totalMarks}</h6>
               <h6>
                 Weightage in final report : {activeExamData.examWeight}%
               </h6>
             </div>
           </div>
       <form onSubmit={handleObtainedMarks} className="mt-2">
         <div className={styles.scoreTable}>
             <h5>GR No. {studentText.studentGRNO}</h5>
             <h5>
               {studentText.studentFirstName}{" "}
               {studentText.studentMiddleName} {studentText.studentLastName}
             </h5>
 
          
             <div className={styles.scoreLeftRight}>
               {/* <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i> */}
               <div className={styles.scoreNumber}>
                 <div className="col-12 mb-4 justify-items-center">
                   <label for="camount" className="form-group mx-1">
                     Enter Student Marks Obtained.
                   </label>
                   <input
                     type="number"
                     min="0"
                     maxLength={2}
                     onChange={handleInput}
                     // eslint-disable-next-line react/jsx-no-duplicate-props
                     max={activeExamSub.totalMarks}
                     name="obtainedMarks"
                     className="form-control c-amount"
                     id="camount"
                     placeholder="Enter Marks"
                     required
                   />
                 </div>
               </div>
               {/* <i class="fa fa-angle-right fa-2x" aria-hidden="true"></i> */}
             </div>
 
             <div className={styles.scoreAll}>
               {catalogStudent &&  activeExamStatus &&
                 catalogStudent.map((ct) =>
                   {
                     return ct.studentMarks.examMarksStatus &&
                       setActiveExamMarksStatus === "Updated" ? (
                       <div
                         className={styles.scoreUpdated}
                         onClick={() => {
                           StudentHandler(ct._id);
                         } }
                       >
                         <h5>{catalogStudent.indexOf(ct) + 1}</h5>
                       </div>
                     ) : (
                       <div
                         className={`bg-success ${styles.scoreEach}`}
                         onClick={() => {
                           StudentHandler(ct._id);
                         } }
                       >
                         <h5>{catalogStudent.indexOf(ct) + 1}</h5>
                       </div>
                     );
                   },
                  
                 )}
             </div>
           </div>
           <div className={styles.scoreGlobal}>
             <button
               type="submit"
               class="btn btn-outline-secondary"
               onClick={handleObtainedMarks}
             >
               Save
             </button>
           </div>
 
           </form>
         </div>
       </div>
     </div>
   </div>
 );
};
 
export default Score;