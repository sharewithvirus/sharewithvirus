import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import UserAboutSection from '../UserAboutSection'
import NavbarBottomUser from "../NavbarBottomUser";
import axios from 'axios'
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from '../StaffSelectInstituteRole'
import InstituteRoleTab from "../InstituteRoleTab";

const StaffMember = () => {
  const navigate = useNavigate();
  
  const params = useParams()

  const [userStaffMemberData, setUserStaffMemberData] = useState([])
  const [userStudentData, setUserStudentData] = useState([])

  useEffect(() =>{
      axios.get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) =>{
          const userstaff = res.data.user.staff
          const userstudent = res.data.user.student
          setUserStaffMemberData(userstaff)
          setUserStudentData(userstudent)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })
  },[])

  // const StaffHandler = (id) =>{
  //     axios.post(`${requestURL}/${params.id}/staffdetaildata`, {
  //         staffId: id
  //     })
  //     .then((res) =>{
  //         navigate(`/user/${params.id}/staffdetail/${res.data.staff._id}`)
  //     })
  //     .catch((e) =>{
  //         console.log("Something Went Wrong")
  //     })
  // }

  // const StudentHandler = (id) =>{
  //     axios.post(`${requestURL}/${params.id}/studentdetaildata`, {
  //         studentId: id
  //     })
  //     .then((res) =>{
  //         navigate(`/user/${params.id}/studentdetail/${res.data.student._id}`)
  //     })
  //     .catch((e) =>{
  //         console.log("Something Went Wrong")
  //     })
  // }

  return (
    <>
        <NavbarTopUser uid={params.id}/>
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
                <UserAboutSection uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >  
                
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <div className={`${styles.insTitle} mt-4`}>
              
                  <StaffSelectInstituteRole id={params.id} sid={params.sid} />
                </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomUser uid={params.id}/>
    </>
  );
};

export default StaffMember;
