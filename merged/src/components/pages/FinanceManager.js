import React,{useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NavbarBottomUser from "../NavbarBottomUser";
import StaffSelectInstituteRole from '../StaffSelectInstituteRole'
import InstituteRoleTab from '../InstituteRoleTab'
import UserStaffAboutSection from '../UserStaffAboutSection'
import UserStaffSideBar from '../UserStaffSideBar'
import NewFinanceDetailBar from '../NewFinanceDetailBar'
import axios from "axios";
import { requestURL } from "../ReqUrl";

const FinanceManager = () => {
  const [index, setIndex] = useState(1);
  const params = useParams()
  const navigate = useNavigate();
  const [financeData, setFinanceData] = useState('')

  useEffect(() =>{
    axios.get(`${requestURL}/finance/detail/${params.fid}`)
    .then((res) =>{
      setFinanceData(res.data.finance)
    })
  },[financeData])

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
                <UserStaffSideBar />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                        <ProfileDisplaySection />
                  
                        <NewFinanceDetailBar
                        financeText={financeData}
                      />
                        <div className={`my-4 ${styles.ddetail}`}>
                        
                        <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
  
                          <div className="col-4">
                            <div className={`${styles.dTab}`}>
                              <span>
                                <img src="/images/department-menu-icon.svg" title="Menu">
                                </img>
                              </span>
                            </div>
                            </div>  
                            <div className="col-4">
                            <div
                              className={`${styles.dTab} ${styles.active}`}
                              onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/finance-info/${params.fid}`)}
                            >
                              <span>
                                <img src="/images/info-icon.svg" title="Info"/>
                              </span>
                            </div>
                            </div>  
                          <div className="col-4">
                            <div
                              className={`${styles.dTab} ${styles.active}`}
                                onClick={()=> setIndex(2)}
                            >
                              <span>
                                <img src="/images/batch-icon.svg" alt="Batch" />
                              </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                        {financeData.institute && (financeData.institute.bankAccountNumber !== '' &&
                         financeData.institute.bankAccountHolderName !== '' && 
                         financeData.institute.bankIfscCode !== '') ?
                         <>
                          <div
                            className={styles.ddetailInner}
                            onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/finance-internal/${params.fid}`)}
                          >
                            <img src="/images/internal-icon.svg" alt="Internal" />
                            <p className="my-2">Internal</p>
                          </div>
                          <div
                            className={styles.ddetailInner}
                            onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/finance-incomes/${params.fid}`)}
                            
                          >
                            <img src="/images/income-icon.svg" alt="Incomes" />
                            <p className="my-2">Incomes</p>
                          </div>
                          <div className={styles.ddetailInner}
                          onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/finance-expenses/${params.fid}`)}
                          >
                            <img
                              src="/images/expense-icon.svg"
                              alt="Expense"
                            />
                            <p className="my-2">Expenses</p>
                          </div>
                          <div className={styles.ddetailInner}
                            onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/finance-e-module/${params.fid}`)}                          
                          >
                            <img
                              src="/images/module-icon.svg"
                              alt="Module"
                            />
                            <p className="my-2">Library and E-Learning</p>
                          </div>
                          </>
                          : '' }
                        </div>
                    
                        {/* <div className="d-flex justify-content-between mt-4">
                            <i class="fas fa-arrow-left" onClick={() => setIndex(1)}></i>
                            <h4>Funds</h4>
                            <div></div>
                        </div>

                        <div className={` ${styles.outer2}`}>
                          <form className={`row mt-5 ${styles.funds}`}>
                              <div className={`mt-3 ${styles.fundinternal}`}>
                                  <h4>Total : 1,00,00,000</h4>
                                  <hr/>
                              </div>

                              <div class="row">
                                  <div class="col">
                                      <h6 className={styles.fundinternaldiv}>
                                        By Cash
                                      </h6>
                                  </div>
                                  <div class="col">
                                    <h6 className={styles.fundinternaldiv}> 
                                      By Bank
                                    </h6>
                                  </div>
                                </div>

                                <div class="col-12">
                                  <h6 className={styles.fundinternaldiv}>
                                        Bank Details
                                    </h6>
                                </div>

                                <div className="col-12">
                                    <div className={styles.financeFunds}>
                                      <select className={`form-select`} aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                      </select>
                                    </div>
                                </div>
                          </form>
                        </div> */}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id}/>
      </div>
    </>
  );
};

export default FinanceManager;
