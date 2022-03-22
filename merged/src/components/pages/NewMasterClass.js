import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { requestURL } from '../ReqUrl'

    const NewClass = (props) => {
    const params = useParams()

    const [classMasterData, setClassMasterData] = useState({
        className: '',
        classTitle: '',
    })

const ClassDataHandler = (e) =>{
    const { name, value} = e.target
    setClassMasterData({
        ...classMasterData,
        [name]: value
    })
}

  const ClassDataHandlerChange = (e) =>{
      e.preventDefault()
      axios.post(`${requestURL}/ins/${params.id}/departmentmasterclass/${params.did}/batch/${params.bid}`, classMasterData)
      .then(res =>{
          if(res.data.message === 'Successfully Created MasterClasses' && res.status == 200){
              // props.setTrigger(false)
              props.setMasterClassFunction(false);
          }
          else{
              alert("something went wrong")
          }
      }).catch(e =>{
          console.log('Something Went Wrong')
      })
  }

  return props.trigger ? (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-8 col-md-8 col-lg-6 col-xl-6  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setMasterClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Add Masters of Standard /Labels /Grade </h4>
          <form onSubmit={ClassDataHandlerChange}>
          <div className="col m-4">
            <label htmlFor="sgClasss" className="form-group mb-1">Enter Standard / Labels / Grade Name 
            <span className={styles.requireField}>*</span>
            </label>
            <input
              type="text"
              name="className"
              id="sgClass"
              className="form-control"
              placeholder="Enter Standard / Labels / Grade Name"
              onChange={ClassDataHandler}
              required
            />
          </div>
          <div className="col m-4">
          <label htmlFor="stClasss" className="form-group mb-1">Enter Standard / Labels / Grade Title 
            <span className={styles.requireField}>*</span>
            </label>
            <input
              type="text"
              name="classTitle"
              id="stClass"
              className="form-control"
              placeholder="Enter Standard / Labels / Grade Title"
              onChange={ClassDataHandler}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-outline-primary mt-4 px-5 mx-auto"
            >
              <i class="fas fa-plus mt-1 mx-1"></i>Add Class Master
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

export default NewClass;
