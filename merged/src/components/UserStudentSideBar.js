import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NewStudentLeaveCard from './NewStudentLeaveCard'
import NewStudentTransferCard from './NewStudentTransferCard'
import axios from 'axios'
import { requestURL } from './ReqUrl'

const UserStudentSideBar = (props) => {
  const navigate = useNavigate();
  const [addClass, setAddClass] = useState(false);
  const [addTransfer, setAddTransfer] = useState(false)
  const setAddClassFunction = () => {
    setAddClass(false);
  };
  const setAddTransferFunction = () => {
    setAddTransfer(false);
  };

  console.log(props.data)

  return (
    <>

                  {/* <div className={styles.dabout}>
                    <i class="fas fa-users"></i>Id Card
                  </div> */}
                  {props.data.ApproveStudent && props.data.ApproveStudent.some((et) => et._id === props.sid) ? 
                  <>
                  <div className={styles.dabout} onClick={() => navigate(`/user/${props.uid ? props.uid :''}/student/complaint/${props.sid ? props.sid : ''}`)}>
                  <img src="/images/s-complaint-icon.svg" title="Menu" />{" "}Complaints
                  </div>
                  <div className={styles.dabout} onClick={() => { setAddClass(true)}}>
                  <img src="/images/leave-icon.svg" title="Leave" />{" "}Leave
                  </div>
                  <div className={styles.dabout} onClick={() => { setAddTransfer(true)}}>
                  <img src="/images/transfer-icon.svg" title="Transfer" />{" "}Transfer
                  </div>
                  </>
                  :
                  <>
                  <div className={styles.dabout}>
                  <img src="/images/s-complaint-icon.svg" title="Menu" />{" "}Complaints
                  </div>
                  <div className={styles.dabout}>
                  <img src="/images/leave-icon.svg" title="Leave" />{" "}Leave
                  </div>
                  <div className={styles.dabout}>
                  <img src="/images/transfer-icon.svg" title="Transfer" />{" "}Transfer
                  </div>
                  </>
                  }
                  <div className={styles.dabout}>
                  <img src="/images/setting-icon.svg" title="Setting" />{" "}Settings
                  </div> 
                  <div className={styles.dabout}>
                  <img src="/images/setting-icon.svg" title="Setting" />{" "}Previous Year Report
                  </div>  
      {/* </div> */}
      <NewStudentLeaveCard
        setAddClassFunction={setAddClassFunction}
        trigger={addClass}
        setTrigger={setAddClass}
        sid={props.sid ? props.sid : ''}
        uid={props.uid ? props.uid : ''}
      />
      <NewStudentTransferCard
        setAddTransferFunction={setAddTransferFunction}
        trigger={addTransfer}
        setTrigger={setAddTransfer}
        sid={props.sid ? props.sid : ''}
        uid={props.uid ? props.uid : ''}
      />
    </>
  );
};

export default UserStudentSideBar;
