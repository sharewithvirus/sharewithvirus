import React from 'react'
import styles from './Home.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from './NavbarTopUser'
import InstituteRoleTab from './InstituteRoleTab'
import UserStaffAboutSection from './UserStaffAboutSection'
import StaffSelectInstituteRole from './StaffSelectInstituteRole'
import UserStaffSideBar from './UserStaffSideBar'
import NavbarBottomUser from './NavbarBottomUser'


const MemberWrapper = (props) =>{
    return (
        <>
        <div className={styles.mainScreen}>
        <NavbarTopUser uid={props.uid}/>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
            <InstituteRoleTab uid={props.uid}/>
              <div className={styles.leftBar}>
                <UserStaffAboutSection sid={props.sid} uid={props.uid}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >             
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`h-100 ${styles.about}`}>
                <div className={`${styles.insTitle} mt-4`}>
                  <StaffSelectInstituteRole id={props.uid} sid={props.sid} />
                {props.children}
                </div>
               </div>
            </div>
            </div>
               </div>
               <NavbarBottomUser uid={props.uid}/>
            </div>

        </>
    )
}

export default MemberWrapper;