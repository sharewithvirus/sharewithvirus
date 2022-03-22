import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from "../../../UserAboutSection";
import { requestURL } from "../../../ReqUrl";
import axios from "axios";
import NavbarBottomUser from "../../../NavbarBottomUser";
import NavbarTopUser from "../../../NavbarTopUser";
import UserSideBar from "../../../UserSideBar";
import moment from 'moment';

const AppliedApplicationsStatus = () => {



    const navigate = useNavigate();
    const params = useParams();


    const [ index, setIndex ] = useState(1)
    const [ applicationList, setApplicationList ] = useState()
    const [ activeApplication, setActiveApplication ] = useState()
    const [ actAppUpdates, setActAppUpdates  ] = useState()
    const [ actUser, setActUser  ] = useState()


// Function Part Starts

    function clickAdDetails(d){

        let actApp = applicationList[d];
        setActiveApplication(actApp);
        setActAppUpdates((actApp.appUpdates).reverse());
        setIndex(2)
    }

    function clickPay(){

    

        axios
            .get(`${requestURL}/admission-applications/${activeApplication._id}/user-confirmation/${params.id}`)
            .then((res) => {
                // let ApplicationList = res.data.adAdminData.departmentApplications;
                // let actApplication = ApplicationList.find(x => x._id === props.activeApp._id)
                // console.log(actApplication)
            })
            .catch((e) => {
                console.log("Something Went Wrong");
            });

    }
// Effect Part Starts

    useEffect(() => {
        axios
            .get(`${requestURL}/user/${params.id}/applied-application`)
            .then((res) => {
                setApplicationList(res.data.applicationList);
            // let appList = res.data.adAdminData.departmentApplications;
            // let appliedApplication = appList.find((e) => {
            //     return e._id === params.aid;
            // });
            // // let actRounds = (appliedApplication.rounds).length;
            // console.log(appliedApplication);
            // console.log(appliedApplication.formDetails);
            // setActiveApplication(appliedApplication);
            // setActiveAppForm(appliedApplication.formDetails);
    
        })
        .catch((e) => {
            console.log("Something Went Wrong");
        });
        }, []);

return (
    <>
            {/* {if(activeApplication){ */}
                <NavbarTopUser uid={params.id} />
                    <div className={styles.mainScreen}>
                        <div className={`${styles.mainContent} `}>
                            <div className="row">
                                <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
                                    <div className={styles.leftBar}>
                                        <UserAboutSection uid={params.id} />
                                            <div className={`${styles.about} ${styles.leftMenu}`}>
                                                <UserSideBar uid={params.id} />
                                            </div>
                                                <div className={styles.rightCols}></div>
                                                </div>
                                            </div>
                                            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
                                            <div className={` h-100 ${styles.about}`} style={{ marginTop: "24px" }}>


                                        { index === 1 &&
                                            <>
                                                <div className="d-flex justify-content-center">
                                                    <div className={`d-flex justify-content-center ${styles.newAdmision}`}>
                                                        <div className="d-flex gap-4 align-items-center">
                                                        <h5>Applied Applications List</h5>
                                                        </div>
                                                        
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center">
                                                    <div className={`border border-dark ${styles.newAdmision} pt-3 px-3 rounded`}
                                                        
                                                    >
                                                        <h5>Application Name</h5>
                                                        <h5> Application Department</h5>
                                                        <h6> Available Seats</h6>
                                                    </div>
                                                    </div>

                                                {applicationList &&
                                                    applicationList.map((ct) => (
                                                    <div className="d-flex justify-content-center">
                                                    <div className={`border border-dark ${styles.newAdmision} ${styles.newAdmision1} pt-3 px-3 rounded`}
                                                        onClick={() => clickAdDetails(applicationList.indexOf(ct))}
                                                    >
                                                        <h5>{ct.appName.applicationTitle}</h5>
                                                        <h5> {ct.appName.applicationForDepartment.dName}</h5>
                                                        <h5> Available Seats: {ct.appName.availableSeats}</h5>
                                                    </div>
                                                    </div>
                                                ))}

                                                
                                            </>
                                        }
                                        {index === 2 &&
                                            <>
                                            <div className="d-flex justify-content-center">
                                                <div className={`d-flex justify-content-center ${styles.newAdmision}`}>
                                                    <div className="d-flex gap-4 align-items-center">
                                                        <h5>Notification Updates For:- {activeApplication.appName.applicationTitle}</h5>
                                                    </div>
                                                </div>
                                            </div>

                                            {actAppUpdates &&
                                                actAppUpdates.map((ct)=>(
                                                    ct.notificationType === 1 ? (
                                                    <div className="d-flex justify-content-center">
                                                    <div className={`border border-dark ${styles.newAdmision} ${styles.newAdmision1} pt-3 px-3 rounded`} >
                                                        <div className="col-12 my-auto justify-items-center">
                                                            <p>{ct.notification}</p>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    ) : ct.notificationType === 2 ? (
                                                    
                                                    <div className="d-flex justify-content-center">
                                                    <div className={`border border-dark ${styles.newAdmision} ${styles.newAdmision1} pt-3 px-3 rounded`} >
                                                        <div className="row col-12">
                                                            <div className="col-9 my-auto justify-items-center">
                                                                <p>{ct.notification}</p>
                                                            </div>
                                                            <div className="col-2">
                                                                <button type="button" className={`btn btn-primary col my-2 mx-auto ${styles.customdiv2btn}`}  >{ct.actonBtnText} </button>
                                                                <button type="button" className={`btn btn-secondary col my-2 mx-auto  ${styles.customdiv2btn}`} >{ct.deActBtnText}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    ) : (
                                                        <div>

                                                        </div>
                                                    )
                                            
                                            
                                            ))}

                                            </>
                                        }
                                    </div>
                            </div>
                    </div>
                </div>

            </div>
            
        <NavbarBottomUser uid={params.id} />
    </>
)
};

export default AppliedApplicationsStatus;
