import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import {FundCard} from "../FundCard"
import InstituteRoleTab from "../InstituteRoleTab";
import UserStaffSideBar from "../UserStaffSideBar";
import UserStaffAboutSection from "../UserStaffAboutSection";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import axios from 'axios'
import { requestURL } from "../ReqUrl";

const FinanceInternal = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [index, setIndex] = useState(1)
  const [financeData, setFinanceData] = useState('')
  const [collectData, setCollectData] = useState([])
  const [classData, setClassData] = useState([]) 
  const [studentOnlinePaymentData, setStudentOnlinePaymentData] = useState([])

    useEffect(() =>{
        axios.get(`${requestURL}/finance/${params.fid}/class/collect`)
        .then((res) =>{
            setFinanceData(res.data.finance)
            setCollectData(res.data.finance.institute.classRooms)
            setStudentOnlinePaymentData(res.data.finance.institute.ApproveStudent)
        })
        .catch((e) =>{
            console.log('something went wrong')
        })

        axios.get(`${requestURL}/finance/detail/${params.fid}`)
        .then((res) =>{
            setClassData(res.data.finance.classRoom)
        })
    },[])


    var onlineFee = 0
    var amount = studentOnlinePaymentData && studentOnlinePaymentData.map((ct) => (
        ct && ct.onlineFeeList.map((ft) => (
            onlineFee = ft.feeAmount + onlineFee
        ))
    ))

    var onlineChecklist = 0
    var amount = studentOnlinePaymentData && studentOnlinePaymentData.map((ct) => (
        ct && ct.onlineCheckList.map((ft) => (
            onlineChecklist = ft.checklistAmount + onlineChecklist
        ))
    ))

    var offline = 0
    var amount = collectData && collectData.map((ct) => (
       offline = ct.offlineTotalFee + offline
    ))

    // (ct.onlineTotalFee + ct.offlineTotalFee) + onlineOffline
    var onlineOffline = 0
    var amount = collectData && collectData.map((ct) => (
       onlineOffline = ct.classTotalCollected + onlineOffline
    ))

    useEffect(() =>{
        axios.post(`${requestURL}/finance/${params.fid}/online/payment/updated`,{
            balance: onlineFee + onlineChecklist
        }).then((res) =>{

        })
    })
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
                {/* <BackButton /> */}
               
                {index === 1 && 
                 <>
                  <div className={` ${styles.outer2}`}>
                    <div className={``}>
                        <h4 className="my-3">Internal Funds</h4>
                    </div>
                    
                    <form className={`row mt-5 ${styles.funds}`}>
                        <div className={`mt-3 ${styles.fundinternal}`}>
                            <h4>Total Raised - {financeData ? financeData.financeBankBalance + financeData.financeSubmitBalance : 0}</h4>
                            <hr/>
                        </div>
                        
                    
                    <div class="row">
                        <div class="col">
                            <h6 className={styles.fundinternaldiv}
                            >
                                Online: {financeData ? financeData.financeBankBalance : 0}
                            </h6>
                        </div>
                        <div class="col">
                             <h6 className={styles.fundinternaldiv}> 
                                Offline: {financeData ? financeData.financeSubmitBalance : 0}
                                {/* {offline ? offline : 0}                                 */}
                            </h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h6 className={styles.fundinternaldiv}>
                                Collected but not submitted: {financeData.financeSubmitBalance === onlineOffline ? financeData.financeSubmitBalance - onlineOffline : 0}
                            </h6>
                        </div>
                        <div class="col"
                        onClick={()=>setIndex(2)}
                        >
                            <h6 className={styles.fundinternaldiv}>
                                Submitted: {financeData ? financeData.financeSubmitBalance : 0}
                            </h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h6 className={styles.fundinternaldiv}>
                                Exempted: 0
                            </h6>
                        </div>
                        <div class="col">
                             <h6 className={styles.fundinternaldiv}>
                                Remaining: {financeData.financeSubmitBalance === onlineOffline ? financeData.financeSubmitBalance - onlineOffline : 0}
                            </h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h6 className={styles.fundinternaldiv}>
                                Application: 0
                            </h6>
                        </div>
                        <div class="col">
                             <h6 className={styles.fundinternaldiv}>
                                Admission: 0
                            </h6>
                        </div>
                    </div>

                        {/* <div className="col-12 mb-2 d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-outline-primary mt-4 px-5"
                            onClick={()=> setIndex(2)}
                        >
                            Raise For All
                        </button>
                        </div> */}
                    </form>
                    </div>
                 </>
                }
                {index === 2 && 
                    <>
                        <div className={`${styles.scoreGlobal2} mt-4`}>
                          <div class={`form-group ${styles.createQuestionBack}`}>
                            <i class="fa fa-arrow-left" aria-hidden="true" onClick={()=>setIndex(1)}></i>
                            <h4>Submission Requests</h4>
                          
                             <div></div>
                          </div>
                        </div>
                      
                        <div className={`${styles.financefunds} mb-4`}>
                            <div className="">
                                <div class="input-group rounded">
                                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                    <span class="input-group-text border-0" id="search-addon">
                                        <i class="fas fa-search mt-2"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex gap-2 mb-4">
                                <button type="button" className="btn btn-outline-primary py-2 mt-4 px-5" onClick={()=> setIndex(2)}>
                                   Received
                                </button>
                                <button type="button" className="btn btn-outline-primary mt-4 px-5" onClick={()=> setIndex(2)}>
                                    Pending
                                </button>
                            </div>
                        </div>

                        {/* className={styles.fundCardContainer}  */}
                    <div className="mt-3">
                        <FundCard data={classData} id={params.fid}/>
                        
                    </div>


                        
                    </>
                }
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id}/>
      </div>
    </>
  );
};





export default FinanceInternal;



