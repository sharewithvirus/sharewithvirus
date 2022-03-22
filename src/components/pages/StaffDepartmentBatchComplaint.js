import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { requestURL } from '../ReqUrl'
import NavbarTopUser from '../NavbarTopUser';
import NavbarBottomUser from '../NavbarBottomUser';
import UserStaffAboutSection from '../UserStaffAboutSection';
import InstituteRoleTab from '../InstituteRoleTab';
import UserStaffSideBar from '../UserStaffSideBar';
import StaffSelectInstituteRole from '../StaffSelectInstituteRole';
import moment from 'moment'


const StaffDepartmentBatchComplaint = (props) => {
    const params = useParams()
    const navigate = useNavigate()
    const [userBatchData, setUserBatchData] = useState("");
    const [departmentData, setDepartmentData] = useState("");
    const [batchData, setBatchData] = useState([]);
    const [complaintData, setComplaintData] = useState([])

    useEffect(() =>{
        axios
      .get(`${requestURL}/staffdepartment/${params.did}`)
      .then((res) => {
        const ddata = res.data.department;
        const bData = res.data.department.batches;
        setDepartmentData(ddata);
        setUserBatchData(res.data.department.userBatch);
        setBatchData(bData);
        setComplaintData(res.data.department.studentComplaint)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    },[complaintData])

    const ReplyComplaintHandler = (id) =>{
        axios.post(`${requestURL}/student/complaint/reply/${id}`,{
            status: 'Resolved'
        })
        .then((res) =>{

        })
        .catch((e) =>{
            console.log('something went wrong')
        })
    }

  return (
    <>
    <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.id} />
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
              <UserStaffAboutSection sid={params.sid} uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                  
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar sid={params.sid} uid={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                    <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-2">
                      <div className={`${styles.dTab} ${styles.active} my-2`} 
                    //   onClick={()=>props.changeIndex(1)}
                      >
                        <span>
                          <i className={`fas fa-user`}></i>
                          &nbsp; Profile Info
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div 
                      className={`my-2 ${styles.dTab} ${styles.active}`}
                      
                      >
                        <span>
                          <i className={`fas fa-user-friends `}></i>
                          &nbsp; Auto Attendance
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div className={`my-2 ${styles.dTab} ${styles.active}`}
                    //   onClick={()=>props.changeIndex(3)}
                      >
                        <span>
                          <i className={`fas fa-id-card-alt `}></i>
                          &nbsp; ID Cards
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div className={`my-2 ${styles.dTab} `}
                    //   onClick={()=>props.changeIndex(4)}
                      >
                        <span>
                          <i className={`fas fa-mail-bulk `}></i>
                          &nbsp; Complaints Box
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div
                        className={`my-2 ${styles.dTab} ${styles.active}`}
                        // onClick={()=>props.changeIndex(5)}
                      >
                        <span>
                          <i className={`fas fa-user-cog `}></i>
                          &nbsp; Batch Settings
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>

                <div className={`${styles.outer2} my-5`}>
                  <div className="col-12 mt-4 d-flex justify-content-space-evenly">
                    <button
                      type="submit"
                      className="btn btn-primary justify-content-center col-4 py-3 px-3"
                      
                    >
                      Solved 60%
                    </button>
                    <div className="col-3 ">
                         <h4>Complain Box</h4>
                    </div>
                    <select name="fmode"  className={`form-control  ${styles.sselect}`}>
                            <option value="" disabled selected>Filter Solved/Unsolved</option>
                            <option value="Offline">Offline</option>
                            <option value="Online">Online</option>
                    </select>
                    
                </div>
        </div>

        <hr />

        {complaintData && complaintData.map((ct) => (
                    <div className={` ${styles.dUser}`}>
                            <div className="col-xl-9 col-lg-12 col-md-12 d-flex justify-content-between align-items-center">
                            <div>
                                {ct.complaintStatus === 'Resolved' ? 
                                <input type="checkbox" checked/>
                                :   
                                <input type="checkbox" onClick={() => {ReplyComplaintHandler(ct._id)}}/>
                                }
                                {ct.complaintType === 'Open' ?
                                <>
                                <span className="mt-3 mx-3">{`(${`${ct.student.studentFirstName} ${ct.student.studentMiddleName ? ct.student.studentMiddleName : ''} ${ct.student.studentLastName}`}) - ${ct.complaintContent.substr(0,50)} `}</span>
                                <span style={{marginLeft: 'auto'}}>{ct.createdAt ? moment(ct.createdAt).format('DD/MM/YYYY') : ''}</span>
                                </>
                                :
                                <>
                                <span className="mt-3 mx-3">{`(${ct.complaintType}) - ${ct.complaintContent.substr(0,50)}`}</span>
                                <span style={{marginLeft: 'auto'}}>{ct.createdAt ? moment(ct.createdAt).format('DD/MM/YYYY') : ''}</span>
                                </>
                                }
                                </div>
                            </div>
                            
                        </div>
                    ))}
                
                
            </div>
            </div>
            </div>
            </div>
            <NavbarBottomUser uid={params.id} />
            </div>
    </>
  )
}

export default StaffDepartmentBatchComplaint