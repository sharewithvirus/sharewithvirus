import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from 'axios'
import { requestURL } from "../ReqUrl";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const ClassFeeHistory = () => {
  const navigate = useNavigate();
  const params = useParams()

  const [catalogIns, setCatalogIns] = useState('')
  const [classData, setClassData] = useState('')
  const [catalogStudent, setCatalogStudent] = useState([])
  const [feeStudentData, setFeeStudentData] = useState([])
  const [feeStudentList, setFeeStudentList] = useState([])
  const [first, setFirst] = useState(false)

  useEffect(() =>{
      axios.get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) =>{
          // console.log(res)
          const institute = res.data.staff.institute
          setCatalogIns(institute)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })

      axios.get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) =>{
          // console.log(res)
          const Cdata = res.data.classes
          const studentData = res.data.classes.ApproveStudent
          const feeData = res.data.classes.fee
          setClassData(Cdata)
          setCatalogStudent(studentData)
          setFeeStudentData(feeData)
          setFirst(true)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })
      
  },[])

  const [checkData, setCheckData] = useState('')
  const [checkfeeStatus, setCheckFeeStatus] = useState('')
  const [checkDataList, setCheckDataList] = useState([])


  const Feeshandlers = (e) => {
    const fee = e.target.value
    axios
      .get(`${requestURL}/fees/${fee}`)
      .then((res) => {
        const fee = res.data.feeData;
        setCheckData(fee);
        setCheckDataList(res.data.feeData.studentsList)
        setCheckFeeStatus(res.data.feeData.feeStudent);
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
                    <h3>{classData.className} Class Fee</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  <div className={`my-4 ${styles.ddetail}`}>
                  <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-2">                      
                    <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/class/catalog/${params.cid}`)}
                      >
                        <span>
                        <img src="/images/catalog-icon.svg" alt="Register" />
                          <p className={styles.ttext}> </p>&nbsp; Catalog
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/class/mark/attendence/${params.cid}`)}
                      >
                        <span>
                        <img src="/images/s-attendence-icon.svg" title="Attendence"/> 
                          <p className={styles.ttext}> </p>&nbsp; Attendence
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div
                        className={`${styles.dTab} my-2`}
                      >
                        <span>
                        <img src="/images/finance-icon.svg" title="Finance"/> 
                          <p className={styles.ttext}> </p>&nbsp; Fees
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/class/behaviour/${params.cid}`)}
                      >
                        <span>
                        <img src="/images/behaviour-icon.svg" title="Behaviour"/>
                          <p className={styles.ttext}> </p>&nbsp; Behaviour
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/class/finalreport/${params.cid}`)}
                      >
                        <span>
                        <img src="/images/final-report-icon.svg" title="Final Report"/>
                          <p className={styles.ttext}> </p>&nbsp; Final Report
                        </span>
                      </div>
                      </div>
                    </div>
                    <form>
                    <div className=" col-12 col-md-6 my-5 d-flex justify-content-space-between">
                    <select
                   id="csearch"
                   onChange={Feeshandlers}
                   class="form-select form-select-lg" aria-label="Default select example">
                       <option selected disabled>Select Fees </option>
                       {feeStudentData &&
                            feeStudentData.map((st) => (
                              <option value={st._id}>{st.feeName}</option>
                            ))}
                   </select>                       
                    </div>
                    </form>
                    <h4 className="my-3">Students List</h4>
                    
                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                    {checkDataList && checkDataList.map((st) => (
                  <div
                    className={` ${styles.dlogo} ${styles.cardView}`}
                  >
                    <p className={styles.dlogoText}>
                    <img className={styles.insUserProfiles} 
                    src={
                      st.photoId === "1"
                        ? "/images/image-boy2.png"
                        : first
                        ? `${requestURL}/search/insdashboard/studentdata/photo/${st.studentProfilePhoto}`
                        : null
                    }
                    alt="Profile"
                    />
                      <br/>
                      <small>{`(${st.studentGRNO})`}</small>
                      <br/>
                      <small> {`${st.studentFirstName} ${st.studentMiddleName ? st.studentMiddleName :''} ${st.studentLastName}`}</small>
                      <br/>
                      <span className="mx-2 text-success">Paid ({checkData.feeName})</span> 
                    </p>
                  </div>
                    ))}
                  </div>
                  </div>
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

export default ClassFeeHistory;
