import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import AboutSection from "../AboutSection";
import InstituteSidebar from "../InstituteSidebar";
import ProfileDisplaySection from "../ProfileDiaplaySection";
import NewBankDetails from "../NewBankDetails";
import UpdateBankDetails from '../UpdateBankDetails'
import InstituteStatsSection from "../InstituteStatsSection";
// import BackButton from "../BackButton";
import { Success } from "../SnackBar";

import axios from "axios";
import { requestURL } from "../ReqUrl";
import NewFinanceDetailBar from "../NewFinanceDetailBar";

const FinanceDepartmentBalance = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [financeData, setFinanceData] = useState('')
  const [bankMessage, setBankMessage] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  })

  useEffect(() => {
    axios
      .get(`${requestURL}/finance/detail/${params.fid}`)
      .then((res) => {
        setFinanceData(res.data.finance);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const [addClass, setAddClass] = useState(false);
  const [addUpdate, setAddUpdate] = useState(false);

  const setAddClassFunction = () => {
    setAddClass(false);
  };
  const setAddUpdateFunction = () => {
    setAddUpdate(false);
  };

  const RemoveBankDetails = (id) =>{
    axios.post(`${requestURL}/finance/ins/bank/${id}`)
    .then((res) =>{
        setBankMessage({
          showMessages: true,
          msg: res.data.message,
        })
    }).catch((e) =>{
      console.log('something went wrong')
    })
  }

  return (
    <>
    {bankMessage.showMessages ? <Success msg={bankMessage.msg} /> : null}
        <NavbarTopInstitute id={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />

                <InstituteSidebar id={params.id} />
                <div className={styles.rightCols}>
                  <InstituteStatsSection />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div
                  className={`mt-1 ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection
                    coverPicSrc={"/images/other-places-cover-photo.jpg"}
                    profilePicSrc={"/images/department-avatar.jpeg"}
                  />
                  <NewFinanceDetailBar
                    financeText={financeData}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-6">
                        <div className={`${styles.dTab} ${styles.active} `}
                        onClick={() => navigate(`/ins/${params.id}/finance/profile/${financeData._id}`)}
                        >
                          <span>
                            <img src="/images/info-icon.svg" title="Info" />
                          </span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div
                          className={`${styles.dTab} `}
                        >
                          <span>
                            <img src="/images/batch-icon.svg" title="Batch" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <form className="row mt-0"> */}
                  <div className={` ${styles.outer2}`}>
                    <form className={`row mt-5 ${styles.funds}`}>
                        <div className={`mt-3 ${styles.fundinternal}`}>
                            <div className="row">
                                <div className="col-12 col-md-5 mt-2">
                                <h4>
                                <select className="form-select mx-auto" style={{width: '50%'}}>
                                    <option value="Filter By Date" selected disabled>Filter By Date</option>
                                    <option value="Day">Day</option>
                                    <option value="Week">Week</option>
                                    <option value="Month">Month</option>
                                    <option value="Year">Year</option>
                                </select>
                                </h4>
                                </div>
                                <div className="col-12 col-md-7 mt-2">
                                    {financeData.institute && financeData.institute.bankAccountNumber ? 
                                    <div id="btnGroup" className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto" role="group">
                                    <button type="button" class={`btn btn-primary px-5 `} onClick={() => {setAddUpdate(true)}}>
                                      Edit Details
                                    </button>
                                    <button type="button" class={`btn btn-secondary px-5`} onClick={() => {RemoveBankDetails(financeData.institute._id)}}>
                                      Remove
                                    </button>
                                  </div> 
                                    :
                                    <button type="button" className="btn btn-primary px-5 mx-auto" onClick={() => {setAddClass(true)}}>Add Bank Details</button>
                                    }
                                </div>
                            </div>
                            <h4 className="text-muted">Total - {financeData ? financeData.financeBankBalance + financeData.financeSubmitBalance : 0}</h4>
                            {/* <span className="allDetail text-muted">
                              
                                
                              </span>
                              <span className="cashDetail text-muted" style={{display: 'none'}}>
                                
                                
                              </span>
                              <span className="bankDetail text-muted" style={{display: 'none'}}>
                                 
                                
                              </span> */}
                            <hr/>
                        </div>
                        
                    
                        <div class="row">
                            <div class="col"
                            >
                                <h6 className={styles.fundinternaldiv}
                                >
                                  By Cash - {financeData ? financeData.financeSubmitBalance : 0}
                                </h6>
                            </div>
                            <div class="col"
                            >
                              <h6 className={styles.fundinternaldiv}
                              > 
                                By Bank - {financeData ? financeData.financeBankBalance : 0}
                              </h6>
                            </div>
                        </div>   
                    </form> 
                    </div>                  
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomInstitute id={params.id} />
        <NewBankDetails
        setAddClassFunction={setAddClassFunction}
        trigger={addClass}
        setTrigger={setAddClass}
        fid={params.fid}
        id={financeData.institute ? financeData.institute._id : ''}
      />
      {financeData.institute ? 
      <UpdateBankDetails
        setAddUpdateFunction={setAddUpdateFunction}
        trigger={addUpdate}
        setTrigger={setAddUpdate}
        fid={params.fid}
        id={financeData.institute ? financeData.institute._id : ''}
        data={financeData.institute}
      />
      : '' }
    </>
  );
};

export default FinanceDepartmentBalance;
