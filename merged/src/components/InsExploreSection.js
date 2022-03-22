import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { requestURL } from './ReqUrl'

function ExploreSection(props) {
  const navigate = useNavigate();

  const [insData, setInsData] = useState('')

  useEffect(() =>{
    axios.get(`${requestURL}/insdashboard/${props.id ? props.id : ''}`)
    .then((res) =>{
      setInsData(res.data.institute)
    })
    .catch((e) =>{
      console.log('something went wrong')
    })
  },[])

  return (
    <>
      <div
        className={`${styles.popupbg2}`}
        onClick={() => props.changeExplore(false)}
      ></div>

      <div className={`${styles.insexplorepostContainer}`}>
      <div className={styles.insexploreitems}>
      {insData.status === 'Approved' ? 
          <div
            className={styles.insexploreitemContainer}
            id={styles.exploreitem1}
            onClick={() => navigate(`/insdepartment/${props.id}`)}
            style={{ textAlign: "-webkit-center" }}
          >
            <div className={styles.insexploreitem}>
              <img
                src="/images/department-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Department"
              />
            </div>
            <p>Departments</p>
          </div>
          :
          <div
            className={styles.insexploreitemContainer}
            id={styles.exploreitem1}
            style={{ textAlign: "-webkit-center" }}
          >
            <div className={styles.insexploreitem}>
              <img
                src="/images/department-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Department"
              />
            </div>
            <p>Departments</p>
          </div>
           }
          <div
            className={styles.insexploreitemContainer}
            id={styles.exploreitem2}
            style={{ textAlign: "-webkit-center" }}
          >
            <div className={styles.insexploreitem}>
              <img
                src="/images/admission-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Admission"
              />
            </div>
            <p>Admission</p>
          </div>
          {insData.status === 'Approved' ? 
          <div
            className={styles.insexploreitemContainer}
            id={styles.exploreitem3}
            onClick={() => navigate(`/allstaff/${props.id}`)}
            style={{ textAlign: "-webkit-center" }}
          >
            <div className={styles.insexploreitem}>
              <img
                src="/images/staff-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Staff"
              />
            </div>
            <p>Staff</p>
          </div>
            :
            <div
            className={styles.insexploreitemContainer}
            id={styles.exploreitem3}
            style={{ textAlign: "-webkit-center" }}
          >
            <div className={styles.insexploreitem}>
              <img
                src="/images/staff-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Staff"
              />
            </div>
            <p>Staff</p>
          </div>
          }
          {insData.status === 'Approved' ? 
          <div
            className={styles.insexploreitemContainer}
            id={styles.exploreitem4}
            onClick={() => navigate(`/allstudent/${props.id}`)}
            style={{ textAlign: "-webkit-center" }}
          >
            <div className={styles.insexploreitem}>
              <img
                src="/images/student-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Student"
              />
            </div>
            <p>Students</p>
          </div>
            :
            <div
            className={styles.insexploreitemContainer}
            id={styles.exploreitem4}
            style={{ textAlign: "-webkit-center" }}
          >
            <div className={styles.insexploreitem}>
              <img
                src="/images/student-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Student"
              />
            </div>
            <p>Students</p>
          </div>
            }
        </div>
      </div>
    </>
  );
}

export default ExploreSection;