import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavSidebar from "./NavSidebar";
import Logo from "../images/Mithkal_icon.png";
import Logo2 from "../images/preview.png";
import ExploreSection from "./ExploreSection";
import SearchResults from "./SearchResults";
import { requestURL } from "./ReqUrl";
import axios from "axios";

const NavbarTopUser = (props) => {
  const params = useParams();
  const [show, setShow] = useState(false);
  const [instituteSearch, setInstituteSearch] = useState("");
  const navigate = useNavigate();
  const [showExplore, setShowExplore] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [institute, setInstitute] = useState([]);
  const [users, setUsers] = useState([]);
  const [roleData, setRoleData] = useState("");
  const [userStaffMemberData, setUserStaffMemberData] = useState([])
  const [userStudentData, setUserStudentData] = useState([])
  const [staffDepartmentData, setStaffDepartmentData] = useState([])
  const [staffClassData, setStaffClassData] = useState([])
  const [staffSubjectData, setStaffSubjectData] = useState([])
  const [classData, setClassData] = useState('')
  const [studentClassData, setStudentClassData] = useState([])

  useEffect(() => {
    axios.get(`${requestURL}/insdashboard`).then((res) => {
      setInstitute(res.data.institute);
    });
    axios.get(`${requestURL}/userdashboard`).then((res) => {
      setUsers(res.data.users);
    });
    axios
      .get(`${requestURL}/userdashboard/${props.uid ? props.uid : ""}`)
      .then((res) => {
        setRoleData(res.data.user.role);
        setUserStaffMemberData(res.data.user.staff)
        setUserStudentData(res.data.user.student)
        setStaffDepartmentData(res.data.user.staff[0] ? res.data.user.staff[0].staffDepartment : 'no')
        setStaffClassData(res.data.user.staff[0] ? res.data.user.staff[0].staffClass : '')
        setStaffSubjectData(res.data.user.staff[0] ? res.data.user.staff[0].staffSubject : '')
        setStudentClassData(res.data.user.student ? res.data.user.student[0] : '')
      });

  }, []);



  const changed = (e) => {
    setShowExplore(false);
    setShowResults(true);
    setInstituteSearch(e.target.value);
  };

  const exploreShow = (e) => {
    e.target.value ? setShowExplore(false) : setShowExplore(true);
  };

  return (
    <>
      {show ? <NavSidebar /> : null}
      {/* {props.uid ? ( */}
      <div
        className={`${style.mainnavs} ${style.fixed_top} d-flex justify-content-between align-items-center`}
      >
        <ul className={`justify-conetnt-between`}>
          <li className={`d-flex align-items-center ${style.iconNlogo}`}>
            <div className={style.companyLogo}>
              <img className={style.logo} alt="logo" src={Logo} />
            </div>
            <div className={style.companyLogoName}>
              <img className={style.logo2} alt="logo" src={Logo2} />
            </div>
          </li>
        </ul>
        <ul className={`justify-conetnt-between`}>
          <li className={`align-items-center ${style.input}`}>
            <div className={style.searchbox}>
                  <img
                      src="/images/search-icon.svg"
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Search"
                      style={{position: 'absolute',top: '19px',zIndex: '99999',width: '23px'}}
                    /> 
              <input
                type="text"
                name="Search"
                placeholder="Search..."
                className={style.search}
                autoComplete="false"
                // onKeyUp={debounce}
                onChange={changed}
                onClick={exploreShow}
              />
            </div>
          </li>
        </ul>
        <ul className={`justify-conetnt-between ${style.navbarTopUserNone}`}>
          <li
            className="mx-lg-5 mx-md-3 mx-sm-2"
            onClick={() => navigate(`/userdashboard/${props.uid}`)}
          >
            <img
              src="/images/home-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Dashboard"
            />
          </li>
        

        {userStaffMemberData.length >=1 ? 
        staffDepartmentData.length >=1 ? 
        <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/staff/${userStaffMemberData[0]._id}/department/${userStaffMemberData[0].staffDepartment[0]._id}`)}>
          <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
            data-placement="bottom" title="Members"/>
        </li>
        : 
        staffClassData.length >=1 ? 
        <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/staff/${userStaffMemberData[0]._id}/department/${userStaffMemberData[0].staffClass[0]._id}`)}>
          <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
            data-placement="bottom" title="Members"/>
        </li>
        : staffSubjectData.length >=1 ? 
        <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/staff/${userStaffMemberData[0]._id}/department/${userStaffMemberData[0].staffSubject[0]._id}`)}>
          <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
            data-placement="bottom" title="Members"/>
        </li>
        :
        staffDepartmentData.length >=1 && staffClassData.length >=1 && staffSubjectData.length >=1 ?
        <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/staff/${userStaffMemberData[0]._id}/department/${userStaffMemberData[0].staffDepartment[0]._id}`)}>
          <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
            data-placement="bottom" title="Members"/>
        </li>
          : staffDepartmentData.length >=1 && staffClassData.length >=1 ? 
          <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/staff/${userStaffMemberData[0]._id}/department/${userStaffMemberData[0].staffDepartment[0]._id}`)}>
            <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
            data-placement="bottom" title="Members"/>
          </li>
          : staffClassData.length >=1 && staffSubjectData.length >=1 ? 
          <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/staff/${userStaffMemberData[0]._id}/department/${userStaffMemberData[0].staffClass[0]._id}`)}>
          <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
            data-placement="bottom" title="Members"/>
        </li>
          : staffSubjectData.length >=1 && staffDepartmentData.length >=1 ? 
            <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/staff/${userStaffMemberData[0]._id}/department/${userStaffMemberData[0].staffSubject[0]._id}`)}>
              <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
               data-placement="bottom" title="Members"/>
            </li>
          : !(staffDepartmentData.length >=1 && staffClassData.length >=1 && staffSubjectData.length >=1) ? 
          <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/staff/profile/${userStaffMemberData[0]._id}`)}>
              <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
                data-placement="bottom" title="Members"/>
            </li>
             : ''
             :
             userStudentData.length >=1 ? 
               studentClassData.studentClass && studentClassData.studentClass.ApproveStudent && studentClassData.studentClass.ApproveStudent.some((et) => et._id === `${userStudentData[0]._id}`) ?
            <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/studentdetail/${userStudentData[0]._id}`)}
            > 
              <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
                data-placement="bottom" title="Members"/>
            </li>
            : 
            <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/student/profile/${userStudentData[0]._id}`)}
            > 
              <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
                data-placement="bottom" title="Members"/>
            </li>
            :
            userStaffMemberData.length >=1 && userStudentData.length >=1 ?
            <li className="mx-lg-5 mx-md-3 mx-sm-2" onClick={() => navigate(`/user/${props.uid}/staffdetail/${userStaffMemberData[0]._id}`)}>
              <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
                data-placement="bottom" title="Members"/>
            </li>
            : !(userStaffMemberData.length >=1 && userStudentData.length >=1) ? '' 
            : <li className="mx-lg-5 mx-md-3 mx-sm-2" 
            // onClick={() => navigate(`/user/${props.uid}/staffmember`)}
            >
              <img src="/images/member-icon.svg" alt="finance" className={style.svgIcon} data-toggle="tooltip"
                data-placement="bottom" title="Members"/>
            </li>
            }
          
          <li
            className="mx-lg-5 mx-md-3 mx-sm-2"
            onClick={() => navigate(`/user/${params.id}/e-content`)}
          >
            <img
              src="/images/e-learning-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="E-Learning"
            ></img>
          </li>

          <li
            className="mx-lg-5 mx-md-3 mx-sm-2"
            onClick={() => navigate(`/user/corridor/${props.uid}`)}
          >
            <img
              src="/images/corridor-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Corridor"
            ></img>
          </li>
        </ul>
        <ul className={`justify-conetnt-between ${style.navbarTopUserNone}`}>
          <li
            className={`mx-lg-5 mx-md-3 mx-sm-2`}
            onClick={() => navigate(`/user/notification/${props.uid}`)}
          >
            <img
              src="/images/notification-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Notifications"
            />
          </li>
          <li
            className="mx-lg-5 mx-md-3 mx-sm-2"
            onClick={() => navigate(`/userprofiles/${props.uid}`)}
          >
            <img
              src="/images/user-avatar-icon.svg"
              className={`${style.userimg} ${style.svgIcon}`}
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Profile"
            />
            <span className={`${style.availablestats}${style.online}`}></span>
          </li>
        </ul>
        <ul className="d-sm-none ">
          <li className={style.messages}>
            <div className={style.navlistmobile}>
              <ul>
                <li className={style.messages}>
                  <div>
                    <img
                      src="/images/corridor-icon.svg"
                      className={style.svgIcon}
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="messages"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      {showExplore && (
        <ExploreSection
          id={props.uid}
          changeExplore={(show) => setShowExplore(show)}
        />
      )}

      {showResults && (
        <SearchResults
          changeExplore={(show) => setShowResults(show)}
          uid={props.uid}
          instituteSearch={instituteSearch}
          institute={institute}
          users={users}
        />
      )}
    </>
  );
};

export default NavbarTopUser;


{/* {roleData && roleData.userSelectStaffRole ? (
            <li
              className="mx-lg-5 mx-md-3 mx-sm-2"
              onClick={() =>
                navigate(
                  `/user/${props.uid}/staffdetail/${
                    roleData ? roleData.userSelectStaffRole._id : ""
                  }`
                )
              }
            >
              <img
                src="/images/member-icon.svg"
                alt="finance"
                className={style.svgIcon}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Members"
              />
            </li>
          ) : roleData && roleData.userSelectStudentRole ? (
            <li
              className="mx-lg-5 mx-md-3 mx-sm-2"
              onClick={() =>
                navigate(
                  `/user/${props.uid}/studentdetail/${roleData.userSelectStudentRole._id}`
                )
              }
            >
              <img
                src="/images/member-icon.svg"
                alt="finance"
                className={style.svgIcon}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Members"
              />
            </li>
          ) : ( */}
            {/* )} */}
          {/* <li className="mx-lg-5 mx-md-3 mx-sm-2">
            <img
              src="/images/icon-eResources.svg"
              alt="e-resources"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="E-Resources"
            />
          </li> */}