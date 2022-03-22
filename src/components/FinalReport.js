import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from './Home.module.css';
import style from './Navbar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
 
import axios from "axios";
import { requestURL } from "./ReqUrl";
import {  
 
   arrMacker,
   passFailHandler,
   subWiseExamFilter,
   examTotalObtainMarks,
   examTotalMarks,
   otherExamTotalObtainMarks,
   otherExamTotalMarks,
   finalExamTotalObtainMarks,
   finalExamTotalMarks,
   arrSum,
   round,
 
 
} from "./finalReportFormula";
 
 
const FinalReport = () =>{
  
  
   const navigate = useNavigate()
   const params = useParams()
 
   // const [catalogStudent, setCatalogStudent] = useState([])
   const [studentText, setStudentText] = useState([])
   const [examList, setExamList] = useState([])
   const [classSub, setClassSub] = useState([])
   const [marksTotal, setMarksTotal] = useState([])
   const [stBehaviourData, setStBehaviourData] = useState([{
       bimprovements: "Improvments in Student",
       blackIn: "Lake in Something",
       bratings: "3",
   }])
 
 
 
   const [catalogStudent, setCatalogStudent] = useState([0])
   const [pageNumber, setPageNumber] = useState(0);
   const studentPerPage = 5;
   const pageVisited = pageNumber*studentPerPage;
 
   // let studentSub = studentText
 
 
   let totalPersantage = round((Number(round(marksTotal.finalToObtain, 0))/Number(round(marksTotal.finalToTo, 0)))*Number(100), 1);
 
 
   let resultFinal = passFailHandler(totalPersantage);
 
   let rating = stBehaviourData[0] ? stBehaviourData[0].bratings: "3" ;
   let behav
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
 
   function reportFinilized(id, examList, marksTotal, stBehaviourData){
 
       console.log(examList);
       console.log(marksTotal);
       console.log(stBehaviourData)
       axios
       .post(`${requestURL}/student/report/finilized/${id}`, {examList, marksTotal, stBehaviourData} )
       .then((res) => {
 
           console.log(res.data.message)
       })
       .catch((e) => {
           console.log("Something Went Wrong");
       });
 
   }
 
   const StudentHandler = (id) => {
 
       axios
       .get(`${requestURL}/studentdetaildata/${id}`)
       .then((res) => {
           const stdata = res.data.student;
 
           setStudentText(stdata);
           console.log(stdata)
 
           const finalScoreList = finalScoreMacker(stdata)
           setMarksTotal(examTotal(finalScoreList))
           setStBehaviourData(res.data.behaviour)
 
           // console.log(examTotal1)
           setExamList(finalScoreList)
       })
       .catch((e) => {
           console.log("Something Went Wrong");
       });
   };
 
   function finalScoreMacker(student){
 
       let examMarksList = student.studentMarks
 
       let finalExam = examMarksList.filter((e)=>{ return e.examId.examType === "Final Exam" });
       let otherExam = examMarksList.filter((e)=>{ return e.examId.examType === "Other Exam" });
 
       let finalSubjectarry = examArrMacker(finalExam)
       let otherSubjectarry = examArrMacker(otherExam)
 
 
      
       let otherExamSubArr = [];
 
       for (let i = 0; i < classSub.length; i++) {
           let subfilter = subwiseFilter(otherSubjectarry, classSub[i].subjectName )
           otherExamSubArr.push (subfilter)
       }
 
       // Subject Wise Other Exam Total Marks
       let examObtainMarksTotal = []
       let examTotalMarksTotal = []
 
       for (let i = 0; i < otherExamSubArr.length; i++) {
 
           let examObtainMarksTotal2 = []
           let examTotalMarksTotal2 = []
 
           for (let j = 0; j < otherExamSubArr[i].length; j++) {
 
               examObtainMarksTotal2.push(otherExamSubArr[i][j].obtainMarks)
               examTotalMarksTotal2.push(otherExamSubArr[i][j].totalMarks)
              
           }
           let sum1 = arrSum(examObtainMarksTotal2)
           let sum2 = arrSum(examTotalMarksTotal2)
           examObtainMarksTotal.push(sum1)
           examTotalMarksTotal.push(sum2)
       }
      
       // Other Exam Total Marks
 
       let oArr = [];
       for (let i = 0; i < otherExamSubArr.length; i++) {
           // console.log(otherExamSubArr);
           let obj = [];
 
           for (let j = 0; j < otherExamSubArr[i].length; j++) {
               let total = (otherExamSubArr[i][j].obtainMarks/otherExamSubArr[i][j].totalMarks)*otherExamSubArr[i][j].examWeight
               // console.log(total)
               obj.push(total)
           }
           oArr.push(obj)
       }
           // Arry Sum
       let otherTotalMarksAddinFinalTotal = [];
           for (let i = 0; i < oArr.length; i++) {
              
               let d = arrSum(oArr[i])
               otherTotalMarksAddinFinalTotal.push(d)
           }
      
       // final Exam Total add in Final Total
 
       // Other Exam Total Weight
           // otherExamSubArr
 
           let examWeightTotal = []
 
           for (let j = 0; j < otherExamSubArr[0].length; j++) {
 
               examWeightTotal.push(otherExamSubArr[0][j].examWeight)
              
           }
 
           let otherExamTotalWeight = arrSum(examWeightTotal)
 
           let finalExamTotalWeight = 100-otherExamTotalWeight;
 
 
 
       // finalSubjectarry :- Final Exam marks Arry
 
       let jArr = [];
       for (let i = 0; i < finalSubjectarry.length; i++) {
 
               let total = (finalSubjectarry[i].obtainMarks/finalSubjectarry[i].totalMarks)*finalExamTotalWeight;
 
               jArr.push(total)
      
       }
 
 
       // Final Total Subjectwise Final Total
       let finalTotal = [];
       for (let i = 0; i < jArr.length; i++) {
           let c = jArr[i]+otherTotalMarksAddinFinalTotal[i][0]
           finalTotal.push(c);
       }
 
       // Final Arr Macker
 
       let finalArr = [];
 
       for (let i = 0; i < classSub.length; i++) {
 
           let newObj = {
               subName: finalSubjectarry[i].subjectName,
               finalExamObtainMarks: finalSubjectarry[i].obtainMarks,
               finalExamTotalMarks: finalSubjectarry[i].totalMarks,
               OtherExamTotalObtainMarks: examObtainMarksTotal[i][0],
               OtherExamTotalMarks: examTotalMarksTotal[i][0],
               finalObtainTotal: finalTotal[i],
               finalTotalTotal: 100,
           }
           finalArr.push(newObj);
       }
       return finalArr;
   }
 
   function examArrMacker(arry){
 
       let allexamSubData = []
       for (let i = 0; i < arry.length; i++) {
          
           let finalExSubWiseList = arry[i].subjectMarks
               for (let j = 0; j < finalExSubWiseList.length; j++) {
                  
                   let arryObj = {
                       subjectName: finalExSubWiseList[j].subjectName.subjectName,
                       obtainMarks: finalExSubWiseList[j].obtainMarks,
                       totalMarks: arry[i].examId.subject[j].totalMarks,
                       subjectMarksStatus: finalExSubWiseList[j].subjectMarksStatus,
                       examWeight: arry[i].examWeight,
                   }
                   allexamSubData.push(arryObj)
               }
       }
       return allexamSubData
       }
 
   function subwiseFilter (arry, value ){
 
       let filterex = arry.filter((e)=> { return e.subjectName === value });
       return filterex
   }
   function examTotal(el){
 
       let finalExObtainList = [];
       let finalExTotalList = [];
       let otherExObtainList = [];
       let otherExTotalList = [];
       let finalTotalObtain = [];
       let finalTotalTotal = [];
 
       for (let i = 0; i < el.length; i++) {
      
           let d = el[i].finalExamObtainMarks;
           let e = el[i].finalExamTotalMarks;
           let f = el[i].OtherExamTotalObtainMarks;
           let g = el[i].OtherExamTotalMarks;
           let h = el[i].finalObtainTotal;
           let j = el[i].finalTotalTotal;
 
           finalExObtainList.push(d)
           finalExTotalList.push(e)
           otherExObtainList.push(f)
           otherExTotalList.push(g)
           finalTotalObtain.push(h)
           finalTotalTotal.push(j)
       }
 
       let ab = arrSum(finalExObtainList);
       let bc = arrSum(finalExTotalList);
       let cd = arrSum(otherExObtainList);
       let de = arrSum(otherExTotalList);
       let ef = arrSum(finalTotalObtain);
       let fg = arrSum(finalTotalTotal);
 
      
       let newObj = {
           finalExToObtain: ab[0],
           finalExToTo: bc[0],
           otherExObtain: cd[0],
           otherExToTo: de[0],
           finalToObtain: ef[0],
           finalToTo: fg[0],
       }
       return newObj;
   }
 
 
 
 
   const displayStudents = catalogStudent.slice(pageVisited, pageVisited+studentPerPage).map((ct)=>{
       return (
           <div className={styles.eachRollno}
           onClick = {() => {StudentHandler(ct._id)}}
           >
               <h6>{catalogStudent.length-1}</h6>
           </div>
       )
   })
 
   const pageCount = Math.ceil(catalogStudent.length/studentPerPage);
   const changePage = (({selected})=>{
       setPageNumber(selected)
   })
 
   useEffect(() =>{
       axios
       .get(`${requestURL}/class-detail/${params.cid}`)
       .then((res) => {
       setCatalogStudent(res.data.classData.ApproveStudent)
       setClassSub(res.data.classData.subject)
       })  
   }, [])
 
 
 
 
   return (       
       <div>
          
       <div className="row ml-5">
                  
                   <div className={styles.paginationContainer}>
                       <div className={styles.paginatedRollNo}>
                               <div className={styles.scoreAll}>
                                   {catalogStudent &&
                                       catalogStudent.map((ct) => (
                                           <>
                                           {ct.studentFinalReportFinalizedStatus === "Ready" ?
                                          
                                               <div className={styles.scoreUpdated} onClick = {() => {StudentHandler(ct._id)}}>
                                                   <h5>{catalogStudent.indexOf(ct)+1}</h5>
                                               </div>
                                               :ct.studentFinalReportFinalizedStatus === "Finalized" ?
                                               <div className={`bg-primary ${styles.scoreEach}`} onClick = {() => {StudentHandler(ct._id)}}>
                                                   <h5>{catalogStudent.indexOf(ct)+1}</h5>
                                               </div>
                                               :
                                               <div className={styles.scoreEach} onClick = {() => {StudentHandler(ct._id)}}>
                                                   <h5>{catalogStudent.indexOf(ct)+1}</h5>
                                               </div>}
                                           </>
                                           )
                                           )}
                                   </div>
                       </div>
                       {/* <div className={styles.paginatedAll}>
                           <ReactPaginate
                               previousLabel={<i class="fa fa-angle-left " aria-hidden="true"></i>}
                               nextLabel={<i class="fa fa-angle-right " aria-hidden="true"></i>}
                               pageCount = {pageCount}
                               onPageChange={changePage}
                               containerClassName={styles.paginationBttns}
                               previousLinkClassName = {styles.previousbttn}
                               nextLinkClassName = {styles.nextbttns}
                               disabledClassName = {styles.paginationDisabled}
                               activeClassName = {styles.paginationActive}
                           />
                       </div> */}
                   </div>
                   <div className={styles.reportLeftRight}>
                       <i class="fa fa-angle-left fa-2x" aria-hidden="true"></i>
                           <div className={styles.scoreNumber}>
                           <div className={styles.dBlock}>
                               <h5>Roll No. {studentText.studentGRNO} </h5>
                               <h5>  Name : {studentText.studentFirstName} {studentText.studentMiddleName} {studentText.studentLastName}</h5>
                               </div>
                           </div>
                       <i class="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                   </div>
                  
 
                   <div className={styles.examCardContainer}>
                       <table className={styles.attendenceTable}>
 
                           <thead>
                           <tr>
                               <th>Subjects</th>
                               <th>Final Exam Marks</th>
                               <th>Other</th>
                               <th>Grace Marks</th>
                               <th>Total</th>
                           </tr>
                           </thead>
 
                      
                           <tbody>
                           {examList &&
                               examList.map((e) => (
                           <tr>
                               <td>{e.subName}</td>
                               <td>{`${round(e.finalExamObtainMarks, 0)}/${e.finalExamTotalMarks}`}</td>
                               <td>{`${round(e.OtherExamTotalObtainMarks, 0)}/${e.OtherExamTotalMarks}`}</td>
                               <td>__</td>
                               <td>{`${round(e.finalObtainTotal, 0)}/${e.finalTotalTotal}`}</td>
                           </tr>
                       ),)}
                           <tr className={styles.activeRow}>
                               <td>Total</td>
                               <td>{round(marksTotal.finalExToObtain, 0)}/{round(marksTotal.finalExToTo, 0)}</td>
                               <td>{round(marksTotal.otherExObtain, 0)}/{round(marksTotal.otherExToTo, 0)}</td>
                               <td>__</td>
                               <td>{round(marksTotal.finalToObtain, 0)}/{round(marksTotal.finalToTo, 0)}</td>
                           </tr>
                           </tbody>
                       </table>
                   </div> 
                   <div className={styles.examCardContainer}>
                       <table className={styles.attendenceTable}>
 
                           <thead>
                           <tr>
                               <th>Percentage</th>
                               <th>Remarks</th>
                               <th>Attendence</th>
                               <th>Behaviour</th>
                              
                           </tr>
                           </thead>
                          
                           <tbody>
                               <tr>
                                   <td>{totalPersantage}%</td>
                                   <td>{resultFinal}</td>
                                   <td>167/200 (78%)</td>
                                   <td>{behav}</td>
                               </tr>
                           </tbody>
                       </table>
                   </div>
 
                   <div className={styles.reportdetails}> 
                       <div className={styles.reportdetail}>
                           <h6>{stBehaviourData[0] ? stBehaviourData[0].bimprovements: "Need Improvements" }</h6>
                       </div>
                       <div className={styles.reportdetail}>
                       <h6>{stBehaviourData[0] ? stBehaviourData[0].blackIn : "No Lackings"}</h6>
                       </div>
                   </div>
 
                   <div className={styles.scoreGlobal}>
                      
                       {studentText.studentFinalReportFinalizedStatus === "Finalized" ?
                       <button
                       className={`btn btn-primary px-1`}
                       onClick={()=>{navigate(`student/report/${studentText._id}`)}}
                       >
                       View Report
                       </button>
                               :
                       <button
                       onClick={()=>{reportFinilized(studentText._id, examList, marksTotal, stBehaviourData )}}
                       >
                       Finalize
                       </button>
                       }
                   </div>
              
               </div>
           </div>
      
  
   )
}
 
export default FinalReport