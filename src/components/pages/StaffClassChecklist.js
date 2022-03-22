import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import UserStaffAboutSection from "../UserStaffAboutSection";
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Success } from "../SnackBar";
import InstituteRoleTab from '../InstituteRoleTab'


const StaffClassChecklist = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [catalogIns, setCatalogIns] = useState("");
  const [classData, setClassData] = useState("");
  const [catalogStudent, setCatalogStudent] = useState([]);
  const [checklistStudentData, setChecklistStudentData] = useState([]);

  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        // console.log(res)
        const institute = res.data.staff.institute;
        setCatalogIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {
        // console.log(res)
        const Cdata = res.data.classes;
        const studentData = res.data.classes.ApproveStudent;
        const checklistData = res.data.classes.checklist;
        setClassData(Cdata);
        setCatalogStudent(studentData);
        setChecklistStudentData(checklistData);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const [checkData, setCheckData] = useState("");
  const [studentChecklist, setStudentChecklist] = useState([]);


  const ChecklistHandlers = (e) => {
    const check = e.target.value
    axios
      .get(`${requestURL}/checklist/${check}`,)
      .then((res) => {
        // console.log(res)
        const check = res.data.checklist;
        setCheckData(check);
        setStudentChecklist(res.data.checklist.student);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });


  const ChecklistAllotted = (siid, ciid) => {
    axios
      .post(`${requestURL}/student/${siid}/checklist/${ciid}`)
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });

      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  };
  return (
    <>
          {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}

      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.id} />
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
                  <h3>{classData.className} Class Checklist</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  <div className={`my-4 ${styles.ddetail}`}>
                  <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-2">                      
                    <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/catalog/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/catalog-icon.svg" alt="Register" />
                          &nbsp; Catalog
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/mark/attendence/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img
                            src="/images/s-attendence-icon.svg"
                            alt="attendance"
                            title="Attendence"
                          />                          
                          &nbsp; Attendence
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/fee/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img
                            src="/images/finance-icon.svg"
                            alt="attendance"
                            title="Finance"
                          />                         
                           &nbsp; Fees
                        </span>
                      </div>
                      </div>
                    <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/behaviour/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img
                            src="/images/behaviour-icon.svg"
                            alt="attendance"
                            title="Behaviour"
                          />
                          &nbsp; Behaviour
                        </span>
                      </div>
                      </div>
                    </div>
                    <form>
                      <div className=" col-12 col-md-6 my-5 d-flex justify-content-space-between">
                        <select
                          id="csearch"
                          class="form-select form-select-lg" aria-label="Default select example"
                          onChange={ChecklistHandlers}
                        >
                          <option value="Select Checklist">
                            Select Checklist
                          </option>
                          {checklistStudentData &&
                            checklistStudentData.map((st) => (
                              <option value={st._id}>{st.checklistName}</option>
                            ))}
                        </select>
                        
                      </div>
                    </form>
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>GR No.</TableCell>
                          <TableCell align="right">Student Name</TableCell>
                          {checkData.checklistFees === 'Yes' ? 
                          <TableCell align="right">Fee Status</TableCell>
                          : ''}
                          <TableCell align="right">{checkData && checkData.checklistName}</TableCell>
                          {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {catalogStudent.map((ct) => (
                          <TableRow
                            key={ct.studentGRNO}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {ct.studentGRNO}
                            </TableCell>
                            <TableCell align="right">
                            {`${ct.studentFirstName} ${ct.studentMiddleName ? ct.studentMiddleName : ''} ${ct.studentLastName}`}
                            </TableCell>
                            {checkData.checklistFees === 'No' ? '' :
                            <TableCell align="right">
                            {
                            checkData ? ct.onlineCheckList &&
                                ct.onlineCheckList.some((et) => et._id === checkData._id) ? (
                                  <span className=" text-info">
                                    <input type="checkbox" checked/>
                                  </span>
                                ) : (
                                  <span className=" text-danger">
                                    <input type="checkbox"/>
                                  </span>
                                ) : ''}
                            </TableCell>
                            }
                            <TableCell align="right">
                            {checkData ? (
                                studentChecklist && studentChecklist.some((et) => et._id === ct._id) ?
                                   (
                                    <span >
                                      {/* assigned */}
                                      <input
                                        type="checkbox"
                                        className="mx-3"
                                        checked
                                      />
                                    </span>
                                  ) : (
                                    checkData.checklistFees === 'Yes' ? 
                                    <span >
                                      {checkData ? ct.onlineCheckList &&
                                      ct.onlineCheckList.some((et) => et._id === checkData._id) ? 
                                      <input
                                        type="checkbox"
                                        id={`stucheck${ct._id}`}
                                        className="mx-3"
                                        onClick={() => {ChecklistAllotted(ct._id,checkData._id);
                                        }}
                                      />
                                    : 
                                    <input
                                        type="checkbox"
                                        id={`stucheck${ct._id}`}
                                        className="mx-3"
                                      /> 
                                    : ''}
                                    </span>
                                    : 
                                    <span >
                                      <input
                                        type="checkbox"
                                        id={`stucheck${ct._id}`}
                                        className="mx-3"
                                        onClick={() => {ChecklistAllotted(ct._id,checkData._id);
                                        }}
                                      />
                                    </span>
                                    )
                                ) : (
                                  ""
                                )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                   
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default StaffClassChecklist;



