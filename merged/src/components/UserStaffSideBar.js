import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NewLeaveCard from './NewLeaveCard'
import NewTransferCard from './NewTransferCard'


const UserStaffSideBar = (props) => {
  const navigate = useNavigate();
  const [addClass, setAddClass] = useState(false);
  const [addTransfer, setAddTransfer] = useState(false)
  const setAddClassFunction = () => {
    setAddClass(false);
  };
  const setAddTransferFunction = () => {
    setAddTransfer(false);
  };
  return (
    <>

                  {/* <div className={styles.dabout}>
                    <i class="fas fa-users"></i>Id Card
                  </div> */}
                  <div className={styles.dabout}>
                  <img src="/images/s-complaint-icon.svg" title="Menu" />{" "}Complaints Box
                  </div>
                  <div className={styles.dabout}
                  onClick={() => {
                    setAddClass(true);
                  }}
                  >
                  <img src="/images/leave-icon.svg" title="Leave" />{" "}Leave
                  </div>
                  <div className={styles.dabout}
                  onClick={() => {
                    setAddTransfer(true);
                  }}
                  >
                  <img src="/images/transfer-icon.svg" title="Transfer" />{" "}Transfer
                  </div>
                  <div className={styles.dabout}>
                  <img src="/images/setting-icon.svg" title="Setting" />{" "}Settings
                  </div>  
      {/* </div> */}
      <NewLeaveCard
        setAddClassFunction={setAddClassFunction}
        trigger={addClass}
        setTrigger={setAddClass}
        sid={props.sid ? props.sid : ''}
        uid={props.uid ? props.uid : ''}
      />
      <NewTransferCard
        setAddTransferFunction={setAddTransferFunction}
        trigger={addTransfer}
        setTrigger={setAddTransfer}
        sid={props.sid ? props.sid : ''}
        uid={props.uid ? props.uid : ''}
      />
    </>
  );
};

export default UserStaffSideBar;
