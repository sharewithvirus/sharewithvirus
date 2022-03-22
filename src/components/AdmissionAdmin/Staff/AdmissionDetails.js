import React, { useState, useEffect } from 'react'
import { useNavigate, useParams  } from "react-router";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../../ReqUrl";
import axios from "axios";
import moment from 'moment'

function AdmissionDetails(props) {

    const navigate = useNavigate();
    const params = useParams();


    const [ index, setIndex ] = useState(1)

    const [ totalApplyedSt, setTotalAppliedSt ] = useState()
    // sorted List
    const [ stSortedList, setStSortedList  ] = useState([])
    const [ currentRound, setCurrentRound  ] = useState()

    

    let firstbg, secondbg, thirdbg;
    {index === 0 ? firstbg = '#39C0ED' : index === 1 ? secondbg = '#39C0ED' : thirdbg = '#39C0ED'}
    
    // Functions

    const selectStudent = ()=> {



    axios
        .get(`${requestURL}/admission-applications-details/${params.sid}`)
        .then((res) => {

        })
        .catch((e) => {
            console.log("Something Went Wrong");
        });
    }

    function checkRound(List){   
        let RoundList = List;
        let todayDate = moment().format();
        let round;
        for (let i = 0; i < RoundList.length; i++) {
            if(RoundList[i].applicationStartDate <  todayDate && RoundList[i].admissionLastDate >  todayDate ){
                return round = RoundList[i]
            } 
        }
        return round;
    }

    function dateCheck(round){
        let todayDate = moment().format();
        let dateStatus;
        if(round.applicationStartDate <  todayDate && round.admissionLastDate >  todayDate ){
            dateStatus = true;
        }else{
            dateStatus = false;
        }
        return dateStatus;
    }

    // Effect
    useEffect(() => {
        
        let todayDate = moment().format();

        let actRound = checkRound(props.activeApp.rounds)
        setCurrentRound(actRound);

        const checkDate = dateCheck(actRound);
        console.log(checkDate)

        let filterStatus = props.activeApp.formDetails.studentFilterField;
        let dataList = props.activeApp.studentData;
            console.log(dataList)
        let sList;
        if(filterStatus === true){
            let sortList = dataList.sort(function(a, b){return a.studentDetails.studentFilterField-b.studentDetails.studentFilterField});
            let slist = sortList.reverse();
            setStSortedList(slist);
            sList = slist;
        }else{
            setStSortedList(dataList);
        }
        if(props.activeApp.autoUpdateProcess.selectionStatus === "Updated"){
            return
        }else{
            if(filterStatus === true && actRound.applicationLastDate < todayDate && todayDate < actRound.applicationLastDate++ ){
            
                console.log(stSortedList)
                let qualifyStudentList = sList.slice(0, (props.activeApp.availableSeats - props.activeApp.managementSeats))
                console.log(qualifyStudentList)
                axios
                    .post(`${requestURL}/admission-application/confirm-student/${props.activeApp._id}`, { qualifyStudentList, actRound } )
                    .then((res) => {
                        if( res.data.msg === "Student Move to Selected SuccessFully" ){
                            axios
                                .get(`${requestURL}/admission-applications-details/${params.sid}`)
                                .then((res) => {
                                    let ApplicationList = res.data.adAdminData.departmentApplications;
                                    let actApplication = ApplicationList.find(x => x._id === props.activeApp._id)
                                    console.log(actApplication)
                                })
                                .catch((e) => {
                                    console.log("Something Went Wrong");
                                });
                        }
                    })
                    .catch((e) => {
                    console.log("Something Went Wrong");
                    });
            }else{
            }
        }
        }, []);


return (
    <>
        <div className="d-flex justify-content-center">
            <div className={` ${styles.newAdmision}`}>
                <i class="fas fa-angle-left" ></i>
                <div>
                    <h5>{ props.activeApp ? props.activeApp.applicationTitle : ""}</h5>
                    <p>{ currentRound ? currentRound.roundName : ""}</p>
                </div>
                <i class="fas fa-file" onClick={()=>props.changeShow(2)}></i>
            </div>
        </div>
        <hr/>

        <div className="d-flex justify-content-evenly w-80 ">
            <div onClick={()=> setIndex(0)}>
                <div className={styles.customdiv} style={{backgroundColor: firstbg}}></div>
                <p>Total</p>
            </div>
            <div onClick={()=> setIndex(1)}>
                <div className={styles.customdiv} style={{backgroundColor: secondbg}}></div>
                <p>Selected</p>
            </div>
            <div className={styles.customparent} onClick={()=> setIndex(2)}>
                <div className={styles.customdiv} style={{backgroundColor: thirdbg}}></div>
                <p >Confirmed</p>
            </div>
        </div>
        <hr/>

        <div className='d-flex justify-content-evenly align-items-center'>
            <div>
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-search"></i></span>
                    
                </div>
                <input type="text" class="form-control" placeholder='Search'  aria-label="Amount (to the nearest dollar)"/>
                </div>
            </div>
            <p className={styles.custdiv}>Availbale Seats: {props.activeApp.availableSeats}</p>
            <p className={styles.custdiv}>Availbale Management Seats: {props.activeApp.managementSeats}</p>
            <p className={styles.custdiv}>Application Received: {props.activeApp.studentData ? (props.activeApp.studentData).length : 0}</p>
        </div>

        {index === 0 && 
            <div className='d-flex justify-content-center'>
            <div className={styles.admisiondetails}>
            
            {stSortedList &&
                stSortedList.map((ct)=> (
                    ct.studentStatus === "Applied" ? (
                        <div className={`px-3 ${styles.custdiv2}`}>
                        <div className='d-flex align-items-center gap-4'>
                            <img src='images/profile.jpeg' alt='profile' />
                            <div className='mt-3'>
                                <h6>{ct.studentDetails ? ct.studentDetails.studentFirstName : ""} {ct.studentDetails ? ct.studentDetails.studentMiddleName : ""} {ct.studentDetails ? ct.studentDetails.studentLastName : ""}</h6>
                                <p>Marks: {ct.studentDetails ? ct.studentDetails.studentFilterField : ""}</p> 
                            </div>
                        </div>
                        <button type="button" className={`btn btn-secondary  ${styles.customdiv2btn}`} >Select</button>
                        </div>
                    ) : (ct.studentStatus === "Selected") ? (
                        <div className={`px-3 ${styles.custdiv2}`}>
                            <div className='d-flex align-items-center gap-4'>
                                    <img src='images/profile.jpeg' alt='profile' />
                                <div className='mt-3'>
                                    <h6>{ct.studentDetails ? ct.studentDetails.studentFirstName : ""} {ct.studentDetails ? ct.studentDetails.studentMiddleName : ""} {ct.studentDetails ? ct.studentDetails.studentLastName : ""}</h6>
                                    <p>Marks: {ct.studentDetails ? ct.studentDetails.studentFilterField : ""}</p>
                                </div>
                            </div>
                                <button type="button" className={`btn btn-primary ${styles.customdiv2btn}`}  >Selected</button>
                        </div>
                        ) : (ct.studentStatus === "Rejected") ? (
                        <div className={`px-3 ${styles.custdiv2}`}>
                            <div className='d-flex align-items-center gap-4'>
                                    <img src='images/profile.jpeg' alt='profile' />
                            <div className='mt-3'>
                                    <h6>{ct.studentDetails ? ct.studentDetails.studentFirstName : ""} {ct.studentDetails ? ct.studentDetails.studentMiddleName : ""} {ct.studentDetails ? ct.studentDetails.studentLastName : ""}</h6>
                                    <p>Marks: {ct.studentDetails ? ct.studentDetails.studentFilterField : ""}</p>
                            </div>
                        </div>
                                <button type="button" className={`btn btn-danger ${styles.customdiv2btn}`} >Rejected</button>
                        </div>
                        ) : (ct.studentStatus === "Applied through Management") ? (
                        <div className={`px-3 ${styles.custdiv2}`}>
                            <div className='d-flex align-items-center gap-4'>
                                    <img src='images/profile.jpeg' alt='profile' />
                            <div className='mt-3'>
                                    <h6>{ct.studentDetails ? ct.studentDetails.studentFirstName : ""} {ct.studentDetails ? ct.studentDetails.studentMiddleName : ""} {ct.studentDetails ? ct.studentDetails.studentLastName : ""}</h6>
                                    <p>Marks: {ct.studentDetails ? ct.studentDetails.studentFilterField : ""}</p>
                            </div>
                        </div>
                                <button type="button" class="btn btn-info" >Applied through Management</button>
                        </div>
                        ) : (
                        <div className={`px-3 ${styles.custdiv2}`}>
                            <div className='d-flex align-items-center gap-4'>
                                    <img src='images/profile.jpeg' alt='profile' />
                            <div className='mt-3'>
                                    <h6>{ct.studentDetails ? ct.studentDetails.studentFirstName : ""} {ct.studentDetails ? ct.studentDetails.studentMiddleName : ""} {ct.studentDetails ? ct.studentDetails.studentLastName : ""}</h6>
                                    <p>Marks: {ct.studentDetails ? ct.studentDetails.studentFilterField : ""}</p>
                            </div>
                            </div>
                            <button type="button" className={`btn btn-danger ${styles.customdiv2btn}`} >Error</button>
                        </div>
                        )
                ))}

                {/* <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/profile.jpeg' alt='profile' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>10th Mark: 455</p> 
                        </div>
                    </div>
                    <button type="button" className={`btn btn-primary ${styles.customdiv2btn}`}  >Selected</button>
                </div>

                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/profile.jpeg' alt='profile' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>10th Mark: 455</p> 
                        </div>
                    </div>
                    <button type="button" className={`btn btn-secondary  ${styles.customdiv2btn}`} >Select</button>
                </div>

                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/profile.jpeg' alt='profile' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>10th Mark: 455</p> 
                        </div>
                    </div>
                    <button type="button" className={`btn btn-danger ${styles.customdiv2btn}`} >Rejected</button>
                </div>

                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/image-girl1.png' alt='profile.jpeg' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>10th Mark: 455</p> 
                        </div>
                    </div>
                    <button type="button" class="btn btn-info" >Applied through Management</button>
                </div> */}
        </div>
        </div>
    }

        {index === 1 && 

            <div className='d-flex justify-content-center'>
            <div className={styles.admisiondetails}>
                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/image-girl1.png' alt='profile.jpeg' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>10th Mark: 455</p> 
                        </div>
                    </div>
                    <button type="button" className={`btn btn-secondary`}  >Select</button>
                </div>

                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/image-girl1.png' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>10th Mark: 455</p> 
                        </div>
                    </div>
                    <button type="button" className={`btn btn-secondary `} >Select</button>
                </div>

                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/image-girl1.png' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>10th Mark: 455</p> 
                        </div>
                    </div>
                    <button type="button" className={`btn btn-secondary`} >Select</button>
                </div>

                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/image-girl1.png' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>10th Mark: 455</p> 
                        </div>
                    </div>
                    <button type="button" class="btn btn-secondary" >Select</button>
                </div>
            </div>
            </div>
        }

        {index === 2 && 
            <div className='d-flex justify-content-center'>
            <div className={styles.admisiondetails}>
                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/image-girl1.png' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>Round 1</p> 
                        </div>
                    </div>
                    <div className='d-flex  gap-1'>
                        <button type="button" className={`btn btn-primary`}  >Allot Class</button>
                        <button type="button" className={`btn btn-secondary`}  >Cancel</button>
                    </div>
                </div>

                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/image-girl1.png' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>Round 1</p> 
                        </div>
                    </div>
                    <div className='d-flex  gap-1'>
                        <button type="button" className={`btn btn-primary`}  >Class Alloted</button>
                    </div>
                </div>

                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/image-girl1.png' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>Round 1</p> 
                        </div>
                    </div>
                    <div className='d-flex  gap-1'>
                        <button type="button" className={`btn btn-primary`}  >Allot Class</button>
                        <button type="button" className={`btn btn-secondary`}  >Cancel</button>
                    </div>
                </div>

                <div className={`px-3 ${styles.custdiv2}`}>
                    <div className='d-flex align-items-center gap-4'>
                        <img src='images/image-girl1.png' />
                        <div className='mt-3'>
                            <h6>Name</h6>
                            <p>Round 1</p> 
                        </div>
                    </div>
                    <button type="button" class="btn btn-danger" >Cancelled</button>
                </div>
            </div>
            </div>
        }
        
        
    </>
  )
}

export default AdmissionDetails