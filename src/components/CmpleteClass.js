import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";
import { Multiselect } from "multiselect-react-dropdown";
import { Success } from "./SnackBar";

function CmpleteClass(props) {
  const navigate = useNavigate();
  const params = useParams();

  const [studentList, setStudentList] = useState([])
  const [studentPramoteList, setStudentPramoteList] = useState([])
  const [deptData, setDeptData] = useState(props.deptData)
  const [classData, setClassData] = useState(props.classdData)
  const [deptBatches, setDeptBatches] = useState(props.deptData.batches)
  const [studentListForSelect, setStudentListForSelect] = useState([])
  const [showMsg, setShowMsg] = useState([]);
  const [formData, setFormData] = useState({
    promote: "",
    selectedBatch: "",
    studentToPromote: [],
    classToPromote: ""
  });

  function passFailHandler(b) {
    let result;
   if (b >= 75) {
     result = "Passed With Distention";
   } else if( b >= 65 && b <= 74 ){
     result = "1st Class"
   } else if( b >= 50 && b <= 64 ) {
     result = "2nd Class";
   } else if( b >= 35 && b <= 50 ) {
     result = "Passing Grade";
   } else if( b <= 34 ) {
     result = "Fail";
   }
   return result
  }


  function arrMacker(list) {

    var arr = [];
    var len = list.length;
    for (var i = 0; i < len; i++) {
      let item = {
        studId: list[i]._id,
        studName: `${list[i].studentFirstName} ${list[i].studentMiddleName} ${passFailHandler(Number(list[i].studentFinalReportData.finalObtainTotal)/Number(list[i].studentFinalReportData.finalMarksTotalTotal)*100)} `,
      };
      arr.push(item);
    }
    return arr;
  }

  function batchSelectionHandlerChange(){

    console.log(`Batch Selected in Class`)

  }

  console.log(deptData)
  console.log(classData)
  console.log(deptBatches)

  let unLockedBatches = deptBatches.filter((e)=>{ return e.batchStatus === "UnLocked" });


useEffect(() => {

  setClassData(props.classdData)
  setStudentList(classData.ApproveStudent)
  setDeptData(props.deptData)
  console.log(studentList)

    let stArr = arrMacker(studentList)
    setStudentListForSelect(stArr)

    setDeptBatches(props.deptData.batches)
    console.log(deptBatches)


}, []);
// useEffect(() => {

// }, [props.classData]);




  function onSelect(selectedList, selectedItem) {
    setStudentPramoteList(selectedList);

  }

  function onRemove(selectedList, removedItem) {
    setStudentPramoteList(selectedList);
  }

  function premoteStudHandler(){
    

    axios
    .post(
      `${requestURL}class/premote/${params.cid}, ${ formData }`)
    .then((res) => {
      if (
        res.data.message === "Successfully Students are Promoted to New Class" &&
        res.status === 200
        
      ) {
        setShowMsg(res.data.message)

      } else {
        alert("something went wrong");
      }
    })
    .catch((e) => {
      console.log("Something Went Wrong");
    });

    console.log("Premote Student Btn Clicked")
  }
  function classCompleteHandler(){

    axios
    .post(
      `${requestURL}/department/batch/class/${params.cid}`)
    .then((res) => {
      if (
        res.data.message === "Successfully Created Exam" &&
        res.status === 200
        
      ) {
        setShowMsg(res.data.message)
        console.log(res.data.message);
        props.cardRefresh()

      } else {
        alert("something went wrong");
      }
    })
    .catch((e) => {
      console.log("Something Went Wrong");
    });
  }

  
  return (
    <>
    {showMsg ? <Success msg={showMsg} /> : null}
        <div className={styles.outer2}>
                    <form className="row mt-0">
                      <div className="d-flex justify-content-between">
                        <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                        
                        <div className="col-4 mx-auto my-4">
                          <select class="form-select" aria-label="Default select example">
                          <option selected desable>Batch</option>
                          {deptBatches && deptBatches.map((e)=>{

                              <option value={e._id} key={e._id} >{e.batchName}</option>
                          })}
                          </select>
                        </div>

                        <div className="col-4 mx-auto my-4">
                          <h5>Class of `{props.classdData.batch.batchName}` Batch</h5>
                        </div>

                        <div className="col-4 mx-auto my-4"></div>
                        </div>
                      </div>
                      
                      <hr />
                      <div className="d-flex justify-content-center mt-5">
                        <h5>Promote Students</h5>
                      </div>
                      
                      <div className='mb-3'></div>
                      <div className="col-12 col-md-6 mb-2">
                        {/* <label for="cteacher" className="form-label">
                          Class Teacher
                        </label> */}
                        <select class="form-select" aria-label="Default select example">
                          <option selected>Promote</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        {/* <label for="dadmin" className="form-label">
                          Operating Admin
                        </label> */}
                        <Multiselect
                          options={studentListForSelect}
                          displayValue="studName"
                          placeholder="Select Students to Premote"
                          closeIcon="circle"
                          onSelect={onSelect} // Function will trigger on select event
                          onRemove={onRemove} // Function will trigger on remove event
                          // groupBy="masterClassName"
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        {/* <label for="dstaff" className="form-label">
                          Total Staff
                        </label> */}
                        <select class="form-select" aria-label="Default select example" name="selectedBatch" onChange={batchSelectionHandlerChange}>
                          <option selected disable>Select Batch</option>
                          {unLockedBatches &&
                            unLockedBatches.map((st) => (
                              <option value={st._id} key={st._id} >{st.batchName}</option>
                            ))}

                        </select>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        {/* <label for="dstudents" className="form-label">
                          Total Students
                        </label> */}
                        <select class="form-select" aria-label="Default select example">
                          <option selected>Select Class</option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <input
                          type="text"
                          name="password"
                          className="form-control"
                          id="password"
                          placeholder="Confirm with Password"
                          disable
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-2 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-outline-success px-5 mt-2 w-30"
                          onClick={()=> premoteStudHandler()}
                        >
                          Premote Students
                        </button>
                        </div>
                    </form>
                      <div className="col-12 col-md-12 mb-2 d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-success px-5 mt-2 w-30"
                          onClick={()=> props.showComplete(1)}
                        >
                          Complete Batch
                        </button>
                      </div>
                  </div>
    </>
  )
}

export default CmpleteClass