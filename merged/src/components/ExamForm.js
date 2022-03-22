import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { requestURL } from "./ReqUrl";
import { Success } from "./SnackBar";

import { Multiselect } from "multiselect-react-dropdown";

import PopUpFormExam from "./PopUpFormExam";

function ExamForm(props) {
  const navigate = useNavigate();
  const params = useParams();

  const [examOpen, setExamOpen] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [subjectData, setsubjectData] = useState([]);
  // const [batchClassData, setBatchClassData] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [showMsg, setShowMsg] = useState([]);

  let classL = [];

  const [subExamData, setSubExamData] = useState([]);
  const [examClassData, setExamClassData] = useState([]);

  const [formData, setFormData] = useState({
    examName: "",
    examType: "",
    examMode: "",
    examWeight: "",
    examForClass: "",
    subject: subExamData,
  });

  const subHandler = (data) => {
    setSubExamData(data);
  };
  console.log("this is after handler", subExamData);
  const [options, setOptions] = useState();

  function onSelect(selectedList, selectedItem) {
    selectedList.push(selectedItem);
    setExamClassData(selectedList);
    console.log(selectedList);
  }

  function onRemove(selectedList, removedItem) {
    selectedList.pop(removedItem);
    setExamClassData(selectedList);
    console.log(selectedList);
  }

  const handleClick = (e) => {
    setExamOpen(true);
    e.preventDefault();

    setMainData(...mainData, formData);

    props.chnageData(formData);
    props.changeform(false);
  };

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleformDataChange = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    axios
      .get(
        `${requestURL}/ins/${params.id}/allclassdata/${params.did}/batch/${params.bid}`
      )
      .then((res) => {
        setOptions(res.data.batch.classroom);
        setsubjectData(res.data.batch.subjectMasters);

        let cl = res.data.batch.classroom;
        // console.log(cl)
        const classList = [];

        for (let i = 0; i < cl.length; i++) {
          let classObj = {
            className: `${cl[i].className} - ${cl[i].classTitle}`,
            classId: `${cl[i]._id}`,
            classMaster: `${cl[i].masterClassName.className}`,
          };
          classList.push(classObj);
        }
        console.log(classList);
        setOptions(classList);
        // console.log(res.data.batch.subjectMasters)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    // axios
    //   .get(`${requestURL}/batch-detail/${params.bid}`)
    //   .then((res) => {
    //     const bClass = res.data.batch.classroom;
    //     // setBatchClassData(bClass);
    //   })
    //   .catch((e) => {
    //     console.log("Something Went Wrong");
    //   });
  }, []);

  const PopUp = () => {
    setPopUp(false);
  };
  return (
    <div className={styles.examForm}>
      {examOpen}

      {!examOpen && (
        <>
          {showMsg ? <Success msg={showMsg} /> : null}
          <div className="w-90">
            <div className="col-12 mb-2">
              <input
                type="text"
                name="examName"
                value={formData.fename}
                onChange={handleInput}
                className="form-control"
                id="stsearch"
                placeholder="Enter Exam Name"
                required
              />
            </div>

            <div className={styles.selectdrop}>
              <select
                name="examType"
                class="form-select"
                aria-label="Default select example"
                defaultValue={formData.cid}
                id="sselect"
                required
                onChange={handleInput}
                placeholder="Select Exam Type"
              >
                <option value="" disabled selected>
                  Select Exam Type
                </option>
                <option value="Final Exam">Final Exam</option>
                <option value="Other Exam">Other Exam</option>
              </select>
              <select
                name="examMode"
                class="form-select"
                aria-label="Default select example"
                defaultValue={formData.cid}
                id="sselect"
                required
                onChange={handleInput}
                placeholder="Select Exam Mode"
              >
                <option value="" disabled selected>
                  Select Exam Mode
                </option>
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
              </select>

              <input
                type="Number"
                min={0}
                name="examWeitage"
                value={formData.fename}
                onChange={handleInput}
                className="form-control"
                id="stsearch"
                placeholder="Enter Exam Weight"
                required
              />
            </div>
            <div class="mt-3">
              {/* <select
               name="cid"
               className="form-select" aria-label="Default select example"
               defaultValue={formData.cid}
               id="sselect"
               required
               onChange={handleInput}
               placeholder="Select Class"
    
             >
               <option value="" disabled selected>
                 Select Class
               </option>
               {classData &&
                 classData.map((st) => (
                   <option value={st._id}>{st.className}</option>
                 ))}
             </select> */}

              <Multiselect
                options={options}
                displayValue="className"
                placeholder="Select classes"
                closeIcon="circle"
                // groupBy="masterClassName"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <table className={styles.attendenceTable}>
              <thead>
                <tr>
                  <th>Subjects</th>
                  <th>Total Marks</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {subExamData && (
                  <tr>
                    <td>{subExamData.examSubId}</td>
                    <td>{subExamData.examSubTotalMarks}</td>
                    <td>{subExamData.examSubTime} </td>
                    <td>{subExamData.examSubDate}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-success px-5 mx-5 mt-4"
              onClick={handleformDataChange}
              // onClick={handleClick}
            >
              Create Exam
            </button>
            <button
              className="btn btn-success px-5 mx-5 mt-4"
              onClick={() => setPopUp(true)}
            >
              Add Subject
            </button>
          </div>
        </>
      )}
      {popUp && (
        <PopUpFormExam
          trigger={popUp}
          PopUp={PopUp}
          subData={subjectData}
          addSubject={subHandler}
        />
      )}
    </div>
  );
}

export default ExamForm;
