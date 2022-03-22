import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import UserStaffSideBar from "../UserStaffSideBar";
import InstituteRoleTab from "../InstituteRoleTab";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import UserStaffAboutSection from "../UserStaffAboutSection";
import NewExpenseCard from './NewExpenseCard'
import { requestURL } from '../ReqUrl'
import axios from 'axios'
import moment from 'moment'

const FinanceExpenses = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1)
  const params = useParams()
  const [data, setData] = useState(true);
  const [addClass, setAddClass] = useState(false);
  const [fExpenseData, setFExpenseData] = useState([])
  const [cashData, setCashData] = useState([])
  const [bankData, setBankData] = useState([])
  const [showPost, setShowPost] = useState(true);
  const [financeData, setFinanceData] = useState('')

  const setAddClassFunction = () => {
    setAddClass(false);
    setData(true);
  };

  useEffect(() =>{
    if(showPost){
    axios.get(`${requestURL}/finance/detail/${params.fid}`)
    .then((res) =>{ 
      setFinanceData(res.data.finance)
      setFExpenseData(res.data.finance.expenseDepartment)
      setShowPost(false)
    })
    }
  },[showPost])

  const onShowPost = () => {
    setShowPost(true);
  };

  const CashHandler = () =>{
    axios.post(`${requestURL}/all/expenses`,{
      queryStatus: 'By Cash'
    })
    .then((res) =>{
      setCashData(res.data.expense)
    })
    const cash = document.querySelector('.cashDetail')
    const bank = document.querySelector('.bankDetail')
    const all = document.querySelector('.allDetail')
    all.style.display = 'none'
    bank.style.display = 'none'
    cash.style.display = 'inline'
  }

  const BankHandler = () =>{
    axios.post(`${requestURL}/all/bank/expenses/`,{
      queryStatus: 'By Bank'
    })
    .then((res) =>{
      setBankData(res.data.expense)
    })
    const cash = document.querySelector('.cashDetail')
    const bank = document.querySelector('.bankDetail')
    const all = document.querySelector('.allDetail')
    cash.style.display = 'none'
    all.style.display = 'none'
    bank.style.display = 'inline'
  }

  var cashTotal = 0
  var cashAmount = cashData.map((ct) => (
    cashTotal = ct.expenseAmount + cashTotal
  ))

  var bankTotal = 0
  var cashAmount = bankData.map((ct) => (
    bankTotal = ct.expenseAmount + bankTotal
  ))

  var allTotal = 0
  var allAmount = fExpenseData.map((ct) => (
    allTotal = ct.expenseAmount + allTotal
  ))

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

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
                
              <div className="row">
                <div className="col-12 col-md-10">
                <h4>Expenses</h4>
                </div>
                <div className="col-12 col-md-2">
                  <button type="button" className="btn btn-primary">
                  <i className="fas fa-plus-square"
                            onClick={() => {
                              setAddClass(true);
                            }}
                            />
                  </button>
                              
                </div>
              </div>
                
                 <>
                  <div className={` ${styles.outer2}`}>
                    <form className={`row mt-5 ${styles.funds}`}>
                        <div className={`mt-3 ${styles.fundinternal}`}>
                            <h4>
                              <select className="form-select mx-auto" style={{width: '50%'}}>
                                  <option value="Filter By Date">Filter By Date</option>
                              </select>
                            </h4>
                            Total -
                            <span className="allDetail text-muted">
                              
                                {financeData ? 
                                ` ${financeData.financeBankBalance + financeData.financeSubmitBalance}` 
                                :  
                                ''}
                              </span>
                              <span className="cashDetail text-muted" style={{display: 'none'}}>
                                
                                {financeData ? 
                                ` ${financeData.financeSubmitBalance}` 
                                :  
                                ''}
                              </span>
                              <span className="bankDetail text-muted" style={{display: 'none'}}>
                                 
                                {financeData ? 
                                ` ${financeData.financeBankBalance}` 
                                : ''}
                              </span>
                            <hr/>
                        </div>
                        
                    
                        <div class="row">
                            <div class="col" onClick={CashHandler}
                            >
                                <h6 className={styles.fundinternaldiv}
                                >
                                  By Cash
                                </h6>
                            </div>
                            <div class="col" onClick={BankHandler}
                            >
                              <h6 className={styles.fundinternaldiv}
                              > 
                                By Bank
                              </h6>
                            </div>
                        </div>



                        <div className={`mt-5 ${styles.fundinternal}`}>
                            <h4>Income History</h4>
                            <hr/>
                        </div>
                        <div class="row">
                            <div className={styles.fundCardContainer}>
                          {fExpenseData && fExpenseData.map((ft) =>(
                            <div className={styles.funn}>
                              <div>
                                  <h6>Paid To - {ft.expensePaid}</h6>
                                <div className={styles.funnInternal}>
                                  <p>Date - {moment(ft.createdAt).format('DD-MM-YYYY')}</p>
                                  <p>Purpose - {ft.expensePurpose.substr(0,20)}</p>
                                </div>
                              </div>

                              <div>
                                <h5>Amount: {`Rs.${ft.expenseAmount}`}</h5>
                                <h6>
                                  {ft.expenseAck ? 
                                  <img src="/images/attach-icon.svg" className="mx-2" title="Attach"
                                  onClick={() =>
                                    openInNewTab(
                                      `${requestURL}/finance/expense/ack/${ft.expenseAck}`
                                    )
                                  }/>
                                  : ''}
                                  Type - {ft.expenseAccount}</h6>
                              </div>
                            </div> 
                          ))}  
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
      <NewExpenseCard
        setAddClassFunction={setAddClassFunction}
        trigger={addClass}
        setTrigger={setAddClass}
        sid={params.sid}
        fid={params.fid}
        onShowPost={onShowPost}
        amount={financeData ? financeData.financeBankBalance + financeData.financeSubmitBalance : ''}
      />
    </>
  );
};

export default FinanceExpenses;



