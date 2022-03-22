import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import UserStudentAboutSection from "../UserStudentAboutSection";
import BackButton from "../BackButton";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from 'axios'
import { requestURL } from "../ReqUrl";
import UserStudentSideBar from "../UserStudentSideBar";
import InstituteRoleTab from "../InstituteRoleTab";

const StudentMemberActivity = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [userStaffMemberData, setUserStaffMemberData] = useState([])
  const [userStudentData, setUserStudentData] = useState([])
  const [studentDesignation, setStudentDesignation] = useState([])
  const [studentClassData, setStudentClassData] = useState('')
  const [studentIns, setStudentIns] = useState('')
  const [studentFeeData, setStudentFeeData] = useState([])
  const [studentChecklistData, setStudentChecklistData] = useState([])

  const [insPost, setInsPost] = useState([])
  const [insAnnouncement, setInsAnnouncement] = useState([])

  useEffect(() =>{
      axios.get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) =>{
          // console.log(res)
          const userstaff = res.data.user.staff
          const userstudent = res.data.user.student
          setUserStaffMemberData(userstaff)
          setUserStudentData(userstudent)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })
      axios.get(`${requestURL}/studentdesignationdata/${params.sid}`)
      .then((res) =>{
          // console.log(res)
          const dStudent = res.data.student
          const classes = res.data.student.studentClass
          const institute = res.data.student.institute
          const fee = res.data.student.studentFee
          setStudentDesignation(dStudent)
          setStudentClassData(classes)
          setStudentIns(institute)
          setStudentFeeData(fee)
          setStudentChecklistData(res.data.student.checklist)
          console.log(res.data.student.checklist)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })

      axios.get(`${requestURL}/insdashboard/${params.iid}`)
      .then((res) =>{
          // console.log(res)
          setInsPost(res.data.institute.posts)
          setInsAnnouncement(res.data.institute.announcement)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })
  },[])


  const selectChange = (value) =>{
      navigate(`/${value}`)
  }

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
                <h3>Student of ({studentClassData.className}-{studentClassData.classTitle})</h3>
                  
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  {/* <h4 className="my-3">Class Catalog</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row mb-5">
                    <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/studentdetail/${params.sid}`)}
                      >
                        <span>
                        <img
                            src="/images/s-attendence-setting-icon.svg"
                            alt="setting"
                            title="Attendence Setting"
                          />
                          <p className={styles.ttext}>&nbsp; Attendence </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                      >
                        <span>
                        <img src="/images/score-icon.svg" title="Score"/> 
                          <p className={styles.ttext}>&nbsp; Progress</p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} my-2`}
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                          <p className={styles.ttext}>&nbsp; Activity </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/student/fee/${params.sid}`)}
                      >
                        <span>
                        <img src="/images/finance-icon.svg" title="Finance" />{" "}
                          <p className={styles.ttext}>&nbsp; Fee </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/library`)}
                      >
                        <span>
                        <img src="/images/library-icon.svg" title="Library" />{" "}
                          <p className={styles.ttext}> &nbsp; Library</p>
                        </span>
                      </div>
                      </div>
                    </div>
                    <hr/>
                    <h4>Activity of ({`${studentDesignation.studentFirstName} ${studentDesignation.studentMiddleName ? studentDesignation.studentMiddleName : ''} ${studentDesignation.studentLastName}`})</h4>
                    {studentFeeData && studentFeeData.map((st) =>(
                        <div className="col-12 col-md-6 mt-2">
                    <div className={styles.examCard}>
                      <p className={styles.dlogoText}>
                        <img src="/images/icon-examcolor.svg" alt="exam" />
                        &nbsp; {st.feeName} ({st.feeAmount}) Paid By {studentDesignation.studentFirstName}
                      </p>
                      <hr />
                    </div>
                    </div>
                    ))}
                    {studentChecklistData && studentChecklistData.map((ct) =>(
                      <div className="col-12 col-md-6 mt-2 mb-2">
                         <div className={styles.examCard}>
                      <p className={styles.dlogoText}>
                        <img src="/images/icon-examcolor.svg" alt="exam" />
                        &nbsp; {ct.checklistName}  Assigned to {studentDesignation.studentFirstName}
                      </p>
                    </div> 
                      </div>
                    ))}
                    {insAnnouncement && insAnnouncement.map((at) => (
                        at.insAnnVisibility === 'Private' ?
                        <div className="col-12 mt-2 mb-2">
                            <div className={styles.examCard}>
                            <img src='/images/icon-examcolor.svg' alt="exam" />
                            <p className={`${styles.dlogoText} text-primary`}>{at.insAnnTitle}</p>
                            <p className={styles.dlogoText}>{at.insAnnDescription}</p>
                            </div>
                        </div>
                        :
                        ''
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
    </>
  );
};

export default StudentMemberActivity;


// {insPost && insPost.map((st) =>(
//   st.CreatePostStatus === 'Private' ?
//       <div className={styles.about}>
//   <p className={styles.dashIcon}>
//   <div className={`mx-3 ${styles.topcell}`}>
//       <div className="d-flex">
//       <div className="postUserImg">
//           <img className={styles.insUserProfile} src='/images/blank-profile.png' />
//       </div>
//       <div className={`d-flex flex-column text-left`}>
//           <small className={`col ${styles.insUserName}`}>
//           {studentIns.insName}
//           </small>
//           <p className={`my-0 ${styles.dashIcon}`}>
//           <span>
//               <small className={`col ${styles.insUserAt}`}>
//               {st.createdAt}
//               </small>
//           </span>
//           </p>
//       </div>
//       </div>
//       <span className={styles.threes}>
//       <img src="https://img.icons8.com/plumpy/25/000000/menu-2.png" />
//       </span>
//   </div>
//   {/* <span className="mx-3">Name of the User</span> */}
//   </p>
//   <p className={` px-3 ${styles.dashIcon}`}>
//   {st.caption ? st.caption : ''}
//   </p>

//   {st.CreateImage ?
//   <div className={`${styles.dashIcon} ${styles.imageBox}`}>
//       <img className={`img-fluid`} src={st.CreateImage} />
//   </div>
//   : ''
//   }
//   {st.CreateVideo ?
//   <div className={`${styles.dashIcon} ${styles.imageBox}`}>
//       <iframe height='400'
//       width='610'
//       src={st.CreateVideo}
//       >

//       </iframe>
//   </div>
//   : ''
//   }
//   {st.CreateInsPost ?
//   <div className={`${styles.dashIcon} ${styles.imageBox}`}>
//       <p className="ml-3">{st.CreateInsPost}</p>
//   </div>
//   : ''
//   }
//   <div
//   className={` d-flex  mx-3 justify-content-between ${styles.reactionsCount}`}
//   >
//   <p>
//       <img
//       src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
//       alt="like"
//       />
//       {st.like ? st.like.length : ''}
//   </p>
//       <p>{st.comment ? st.comment.length : ''} comments</p>
//       </div>
//       <div className={styles.socialReactions}>
//       <button>
//           <img src="/images/icon-like.svg" alt="like" />
//           <span>Like</span>
//       </button>
//       <button>
//           <img src="/images/icon-comment.svg" alt="comment" />

//           <span>Comment</span>
//       </button>
//       <button>
//           <img src="/images/icon-share.svg" alt="share" />

//           <span>Share</span>
//       </button>
//       <button>
//           <img src="/images/icon-save.svg" alt="save" />

//       <span>Save</span>
//   </button>
//   </div>
//   </div>
  
//   : 
//   ''
// ))}