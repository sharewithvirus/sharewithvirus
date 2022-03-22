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

const FinanceManagerInfo = () => {
  const [index, setIndex] = useState(1);
  const params = useParams()
  const navigate = useNavigate();
  const [financeData, setFinanceData] = useState('')

  useEffect(() =>{
    axios.get(`${requestURL}/finance/detail/${params.fid}`)
    .then((res) =>{
      setFinanceData(res.data.finance)
    })
  },[])


  const [financeInfoData, setFinanceInfoData] = useState({
    financeAbout: "",
    financeEmail: "",
    financePhoneNumber: "",
  });

  const FinanceInfoHandler = (e) => {
    const { name, value } = e.target;
    setFinanceInfoData({
      ...financeInfoData,
      [name]: value,
    });
  };

  const FinanceInfoHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/staff/finance-info/${params.fid}`,
        financeInfoData
      )
      .then((res) => {
        // setAdminMsg({ showMessages: true, msg: res.data.message });

        navigate(
          `/user/${params.id}/staff/${params.sid}/finance/${params.fid}`
        );
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
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
                            <div className={`${styles.dTab}`}
                            onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/finance/${params.fid}`)}
                            >
                              <span>
                                <img src="/images/department-menu-icon.svg" title="Menu">
                                </img>
                              </span>  
                            </div>
                            </div>  
                            <div className="col-4">
                            <div
                              className={`${styles.dTab} ${styles.active}`}
                              
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

                        <form
                    className="row mt-3 mx-2"
                    onSubmit={FinanceInfoHandlerChange}
                  >
                    <div className="col-12 mb-2">
                      <label for="dhead" className="form-label">
                        Finance Head
                      </label>
                      <input
                        type="text"
                        name="dhead"
                        className="form-control"
                        id="dhead"
                        value={
                          financeData.financeHead
                            ? `${financeData.financeHead.staffFirstName} ${
                                financeData.financeHead.staffMiddleName
                                  ? financeData.financeHead.staffMiddleName
                                  : ""
                              } ${financeData.financeHead.staffLastName}`
                            : ""
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dabout" className="form-label">
                        About Finance
                      </label>
                      <input
                        type="text"
                        name="financeAbout"
                        className="form-control"
                        id="dabout"
                        placeholder="Enter Finance About"
                        onChange={FinanceInfoHandler}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="demail" className="form-label">
                        Finance Email
                      </label>
                      <input
                        type="email"
                        name="financeEmail"
                        className="form-control"
                        id="demail"
                        placeholder="Enter Finance Email"
                        onChange={FinanceInfoHandler}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dnumber" className="form-label">
                        Finance Phone No.
                      </label>
                      <input
                        type="tel"
                        name="financePhoneNumber"
                        className="form-control"
                        id="dnumber"
                        placeholder="Enter Finance Phone No."
                        onChange={FinanceInfoHandler}
                      />
                    </div>
                    <div className=" d-flex col-10 flex-row justify-content-center  mt-5 mx-auto">
                      <button
                        type="submit"
                        className="btn btn-outline-primary mt-2 px-5 mx-2"
                      >
                        <i className="fas fa-save">Save</i>
                      </button>
                    </div>
                  </form>

                        
                  
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

export default FinanceManagerInfo;
