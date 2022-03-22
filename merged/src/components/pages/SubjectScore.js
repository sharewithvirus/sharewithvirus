import React,{useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewDetailsBar from "../NewDetailsBar";
import NavbarBottomUser from "../NavbarBottomUser";
import TeacherCard from "../TeacherCard"
import Score from "../Score"
import Attendence from "../Attendence";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import UserStaffSideBar from "../UserStaffSideBar";
import UserStaffAboutSection from "../UserStaffAboutSection";
import moment from "moment";
import InstituteRoleTab from "../InstituteRoleTab";


const SubjectTeacher = () => {
const navigate = useNavigate();

  const params = useParams()
  const [staffIns, setStaffIns] = useState('')

  const [subjectData, setSubjectData] = useState([])
  const [classData, setClassData] = useState([])

useEffect(() =>{
      axios.get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) =>{
          
          const userstaff = res.data.user.staff
          const userstudent = res.data.user.student
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })
      axios.get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) =>{
          
          const dStaff = res.data.staff
          const institute = res.data.staff.institute
          setStaffIns(institute)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })

      axios.get(`${requestURL}/subject-detail/${params.suid}`)
        .then((res) => {
            ;
            const subjectDetails = res.data.subData
            const classStudent = res.data.classData.ApproveStudent;
            const classDetails = res.data.classData
            setSubjectData(subjectDetails)
            setClassData(classDetails)
        })
        .catch((e) =>{
            console.log("Something Went Wrong")
        })

  },[])

  const msgShow = (msg) => {
  }

  const [index, setIndex] = useState(1);
  return (
    <>
      <NavbarTopUser uid={params.id} />
        <div className={styles.mainScreen}>
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
            <StaffSelectInstituteRole id={params.id} sid={params.sid}/>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                  <h3 className="mt-4 mb-3">{subjectData.subjectName} - {classData.className}</h3>
                </div>
                <div className={`mt-4 mb-3 ${styles.outer2} ${styles.profileCreationPage}`}>
                  
                  <form className="row g-3">
                      
                  
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-4">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/subject/${params.suid}`)}>
                        <span>
                        <img src="/images/catalog-icon.svg" alt="Register" />
                        <p className={styles.ttext}> &nbsp; Catalog </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-4">
                      <div className={`${styles.dTab}`}
                      onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/subject/score/${params.suid}`)}>
                      
                        <span>
                        <img src="/images/score-icon.svg" title="Score"/> 
                        <p className={styles.ttext}>  &nbsp; Score </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-4">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/subject/attendence/${params.suid}`)}>
                        <span>
                        <img src="/images/s-attendence-icon.svg" title="Attendence"/> 
                        <p className={styles.ttext}> &nbsp;Attendence </p>
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                  <Score
                 msgShow={msgShow}
                 subData={subjectData}
                 classData={classData}
               />
                    
                </form>
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

export default SubjectTeacher;

