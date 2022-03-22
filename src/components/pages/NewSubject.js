import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { Success, Danger } from '../SnackBar'
import { requestURL } from "../ReqUrl";


const NewSubject = (props) => {
  const navigate = useNavigate();
  const params = useParams()
  const [allStaffTextData, setAllStaffTextData] = useState([])
  const [ mSubjectData, setmSubjectData] = useState([])

  const [subjectData, setSubjectData] = useState({
      subjectTitle: '',
      subjectName: '',
      sid: '',
      msid: '',
      showMessages: false,
      showMessagesDanger: false,
      msg: "",

  })

  const SubjectDataHandler = (e) =>{
      const { name, value} = e.target
      setSubjectData({
          ...subjectData,
          [name]: value
      })
  }

  const SubjectDataHandlerChange = (e) =>{
      e.preventDefault()
      axios.post(`${requestURL}/ins/${params.id}/department/${params.did}/batch/${params.bid}/class/${params.cid}/subject`, subjectData)
      .then(res =>{

          if(res.data.message === 'Successfully Created Subject' && res.status == 200){
              props.setClassSubjectFunction(false)
              setSubjectData({ showMessages: true, msg: res.data.message });
          }
          setTimeout(() => {
            // navigate(`/ins/${params.id}/department/${params.did}/batch/${params.bid}/classsubject/${params.cid}`)
          }, 100);
      }).catch(e =>{
          console.log('Something Went Wrong')
      })
  }

  useEffect(() =>{
      axios.get(`${requestURL}/insdashboard/${params.id}`) 
      .then((res) =>{
          const staff = res.data.institute.ApproveStaff
          setAllStaffTextData(staff)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })
  },[])


  useEffect(() =>{
    axios.get(`${requestURL}/ins/${params.id}/departmentmastersubject/${params.did}`) 
    .then((res) =>{
        const subjectText = res.data.subjectMaster
        console.log(subjectText)
        setmSubjectData(subjectText)
    })
    .catch((e) =>{
        console.log("Something Went Wrong")
    })
},[])

  return props.trigger ? (
    <>
      {subjectData.showMessages ? <Success msg={subjectData.msg} /> : null}
      {/* {insLogin.showMessagesDanger ? <Danger msg={insLogin.msg} /> : null} */}
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-8 col-md-8 col-lg-6 col-xl-6  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setClassSubjectFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="my-2">Add Subject</h4>
          <form onSubmit={SubjectDataHandlerChange}>
            <div className="row">
          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="sname" className="form-group mb-1">
              Select Subject Name
            <span className={styles.requireField}>*</span>
            </label>
            <select name="msid" className="form-control" id="sname" onChange={SubjectDataHandler} required>
              <option value="Select Subject" selected disabled>Select Subject</option>
              {mSubjectData && mSubjectData.map((st) => (
                <option value={st._id}>{`${st.subjectName}`}</option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="stitle" className="form-group mb-1">
              Subject Head Title
            <span className={styles.requireField}>*</span>
            </label>
            <input
              type="text"
              name="subjectTitle"
              id="stitle"
              className="form-control"
              placeholder="Subject Head Title (CS)"
              onChange={SubjectDataHandler}
              required
            />
          </div>
          <div className="col-12 mb-2">
            <label htmlFor="shead" className="form-group mb-1">
              Select Subject Head
            <span className={styles.requireField}>*</span>
            </label>
            <select name="sid" className="form-control" onChange={SubjectDataHandler} required>
              <option value="Select Subject Head" selected disabled>Select Subject Head</option>
              {allStaffTextData && allStaffTextData.map((st) => (
                <option value={st._id}>{`${st.staffFirstName} ${st.staffLastName}`}</option>
              ))}
            </select>
          </div>
          </div>
          <div className="col-12 mb-3">
            <button type="submit" className="btn btn-outline-primary mx-auto px-5 ">
              <i class="fas fa-plus mt-1 mx-1"></i>Add Subject
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

export default NewSubject;
