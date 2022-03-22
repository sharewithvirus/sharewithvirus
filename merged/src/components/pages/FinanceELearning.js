import React, {useState} from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import NavbarBottomUser from "../NavbarBottomUser";
import {FundCard} from "../FundCard"
import UserStaffSideBar from "../UserStaffSideBar";
import InstituteRoleTab from "../InstituteRoleTab";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import UserStaffAboutSection from "../UserStaffAboutSection";

const FinanceELearning = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [index, setIndex] = useState(1)

  function handleChange(value) {
    navigate(`/${value}`);
  }
  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.id}/>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
            <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
              <UserStaffAboutSection sid={params.sid} uid={params.id} />
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
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`}>
                 <>
                        <div className={`${styles.scoreGlobal3} mt-4`}>
                          <div class={`form-group ${styles.createQuestionBack}`}>
                            <div></div>
                            <h4>Learning Sales</h4>
                          
                             <div></div>
                          </div>
                        </div>   
                  <div className={` ${styles.outer2}`}>
                    <form className={`row mt-5 ${styles.funds}`}>
                        <div className={`mt-3 ${styles.fundinternal}`}>
                            <h4>This Month: 1,00,00,000</h4>
                            <hr/>
                        </div>
                        
                    
                        <div class="row">
                            <div class="col">
                                <h6 className={styles.fundinternaldiv}>
                                  Sales: 20,80,000
                                </h6>
                            </div>
                            <div class="col">
                              <h6 className={styles.fundinternaldiv}> 
                                Credits: 79,20,000
                              </h6>
                            </div>
                        </div>
                    </form>
                  </div>
                </>
                
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id}/>
      </div>
    </>
  );
};





export default FinanceELearning;



