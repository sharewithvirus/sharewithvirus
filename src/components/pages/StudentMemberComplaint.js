import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from 'axios'
import { requestURL } from "../ReqUrl";
import UserStudentAboutSection from "../UserStudentAboutSection";
import moment from 'moment'
import UserStudentSideBar from "../UserStudentSideBar";
import InstituteRoleTab from "../InstituteRoleTab";
import NewComplaintCard from '../NewComplaintCard'

const StudentMemberComplaint = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [studentDesignation, setStudentDesignation] = useState([])
  const [studentClassData, setStudentClassData] = useState('')
  const [studentIns, setStudentIns] = useState('')
  const [complaintData, setComplaintData] = useState([])
  const [addClass, setAddClass] = useState(false);

  useEffect(() =>{
      axios.get(`${requestURL}/studentdesignationdata/${params.sid}`)
      .then((res) =>{
          // console.log(res)
          const dStudent = res.data.student
          const classes = res.data.student.studentClass
          const institute = res.data.student.institute
          setStudentDesignation(dStudent)
          setStudentClassData(classes)
          setStudentIns(institute)
          setComplaintData(res.data.student.complaints)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })

  },[complaintData])

  const ReplyComplaintInstituteHandler = (id) =>{
      axios.post(`${requestURL}/student/complaint/${id}/institute/${studentIns._id}`,{
          status: 'Reported'
      })
      .then((res) =>{})
      .catch((e) =>{
          console.log('something went wrong')
      })
  }

  const setAddClassFunction = () => {
    setAddClass(false);
  };

  return (
    <>
        <NavbarTopUser uid={params.id}/>
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
            <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
              <UserStudentAboutSection sid={params.sid} uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                                    
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStudentSideBar sid={params.sid} uid={params.id} data={studentClassData ? studentClassData : ''}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`h-100 ${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                <div className={styles.insTitle}>
                    <h3>Complaints</h3>
                  
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  {/* <h4 className="my-3">Class Catalog</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row mb-5">
                    <div className="col-12 col-md-6 my-3">
                        <input type="text" className="form-control" name="query" placeholder="Search complaints..."/>
                      </div>
                      <div className="col-12 col-md-6 my-3">
                        <button type="button" className="btn btn-secondary px-5"
                        onClick={() => {
                            setAddClass(true);
                          }}
                        >Make Complaint</button>
                      </div>
                    </div>
                    {complaintData && complaintData.map((ct) => (
                    <div className={` ${styles.dUser}`}>
                            <div className="col-xl-9 col-lg-12 col-md-12 d-flex justify-content-between align-items-center">
                            <div>
                                {ct.complaintStatus === 'Resolved' ? 
                                <input type="checkbox" name="sComplaint" checked />
                                : 
                                <input type="checkbox" name="sComplaint" />
                                }
                                <span className="mt-3 mx-3">{`${ct.complaintContent.substr(0,50)} - (${ct.complaintType})`}</span>
                            </div>
                            </div>
                            <div
                            id="btnGroup"
                            className="btn-group col-xl-2 col-lg-3 col-md-4 mx-auto"
                            role="group"
                            >
                            {ct.complaintStatus === 'Resolved' ? 
                            ct.complaintInsStatus === 'Reported' ? 
                            <button
                                type="button"
                                class={`btn btn-secondary  `}
                            >
                                Reported
                            </button>
                            :
                            <button
                                type="button"
                                class={`btn btn-primary  `}
                                onClick={() => {ReplyComplaintInstituteHandler(ct._id)}}
                            >
                                Report
                            </button>
                            : 
                            <button
                                type="button"
                                class={`btn btn-primary  `}
                                disabled
                            >
                                Report
                            </button>
                            }
                            </div>
                        </div>
                    ))}
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomUser uid={params.id}/>
        <NewComplaintCard
        setAddClassFunction={setAddClassFunction}
        trigger={addClass}
        setTrigger={setAddClass}
        sid={params.sid}
        uid={params.uid}
        data={studentDesignation ? studentDesignation : ''}
      />
    </>
  );
};

export default StudentMemberComplaint;
