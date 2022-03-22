import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { requestURL } from "./ReqUrl";

const InstituteStats = (props) => {
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
      <div className={`${styles.about} ${styles.statsSection}`}
      style={{marginTop: '28px'}}
      >
        <div className={styles.insStats}>
          {insData.status === 'Approved' ? 
          <div
            className={styles.insStatsText}
            onClick={() => navigate(`/insdepartment/${props.id}`)}
          >
            <p>
              <span>
              <img
                src="/images/department-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Department"
              />
              </span>
            </p>
            <p>
              <span>Departments</span>
            </p>
          </div> 
          :
          <div className={styles.insStatsText}>
            <img
                src="/images/department-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Department"
              />
            <p><span>Departments</span></p>
          </div> 
          }
          <div
            className={styles.insStatsText}
            // onClick={() => navigate("/newadmission")}
          >
            <p>
              <span>
              <img
                src="/images/admission-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Admission"
              />
              </span>
            </p>
            <p>
              <span>Admission</span>
            </p>
          </div>
        </div>
        <div className={styles.insStats}>
          {insData.status === 'Approved' ? 
          <div
            className={styles.insStatsText}
            onClick={() => navigate(`/allstaff/${props.id}`)}
          >
            <p>
              <span>
                
              <img
                src="/images/mentor-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Staff"
              />

              </span>
            </p>
            <p>
              <span>Staff</span>
            </p>
          </div>
          : 
          <div className={styles.insStatsText}>
            <p><span>
              <img
                src="/images/mentor-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Staff"
              />
              </span></p>
            <p><span>Staff</span></p>
          </div>
          }
          {insData.status === 'Approved' ? 
          <div
            className={styles.insStatsText}
            onClick={() => navigate(`/allstudent/${props.id}`)}
          >
            <p>
              <span>
                <img
                src="/images/student-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Student"
              />
              </span>
            </p>
            <p>
              <span>Students</span>
            </p>
          </div>
          :
          <div className={styles.insStatsText}>
            <p><span>
              <img
                src="/images/student-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Student"
              />
              </span></p>
            <p><span>Students</span></p>
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default InstituteStats;
