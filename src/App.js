import React, { useState, useEffect, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import PersonalInfo from "./components/pages/PersonalInfo";
import Notification from "./components/pages/Notification";
import UserProfile from "./components/pages/UserProfile";
import Privacy from "./components/pages/Privacy";
import Account from "./components/pages/Account";
import NewDepartment from "./components/pages/NewDepartment";
import Department from "./components/pages/Departments";
import NewClass from "./components/pages/NewClass";
import NewSubject from "./components/pages/NewSubject";
import CreateDepartment from "./components/pages/CreateDepartment";
import CreateClass from "./components/pages/CreateClass";
import InstituteDashboard from "./components/pages/InstituteDashboard";
import UserDashboard from "./components/pages/UserDashboard";
import Announcement from "./components/pages/Announcement";
import AnnouncementDetail from "./components/pages/AnnouncementDetail";
import ProfileCreation from "./components/pages/ProfileCreation";
import DepartmentCurrentBatch from "./components/pages/DepartmentCurrentBatch";
import DepartmentPreviousBatch from "./components/pages/DepartmentPreviousBatch";
import StaffJoiningInfo from "./components/pages/StaffJoiningInfo";
import StaffApplicationForm from "./components/pages/StaffApplicationForm";
import StaffApplicationReceived from "./components/pages/StaffApplicationReceived";
import AllStaff from "./components/pages/AllStaff";
import StudentJoiningInfo from "./components/pages/StudentJoiningInfo";
import StudentApplicationForm from "./components/pages/StudentApplicationForm";
import AllStudent from "./components/pages/AllStudents";
import Certificates from "./components/pages/Certificates";
import InstituteProfile from "./components/pages/InstituteProfile";
import InstituteJoinAndApply from "./components/pages/InstituteJoinAndApply";
import UserProfileAbout from "./components/pages/UserProfileAbout";
import ClassCatalog from "./components/pages/ClassCatalog";
import BonafideCertificates from "./components/pages/BonafideCertificates";
import InstituteProfileDisplay from "./components/pages/InstituteProfileDisplay";
import InstituteProfileDisplayAbout from "./components/pages/InstituteProfileDisplayAbout";
import InstituteVerificationsCopy from "./components/pages/InstituteVerificationsCopy";
import SearchInstituteJoin from "./components/pages/SearchInstituteJoin";
import SettingsCredit from "./components/pages/SettingsCredit";
import SettingsReferals from "./components/pages/SettingsReferals";
import InstituteProfileTag from "./components/pages/InstituteProfileTag";
import Corridor from "./components/pages/Corridor";
import StudentJoiningForm from "./components/pages/StudentJoiningForm";
import StaffMember from "./components/pages/StaffMember";
import DepartmentsNewBatch from "./components/pages/DepartmentsNewBatch";
import ClassSubject from "./components/pages/ClassSubject";
import UserSignUp from "./components/pages/UserSignup";
import InstituteSearchCopy from "./components/pages/InstituteSearchCopy";
import SearchInstituteStaffCopy from "./components/pages/SearchInstituteStaffCopy";
import SearchInstituteStudentCopy from "./components/pages/SearchInstituteStudentCopy";
import StaffJoiningForm from "./components/pages/StaffJoiningForm";
import SettingPersonalInfo from "./components/pages/SettingPersonalInfo";
import JoiningDetailsSetup from "./components/pages/JoiningDetailsSetup";
import AdminDashboard from "./components/pages/AdminDashboard";
import ARegisteredInstitutes from "./components/pages/ARegisteredInstitutes";
import AVerifiedInstitutes from "./components/pages/AVerifiedInstitutes";
import ABlockedInstitutes from "./components/pages/ABlockedInstitutes";
import StaffFormDetails from "./components/pages/StaffFormDetails";
import StudentjoinformSetup from "./components/pages/StudentjoinformSetup";
import UserOtp from "./components/pages/UserOtp";
import UserCreatePassword from "./components/pages/UserCreatePassword";
import axios from "axios";
import NewBatch from "./components/pages/NewBatch";
import AdminDetailViewIns from "./components/pages/AdminDetailViewIns";
import AdminDetailRejectIns from "./components/pages/AdminDetailRejectIns";
import SearchInstituteProfile from "./components/pages/SearchInstituteProfile";
import ForgotPassword from "./components/pages/ForgotPassword";
import OtpAtForgotPassword from "./components/pages/OtpAtForgotPassword";
import NewUserPassword from "./components/pages/NewUserPassword";
import StaffMemberDetail from "./components/pages/StaffMemberDetail";
import StudentMemberDetail from "./components/pages/StudentMemberDetail";
import StaffDepartmentProfile from "./components/pages/StaffDepartmentProfile";
import StaffClassProfile from "./components/pages/StaffClassProfile";
import StaffDepartmentBatchSetting from "./components/pages/StaffDepartmentBatchSetting";
import StaffDepartmentRoom from "./components/pages/StaffDepartmentRoom";
import StaffDepartmentProfileInfo from "./components/pages/StaffDepartmentProfileInfo";
import StaffDepartmentClass from "./components/pages/StaffDepartmentClass";
import StaffDepartmentFunctionExam from "./components/pages/StaffDepartmentFunctionExam";
import StaffDepartmentChecklist from "./components/pages/StaffDepartmentChecklist";
import StaffDepartmentChecklistHistory from "./components/pages/StaffDepartmentChecklistHistory";
import StaffDepartmentFees from "./components/pages/StaffDepartmentFees";
import StaffClassProfileInfo from "./components/pages/StaffClassProfileInfo";
import StaffClassProfileSubject from "./components/pages/StaffClassProfileSubject";
import SearchUserProfile from "./components/pages/SearchUserProfile";
import TermsAndCondition from "./components/pages/TermsAndCondition";
import PrivacyAndPolicy from "./components/pages/PrivacyAndPolicy";
import StaffClassRequest from "./components/pages/StaffClassRequest";
import StaffClassChecklist from "./components/pages/StaffClassChecklist";
import ClassBehaviour from "./components/pages/ClassBehaviour";
import ClassFee from "./components/pages/ClassFee";
import ClassFeeHistory from "./components/pages/ClassFeeHistory";
import ProfileInInstituteStaff from "./components/pages/ProfileInInstituteStaff";
import ProfileInInstituteStudent from "./components/pages/ProfileInInstituteStudent";
import ProfileInInstituteStudentExtra from "./components/pages/ProfileInInstituteStudentExtra";
import StudentMemberFee from "./components/pages/StudentMemberFee";
import StudentMemberActivity from "./components/pages/StudentMemberActivity";
import ClassAttendence from "./components/pages/ClassAttendence";
import ClassAttendenceHistory from "./components/pages/ClassAttendenceHistory";
import ClassMarkAttendence from "./components/pages/ClassMarkAttendence";
import StaffDepartmentAttendence from "./components/pages/StaffDepartmentAttendence";
import StaffDepartmentMarkAttendence from "./components/pages/StaffDepartmentMarkAttendence";
import StaffDepartmentAttendenceHistory from "./components/pages/StaffDepartmentAttendenceHistory";
import ProfileInInstituteStaffAttendence from "./components/pages/ProfileInInstituteStaffAttendence";
import ViewBonafideCertificate from "./components/pages/ViewBonafideCertificate";
import { requestURL } from "./components/ReqUrl";
import UserAnnouncementDetail from "./components/pages/UserAnnouncementDetail";
import StaffDepartmentHoliday from "./components/pages/StaffDepartmentHoliday";
import SchoolLeavingCertificate from "./components/pages/SchoolLeavingCertificate";
import SchoolLeaving from "./components/pages/SchoolLeaving";
import DepartmentMaster from "./components/pages/DepartmentMaster";
import DepartmentMasterClass from "./components/pages/DepartmentClassMaster";
import DepartmentMasterSubject from "./components/pages/DepartmentSubjectMaster";
import AllUsers from "./components/pages/AllUsers";
import AdminInsApplication from "./components/pages/AdminInsApplication";
import UserInstituteSection from "./components/pages/UserInstituteSection";
import UserStaffSection from "./components/pages/UserStaffSection";
import UserNotification from "./components/pages/UserNotification";
import UserRandomSection from "./components/pages/UserRandomSection";
import SearchDepartment from "./components/pages/SearchDepartment";
import SearchCreateDepartment from "./components/pages/SearchCreateDepartment";
import SearchDepartmentCurrentBatch from "./components/pages/SearchDepartmentCurrentBatch";
import SearchDepartmentsNewBatch from "./components/pages/SearchDepartmentsNewBatch";
import SearchCreateClass from "./components/pages/SearchCreateClass";
import SearchClassSubject from "./components/pages/SearchClassSubject";
import SearchAllStaff from "./components/pages/SearchAllStaff";
import SearchUserAllStaff from "./components/pages/SearchUserAllStaff";
import SearchUserDepartment from "./components/pages/SearchUserDepartment";
import SearchUserCreateDepartment from "./components/pages/SearchUserCreateDepartment";
import SearchUserDepartmentCurrentBatch from "./components/pages/SearchUserDepartmentCurrentBatch";
import SearchUserDepartmentsNewBatch from "./components/pages/SearchUserDepartmentsNewBatch";
import SearchUserCreateClass from "./components/pages/SearchUserCreateClass";
import SearchUserClassSubject from "./components/pages/SearchUserClassSubject";
import SubjectTeacher from "./components/pages/SubjectTeacher";
import SubjectScore from "./components/pages/SubjectScore";
import ClassFinalReport from "./components/pages/ClassFinalReport";
import UserProfileTag from "./components/pages/UserProfileTag";
import ProfileInInstituteViewStaff from "./components/pages/ProfileInInstituteViewStaff";
import ProfileInInstituteViewStudent from "./components/pages/ProfileInInstituteViewStudent";
import InstituteSearchCopyInfo from "./components/pages/InstituteSearchCopyInfo";
import SearchInstituteProfileInfo from "./components/pages/SearchInstituteProfileInfo";
import StudentFormDetails from './components/pages/StudentFormDetails'
import StaffClassSetting from './components/pages/StaffClassSetting'
import InstituteNotification from "./components/pages/InstituteNotification";
import InstituteAccount from "./components/pages/InstituteAccount";


// ============================ Finance =====================

import NewFinanceCard from './components/pages/NewFinanceCard'
import FinanceDepartmentProfile from "./components/pages/FinanceDepartmentProfile";
import FinanceDepartmentBalance from './components/pages/FinanceDepartmentBalance'
import FinanceManager from './components/pages/FinanceManager'
import FinanceManagerInfo from './components/pages/FinanceManagerInfo'
import FinanceInternal from './components/pages/FinanceInternal'
import FinanceIncomes from './components/pages/FinanceIncomes'
import FinanceExpenses from './components/pages/FinanceExpenses'
import FinanceELearning from './components/pages/FinanceELearning'
import SportDepartmentProfile from './components/pages/SportDepartmentProfile'
import SportDepartmentClass from './components/pages/SportDepartmentClass'
import StaffSportEventProfile from "./components/pages/StaffSportEventProfile";
import StaffSportProfileInfo from "./components/pages/StaffSportProfileInfo";
import StaffSportProfileClass from './components/pages/StaffSportProfileClass'
import StaffSportEventMatch from "./components/pages/StaffSportEventMatch";
import StaffSportClassCoach from './components/pages/StaffSportClassCoach'
import StaffSportClassCoachInfo from "./components/pages/StaffSportClassCoachInfo";
import StaffSportClassCoachTeam from './components/pages/StaffSportClassCoachTeam'
import StaffSportIntraMatch from './components/pages/StaffSportIntraMatch'
import StaffSportInterMatch from './components/pages/StaffSportInterMatch'
import Qviple from './components/pages/Qviple'
import StaffLeaveAndTransfer from './components/pages/StaffLeaveAndTransfer'
import StudentMemberComplaint from "./components/pages/StudentMemberComplaint";
import StaffDepartmentBatchComplaint from "./components/pages/StaffDepartmentBatchComplaint";
import StudentComplaintInstitute from "./components/pages/StudentComplaintInstitute";
import StaffClassBatchComplaint from './components/pages/StaffClassBatchComplaint'
import InstituteCorridor from './components/pages/InstituteCorridor'
import AdminInsBankDetail from "./components/pages/AdminInsBankDetail";
import InstituteStudentIDCard from "./components/pages/InstituteStudentIDCard";
import AdminInsIdCard from './components/pages/AdminInsIdCard'
import StudentLeaveAndTransfer from "./components/pages/StudentLeaveAndTransfer";
import AdminReportUsersPost from './components/pages/AdminReportUsersPost'
import ProfileInInstituteStudentExtraMatch from './components/pages/ProfileInInstituteStudentExtraMatch'
import ExcelSheetDownload from './components/pages/ExcelSheetDownload'
import Support from './components/pages/Support'
import SupportInstitute from './components/pages/SupportInstitute'
import StaffDepartmentFeeHistory from "./components/pages/StaffDepartmentFeeHistory";

///////////FOR ECONTENT////////////////

import Wrapper from "./components/E-Content/InstituteSide/Wrapper";
import StaffWrapper from "./components/E-Content/staff/StaffWrapper";
import PlaylistWrapper from "./components/E-Content/staff/PlaylistWrapper";
import VideoPlaylist from "./components/E-Content/components/VideoPlaylist";
import UserPlaylist from "./components/E-Content/Users/UserPlaylist";
import InstitutePlaylistDetail from "./components/E-Content/InstituteSide/InstitutePlaylistDetail";
import StaffVideoPlayer from "./components/E-Content/staff/StaffVideoPlayer";
import UserPlaylistWrapper from "./components/E-Content/Users/UserPlaylistWrapper";
import UserVideoPlayer from "./components/E-Content/Users/UserVideoPlayer";
import LibraryWrapper from "./components/Library/Institute/LibraryWrapper";
import StaffLibraryWrapper from "./components/Library/Staff/StaffLibraryWrapper";
import UserLibraryWrapper from "./components/Library/User/UserLibraryWrapper";

///////////FOR Admission Admin ////////////////

import StaffAdmissionPanel from "./components/AdmissionAdmin/Staff/pages/StaffAdmissionPanel"
import InsAdmissionPanel from "./components/AdmissionAdmin/Institute/pages/InsAdmissionPanel"
import StudentNewApplication from "./components/AdmissionAdmin/Staff/pages/StudentNewApplication"
import AppliedApplicationsStatus from "./components/AdmissionAdmin/User/pages/AppliedApplicationsStatus"


// import Loggin from "./components/pages/Loggin";



const Login = lazy(() => import("./components/pages/Login"));
const InstituteEnquiry = lazy(() =>
  import("./components/pages/InstituteEnquiry")
);
const SignUp = lazy(() => import("./components/pages/SignUP"));

function App(props) {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [LoggedIn, setLoggedIn] = useState(false);
  var userId = localStorage.getItem('userId')
  var instituteId = localStorage.getItem('instituteId')
  var adminId = localStorage.getItem('adminId')

  useEffect(() => {
   
    axios.get(`${requestURL}/ins-login`).then((res) => {
      if (res.data.loggedIn === false) {
        setLoggedIn(false);
        navigate("/");
      } else {
        setLoggedIn(true);
        if(userId){
          navigate(`/userdashboard/${userId ? userId : ''}`)
        }
        else if(instituteId){
          navigate(`/insdashboard/${instituteId ? instituteId : ''}`)
        }
        else if(adminId){
          navigate(`/admindashboard/${adminId ? adminId : ''}`)
        }
      }
    });
  }, []);
  return (
    <Suspense fallback={<div style={{ color: "black" }}>Loading...</div>}>
      <div className="App">
        <Routes>
           <Route path="/" exact element={<Qviple />} />
          <Route
            path="/signup"
            exact
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path="/insenquiry"
            exact
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <InstituteEnquiry />
              </Suspense>
            }
          />

          {/* <Route path="/logins" exact element={<Loggin />} /> */}
          {/* <Route path="/insloginform" exact element={<InsLoginForm />} />
          <Route path="/userloginform" exact element={<UserLoginForm />} /> */}

          <Route
            path="/inslogin/:id"
            exact
            element={<InstituteVerificationsCopy />}
          />
          <Route
            path="/login"
            exact
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            }
          />
          <Route path="/forgot" exact element={<ForgotPassword />} />
          <Route
            path="/user/forgot/password/:fid"
            exact
            element={<OtpAtForgotPassword />}
          />
          <Route
            path="/reset-password/:rid"
            exact
            element={<NewUserPassword />}
          />
          <Route
            path="/terms/and/condition"
            exact
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <TermsAndCondition />
              </Suspense>
            }
          />
          <Route
            path="/privacy/policy"
            exact
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <PrivacyAndPolicy />
              </Suspense>
            }
          />

          <Route
            path="/admindashboard/:aid"
            exact
            element={<AdminDashboard />}
          />
          <Route
            path="/admin/insrequests/:aid"
            exact
            element={<ARegisteredInstitutes />}
          />
          <Route path="/admin/usersrequest/:aid" exact element={<AllUsers />} />

          <Route
            path="/admin/insverified/:aid"
            exact
            element={<AVerifiedInstitutes />}
          />
          <Route
            path="/admin/insreject/:aid"
            exact
            element={<ABlockedInstitutes />}
          />
          <Route
            path="/admin/:aid/view/detail/ins/:id"
            exact
            element={<AdminDetailViewIns />}
          />
          <Route
            path="/admin/:aid/view/detail-reject/ins/:id"
            exact
            element={<AdminDetailRejectIns />}
          />
          <Route
            path="/:aid/ins/application/:id"
            exact
            element={<AdminInsApplication />}
          />

          <Route
            path="/insdashboard/:id"
            exact
            element={<InstituteDashboard />}
          />
          <Route
            path="/ins/notification/:id"
            exact
            element={<InstituteNotification />}
          />
          <Route path="/insdepartment/:id" exact element={<Department />} />
          <Route path="/newdepartment/:id" exact element={<NewDepartment />} />
          <Route
            path="/:id/department/:did"
            exact
            element={<CreateDepartment />}
          />
          <Route
            path="/:id/currentbatch/:did"
            exact
            element={<DepartmentCurrentBatch />}
          />
          <Route
            path="/:id/previousbatch/:did"
            exact
            element={<DepartmentPreviousBatch />}
          />

          <Route path="/:id/createnewbatch/:did" exact element={<NewBatch />} />
          <Route
            path="/:id/departmentmaster/:did/batch/:bid"
            exact
            element={<DepartmentMaster />}
          />
          <Route
            path="/:id/departmentclass/:did/batch/:bid"
            exact
            element={<DepartmentsNewBatch />}
          />

          <Route
            path="/:id/departmentmasterclass/:did/batch/:bid"
            exact
            element={<DepartmentMasterClass />}
          />
          <Route
            path="/user/:id/staff/:sid/subject/:suid"
            exact
            element={<SubjectTeacher />}
          />
          <Route
            path="/user/:id/staff/:sid/subject/score/:suid"
            exact
            element={<SubjectScore />}
          />
          <Route
            path="/user/:id/staff/:sid/department/functions/:did/batch/:bid"
            exact
            element={<StaffDepartmentFunctionExam />}
          />
          <Route
            path="/:id/departmentmastersubject/:did/batch/:bid"
            exact
            element={<DepartmentMasterSubject />}
          />

          <Route
            path="/:id/newclassrooms/:did/batch/:bid"
            exact
            element={<NewClass />}
          />
          <Route
            path="/ins/:id/department/:did/batch/:bid/class/:cid"
            exact
            element={<CreateClass />}
          />
          <Route
            path="/ins/:id/department/:did/batch/:bid/class/:cid/newsubject"
            exact
            element={<NewSubject />}
          />
          <Route
            path="/ins/:id/department/:did/batch/:bid/classsubject/:cid"
            exact
            element={<ClassSubject />}
          />

          <Route
            path="/insuserprofile/:id"
            exact
            element={<InstituteProfile />}
          />
          <Route
            path="/insuserprofileabout/:id"
            exact
            element={<InstituteProfileDisplayAbout />}
          />
          <Route
            path="/insuserprofiletag/:id"
            exact
            element={<InstituteProfileTag />}
          />
          <Route
            path="/insuserprofiledisplay/:id"
            exact
            element={<InstituteProfileDisplay />}
          />


          <Route
            path="/inssetting/:id"
            exact
            element={<SettingPersonalInfo />}
          />
          <Route
            path="/setting/credit/:id"
            exact
            element={<SettingsCredit />}
          />

          <Route
            path="/search/:sid/ins-search-profile/:id"
            exact
            element={<SearchInstituteProfile />}
          />
          <Route
            path="/search/:sid/ins-search-profile/info/:id"
            exact
            element={<SearchInstituteProfileInfo />}
          />
          <Route
            path="/search/:sid/user-search-profile/:id"
            exact
            element={<SearchUserProfile />}
          />
        
          <Route path="/allstaff/:id" exact element={<AllStaff />} />
          <Route path="/allstudent/:id" exact element={<AllStudent />} />
          <Route
            path="/staffrequest/:id"
            exact
            element={<StaffApplicationReceived />}
          />

          <Route path="/staffform/:id" exact element={<StaffJoiningInfo />} />
          <Route
            path="/staffapplication/:id"
            exact
            element={<StaffApplicationForm />}
          />
          <Route
            path="/staffrequest/application/:id"
            exact
            element={<StaffFormDetails />}
          />
          <Route
            path="/classrequest/application/:id"
            exact
            element={<StudentFormDetails />}
          />
          <Route
            path="/joiningdetails/:id"
            exact
            element={<JoiningDetailsSetup />}
          />
          <Route
            path="/studentform/:id"
            exact
            element={<StudentJoiningInfo />}
          />
          <Route
            path="/studentapplication/:id"
            exact
            element={<StudentApplicationForm />}
          />

          <Route
            path="/studentformSetup/:id"
            exact
            element={<StudentjoinformSetup />}
          />
          <Route
            path="/studentcertificates/:id"
            exact
            element={<Certificates />}
          />
          <Route
            path="/staffattendencecopy/:id"
            exact
            element={<StaffLeaveAndTransfer />}
          />
          <Route
            path="/certificatesdetail/:id"
            exact
            element={<BonafideCertificates />}
          />
          <Route
            path="/leaving/certificate/:id"
            exact
            element={<SchoolLeaving />}
          />
          <Route
            path="/ins/:id/student/leaving/certificate/:sid"
            exact
            element={<SchoolLeavingCertificate />}
          />
          <Route
            path="/ins/:id/view/bonafide/:sid"
            exact
            element={<ViewBonafideCertificate />}
          />
          <Route path="/user/corridor/:id" exact element={<Corridor />} />

          <Route path="/announcement/:id" exact element={<Announcement />} />
          <Route
            path="/:iid/announcementdetail/:id"
            exact
            element={<AnnouncementDetail />}
          />
          <Route
            path="/:uid/user/announcementdetail/:id"
            exact
            element={<UserAnnouncementDetail />}
          />

          <Route path="/usersignup" exact element={<UserSignUp />} />
          <Route path="/userotp/:id" exact element={<UserOtp />} />
          <Route
            path="/user/create-password/:id"
            exact
            element={<UserCreatePassword />}
          />
          <Route
            path="/userprofile/:id/status/:uid"
            exact
            element={<ProfileCreation />}
          />
          <Route path="/userdashboard/:id" exact element={<UserDashboard />} />
          <Route path="/userprofiles/:id" exact element={<UserProfile />} />
          <Route
            path="/userprofilesabout/:id"
            exact
            element={<UserProfileAbout />}
          />
          <Route
            path="/userprofiletag/:id"
            exact
            element={<UserProfileTag />}
          />
          <Route
            path="/all/user/:uid/institute"
            exact
            element={<UserInstituteSection />}
          />
          <Route
            path="/all/user/:uid/staff"
            exact
            element={<UserStaffSection />}
          />
          
          <Route
            path="/ins/account/:id"
            exact
            element={<InstituteAccount />}
          />

          <Route
            path="/user/notification/:id"
            exact
            element={<UserNotification />}
          />
          <Route
            path="/user/random/:uid"
            exact
            element={<UserRandomSection />}
          />
          <Route path="/personal/:id" exact element={<PersonalInfo />} />
          <Route path="/privacy/:id" exact element={<Privacy />} />
          <Route path="/account/:id" exact element={<Account />} />
          <Route path="/notifications/:id" exact element={<Notification />} />
          <Route path="/referals/:id" exact element={<SettingsReferals />} />
          <Route
            path="/user/:id/search/insdashboard/:iid"
            exact
            element={<InstituteSearchCopy />}
          />
          <Route
            path="/user/:id/search/insdashboard/info/:iid"
            exact
            element={<InstituteSearchCopyInfo />}
          />
          <Route
            path="/user/:id/insjoinandapply/:iid"
            exact
            element={<InstituteJoinAndApply />}
          />
          <Route
            path="/user/:id/insjoin/:iid"
            exact
            element={<SearchInstituteJoin />}
          />
          <Route
            path="/user/:id/insjoinstaff/:iid"
            exact
            element={<SearchInstituteStaffCopy />}
          />
          <Route
            path="/user/:id/insjoinstudent/:iid"
            exact
            element={<SearchInstituteStudentCopy />}
          />
          <Route
            path="/user/:id/staffjoinform/:iid/staff/:sid"
            exact
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <StaffJoiningForm />
              </Suspense>
            }
          />
          <Route
            path="/user/:id/studentjoinform/:iid/student/:sid"
            exact
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <StudentJoiningForm />
              </Suspense>
            }
          />

          <Route path="/user/:id/staffmember" exact element={<StaffMember />} />
          <Route
            path="/user/:id/staffdetail/:sid"
            exact
            element={<StaffMemberDetail />}
          />

          <Route
            path="/user/:id/studentdetail/:sid"
            exact
            element={<StudentMemberDetail />}
          />
          <Route
            path="/user/:id/student/fee/:sid"
            exact
            element={<StudentMemberFee />}
          />
          <Route
            path="/user/:id/student/ins/:iid/activity/:sid"
            exact
            element={<StudentMemberActivity />}
          />

          <Route
            path="/user/:id/staff/profile/:sid"
            exact
            element={<ProfileInInstituteStaff />}
          />
          <Route
            path="/:iid/user/:id/staff/view/profile/:sid"
            exact
            element={<ProfileInInstituteViewStaff />}
          />
          <Route
            path="/:iid/user/:id/student/view/profile/:sid"
            exact
            element={<ProfileInInstituteViewStudent />}
          />
          <Route
            path="/user/:id/student/profile/:sid"
            exact
            element={<ProfileInInstituteStudent />}
          />
          <Route
            path="/user/:id/student/profile/:sid/extra"
            exact
            element={<ProfileInInstituteStudentExtra />}
          />
          <Route
            path="/user/:id/staff/profile/attendence/:sid"
            exact
            element={<ProfileInInstituteStaffAttendence />}
          />

          <Route
            path="/user/:id/staff/:sid/department/:did"
            exact
            element={<StaffDepartmentProfile />}
          />
          <Route
            path="/user/:id/staff/:sid/department-info/:did/batch/:bid"
            exact
            element={<StaffDepartmentProfileInfo />}
          />
          <Route
            path="/user/:id/staff/:sid/department-class/:did/batch/:bid"
            exact
            element={<StaffDepartmentClass />}
          />
          <Route
            path="/user/:id/staff/:sid/department/staff/room/:did/batch/:bid"
            exact
            element={<StaffDepartmentRoom />}
          />
          <Route
            path="/user/:id/staff/:sid/department/functions/:did/batch/:bid"
            exact
            element={<StaffDepartmentFunctionExam />}
          />
          <Route
            path="/user/:id/staff/:sid/department/checklist/:did/batch/:bid"
            exact
            element={<StaffDepartmentChecklist />}
          />
          <Route
            path="/user/:id/staff/:sid/department/checklist/history/:did/batch/:bid"
            exact
            element={<StaffDepartmentChecklistHistory />}
          />
          <Route
            path="/user/:id/staff/:sid/department/fee/:did/batch/:bid"
            exact
            element={<StaffDepartmentFees />}
          />
          <Route
            path="/user/:id/staff/:sid/department/batch/setting/:did"
            exact
            element={<StaffDepartmentBatchSetting />}
          />
          <Route
            path="/user/:id/staff/:sid/department/staff/attendence/:did/batch/:bid"
            exact
            element={<StaffDepartmentAttendence />}
          />
          <Route
            path="/user/:id/staff/:sid/department/mark/attendence/:did/batch/:bid"
            exact
            element={<StaffDepartmentMarkAttendence />}
          />
          <Route
            path="/user/:id/staff/:sid/department/attendence/history/:did/batch/:bid"
            exact
            element={<StaffDepartmentAttendenceHistory />}
          />
          <Route
            path="/user/:id/staff/:sid/department/holiday/:did/batch/:bid"
            exact
            element={<StaffDepartmentHoliday />}
          />

          <Route
            path="/user/:id/staff/:sid/class/:cid"
            exact
            element={<StaffClassProfile />}
          />
          <Route
            path="/user/:id/staff/:sid/class-setting/:cid"
            exact
            element={<StaffClassSetting />}
          />
          <Route
            path="/user/:id/staff/:sid/class-subject/:cid"
            exact
            element={<StaffClassProfileSubject />}
          />
          <Route
            path="/user/:id/staff/:sid/class-info/:cid"
            exact
            element={<StaffClassProfileInfo />}
          />
          <Route
            path="/user/:id/staff/:sid/class-request/:cid"
            exact
            element={<StaffClassRequest />}
          />
          <Route
            path="/user/:id/staff/:sid/class/catalog/:cid"
            exact
            element={<ClassCatalog />}
          />
          <Route
            path="/user/:id/staff/:sid/class/checklist/:cid"
            exact
            element={<StaffClassChecklist />}
          />
          <Route
            path="/user/:id/staff/:sid/class/fee/:cid"
            exact
            element={<ClassFee />}
          />
          <Route
            path="/user/:id/staff/:sid/class/fee/history/:cid"
            exact
            element={<ClassFeeHistory />}
          />
          <Route
            path="/user/:id/staff/:sid/class/behaviour/:cid"
            exact
            element={<ClassBehaviour />}
          />
          <Route
            path="/user/:id/staff/:sid/class/attendence/:cid"
            exact
            element={<ClassAttendence />}
          />
          <Route
            path="/user/:id/staff/:sid/class/mark/attendence/:cid"
            exact
            element={<ClassMarkAttendence />}
          />
          <Route
            path="/user/:id/staff/:sid/class/attendence/history/:cid"
            exact
            element={<ClassAttendenceHistory />}
          />
          <Route
            path="/user/:id/staff/:sid/class/finalreport/:cid"
            exact
            element={<ClassFinalReport />}
          />

          <Route
            path="/:sid/insdepartment/:id"
            exact
            element={<SearchDepartment />}
          />
          <Route
            path="/:sid/:id/department/:did"
            exact
            element={<SearchCreateDepartment />}
          />
          <Route
            path="/:sid/:id/currentbatch/:did"
            exact
            element={<SearchDepartmentCurrentBatch />}
          />
          <Route
            path="/:sid/:id/departmentclass/:did/batch/:bid"
            exact
            element={<SearchDepartmentsNewBatch />}
          />
          <Route
            path="/:sid/ins/:id/department/:did/batch/:bid/class/:cid"
            exact
            element={<SearchCreateClass />}
          />
          <Route
            path="/:sid/ins/:id/department/:did/batch/:bid/classsubject/:cid"
            exact
            element={<SearchClassSubject />}
          />
          <Route path="/:sid/allstaff/:id" exact element={<SearchAllStaff />} />

          <Route
            path="/user/:sid/insdepartment/:id"
            exact
            element={<SearchUserDepartment />}
          />
          <Route
            path="/user/:sid/:id/department/:did"
            exact
            element={<SearchUserCreateDepartment />}
          />
          <Route
            path="/user/:sid/:id/currentbatch/:did"
            exact
            element={<SearchUserDepartmentCurrentBatch />}
          />
          <Route
            path="/user/:sid/:id/departmentclass/:did/batch/:bid"
            exact
            element={<SearchUserDepartmentsNewBatch />}
          />
          <Route
            path="/user/:sid/ins/:id/department/:did/batch/:bid/class/:cid"
            exact
            element={<SearchUserCreateClass />}
          />
          <Route
            path="/user/:sid/ins/:id/department/:did/batch/:bid/classsubject/:cid"
            exact
            element={<SearchUserClassSubject />}
          />
          <Route
            path="/user/:sid/allstaff/:id"
            exact
            element={<SearchUserAllStaff />}
          />

          <Route
            path="/user/:id/staff/:sid/finance/:fid"
            exact
            element={<FinanceManager />}
          />

          <Route
            path="/user/:id/staff/:sid/finance-info/:fid"
            exact
            element={<FinanceManagerInfo />}
          />

          <Route
            path="/user/:id/staff/:sid/finance-internal/:fid"
            exact
            element={<FinanceInternal/>}
          />
          <Route
            path="/user/:id/staff/:sid/finance-incomes/:fid"
            exact
            element={<FinanceIncomes/>}
          />

          <Route
            path="/user/:id/staff/:sid/finance-expenses/:fid"
            exact
            element={<FinanceExpenses/>}
          />

          <Route
            path="/user/:id/staff/:sid/finance-e-module/:fid"
            exact
            element={<FinanceELearning/>}
          />
          <Route path="/newfinance/:id" exact element={<NewFinanceCard />} />
          <Route
            path="/ins/:id/finance/profile/:fid"
            exact
            element={<FinanceDepartmentProfile/>}
          />
          <Route
            path="/ins/:id/finance/:fid/balance-status"
            exact
            element={<FinanceDepartmentBalance/>}
          />
          <Route
            path="/ins/:id/sport/profile/:sid"
            exact
            element={<SportDepartmentProfile/>}
          />
          <Route
            path="/ins/:id/sport/profile/:sid/class"
            exact
            element={<SportDepartmentClass/>}
          />
          <Route
            path="/user/:id/staff/:sid/sport/:ssid"
            exact
            element={<StaffSportEventProfile/>}
          />
          <Route
            path="/user/:id/staff/:sid/sport/info/:ssid"
            exact
            element={<StaffSportProfileInfo/>}
          />
          <Route
            path="/user/:id/staff/:sid/sport/class/:ssid"
            exact
            element={<StaffSportProfileClass/>}
          />
          <Route
            path="/user/:id/staff/:sid/sport/:ssid/event/:eid"
            exact
            element={<StaffSportEventMatch/>}
          />
          <Route
            path="/user/:id/staff/:sid/sport/profile/class/:scid"
            exact
            element={<StaffSportClassCoach/>}
          />
          <Route
            path="/user/:id/staff/:sid/sport/class/info/:scid"
            exact
            element={<StaffSportClassCoachInfo/>}
          />
          <Route
            path="/user/:id/staff/:sid/sport/class/team/:scid"
            exact
            element={<StaffSportClassCoachTeam/>}
          />
          <Route
            path="/user/:id/staff/:sid/sport/:ssid/event/:eid/match/:mid"
            exact
            element={<StaffSportIntraMatch/>}
          />
          <Route
            path="/user/:id/staff/:sid/sport/:ssid/event/:eid/inter/match/:mid"
            exact
            element={<StaffSportInterMatch/>}
          />
          <Route
            path="/user/:id/student/complaint/:sid"
            exact
            element={<StudentMemberComplaint/>}
          />
          <Route
            path="/user/:id/staff/:sid/department/batch/setting/complaint/:did"
            exact
            element={<StaffDepartmentBatchComplaint/>}
          />
          <Route
            path="/user/:id/staff/:sid/class-setting/complaint/:cid"
            exact
            element={<StaffClassBatchComplaint/>}
          />
          <Route
            path="/studentcomplaints/:id"
            exact
            element={<StudentComplaintInstitute/>}
          />
          <Route
            path="/ins/corridor/:id"
            exact
            element={<InstituteCorridor/>}
          />
          <Route
            path="/admindashboard/:aid/bank/details"
            exact
            element={<AdminInsBankDetail/>}
          />
          <Route
            path="/ins/:id/student/card"
            exact
            element={<InstituteStudentIDCard/>}
          />
          <Route
            path="/admindashboard/:aid/ins/id-card"
            exact
            element={<AdminInsIdCard/>}
          />
           <Route
            path="/user/:id/staff/:sid/class/leave-transfer/:cid"
            exact
            element={<StudentLeaveAndTransfer />}
          />
          <Route
            path="/admindashboard/:aid/report"
            exact
            element={<AdminReportUsersPost />}
          />
          <Route
            path="/user/:id/student/profile/:sid/extra/event/:eid"
            exact
            element={<ProfileInInstituteStudentExtraMatch />}
          />
          <Route
            path="/admin/:aid/idCard/:id/export/download"
            exact
            element={<ExcelSheetDownload />}
          />
          <Route
            path="/user/:id/staff/:sid/department/fee/history/:did/batch/:bid"
            exact
            element={<StaffDepartmentFeeHistory />}
          />
          <Route
            path="/admin/:aid/query"
            exact
            element={<Support />}
          />
          <Route
            path="/admin/:aid/query/institute"
            exact
            element={<SupportInstitute />}
          />
          
          {/* /////////////////////////////For the LIBRARY AND ECONTENT////////// */}

          {/* =====================THIS IS FOR THE LIBRARY===================== */}

          <Route
            path="/insdashboard/:id/library"
            exact
            element={<LibraryWrapper />}
          />

          <Route
            path="/user/:id/staff/:sid/library/:lid"
            exact
            element={<StaffLibraryWrapper />}
          />
          <Route
            path="/user/:id/library/"
            exact
            element={<UserLibraryWrapper />}
          />

          {/* ==================THIS IS FOR THE ECONTENT ========================================== */}

          <Route
            path="/insdashboard/:id/e-content"
            exact
            element={<Wrapper />}
          />
          <Route
            path="/user/:id/staff/:sid/e-content/:eid"
            exact
            element={<StaffWrapper />}
          />
          <Route
            path="/user/:id/staff/:sid/playlist/:pid/topic/:tid/video/:vid"
            exact
            element={<StaffVideoPlayer />}
          />
          <Route
            path="/user/:id/staff/:sid/playlistdetail/:pid"
            exact
            element={<PlaylistWrapper />}
          />

          <Route
            path="/playlist/:pid/topic/:tid/video/:vid"
            exact
            element={<VideoPlaylist />}
          />
          <Route path="/user/:id/e-content" exact element={<UserPlaylist />} />
          <Route
            path="/user/:id/e-content/playlist/:pid"
            exact
            element={<UserPlaylistWrapper />}
          />

          <Route
            path="/user/:id/playlist/:pid/topic/:tid/video/:vid"
            exact
            element={<UserVideoPlayer />}
          />
          <Route
            path="/institute/:id/playlist/:pid"
            exact
            element={<InstitutePlaylistDetail />}
          />

          {/* //////////////ENDING OF THE ECONTENT AND LIBRARY////////////// */}

          {/* ==================THIS IS FOR THE Admission Admin ========================================== */}

          <Route
            path="/ins-admission/:id"
            exact
            element={<InsAdmissionPanel />} 
          />
          <Route
            path="/user/:id/staff/:sid/admission-admin/:aid"
            exact
            element={<StaffAdmissionPanel />}
          />

          <Route
            path="/user/:id/insjoinandapply/:iid/application-apply/:aid"
            exact
            element={<StudentNewApplication />}
          />
          <Route
            path="/user/:id/application/apply"
            exact
            element={<AppliedApplicationsStatus />}
          />

        {/* //////////////ENDING OF Admission Admin ////////////// */}
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
