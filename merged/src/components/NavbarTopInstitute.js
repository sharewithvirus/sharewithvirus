import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavSidebar from "./NavSidebar";
import Logo from "../images/Mithkal_icon.png";
import Logo2 from "../images/preview.png";
import InsExploreSection from "./InsExploreSection";
import InsSearchResults from "./InsSearchResults";
import ActivatElearning from "./E-Content/InstituteSide/ActivatElearning";
import Activate from "./Library/Institute/Activate";
import NewFinanceCard from '../components/pages/NewFinanceCard'
import NewSportCard from '../components/pages/NewSportCard'
import { requestURL } from './ReqUrl'
import axios from 'axios'

const NavbarTopInstitute = (props) => {
  const [show, setShow] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const [addSports, setAddSports] = useState(false);
  const navigate = useNavigate();
  const [showExplore, setShowExplore] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [instituteSearch, setInstituteSearch] = useState("");
  const [elearning, setElearnig] = useState(false);
  const [library, setLibrary] = useState(false);
  const [insFinance, setInsFinanceData] = useState([])
  const [insSport, setInsSportData] = useState([])

  const changed = (e) => {
    setShowExplore(false);
    setShowResults(true);
    setInstituteSearch(e.target.value);
  };

  const exploreShow = (e) => {
    e.target.value ? setShowExplore(false) : setShowExplore(true);
  };

  const ElearningHandler = () => {
    if (props.insdata.elearningActivate === "Not Activated") {
      setElearnig(true);
    } else {
      navigate(`/insdashboard/${props.id}/e-content`);
    }
  };
  const LibraryHandler = () => {
    if (props.insdata.libraryActivate === "Not Activated") {
      setLibrary(true);
    } else {
      navigate(`/insdashboard/${props.id}/library`);
    }
  };

  const setDepartmentFunction = () => {
    setElearnig(false);
    setLibrary(false);
  };

    const setAddClassFunction = () => {
    setAddClass(false);
  };

  const setAddSportsFunction = () => {
    setAddSports(false);
  };

  useEffect(() =>{
    axios.get(`${requestURL}/insdashboard/${props.id ? props.id : ''}`)
    .then((res) =>{
      setInsFinanceData(res.data.institute.financeDepart)
      setInsSportData(res.data.institute.sportDepart)
    })
  },[])

  return (
    <>
      {show ? <NavSidebar /> : null}
      <div
        className={` d-flex justify-content-between align-items-center ${style.mainnavs} ${style.fixed_top}`}
      >
        <ul>
          <li className={`d-flex ${style.iconNlogo}`}>
            {/* <div className={style.hamburger} onClick={() => setShow(!show)}>
                <img src="/images/icon-hamburger.svg" alt="" />
              </div> */}
            <div className={style.companyLogo}>
              <img className={style.logo} alt="logo" src={Logo} />
            </div>
            <div className={style.companyLogoName}>
              <img className={style.logo2} alt="logo" src={Logo2} />
            </div>
          </li>
        </ul>
        <ul>
          <li className={`align-items-center ${style.input}`}>
            <div className={style.searchbox}>
              <img
                src="/images/search-icon.svg"
                alt="user"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Search"
                style={{
                  position: "absolute",
                  top: "19px",
                  zIndex: "99999",
                  width: "31px",
                  marginLeft: "5px",
                  marginTop: "-4px",
                }}
              />
              <input
                type="text"
                name="Search"
                placeholder="Search for users and institutes..."
                className={style.search}
                autoComplete="false"
                onChange={changed}
                onClick={exploreShow}
              />
            </div>
          </li>
        </ul>
        <ul className={`justify-conetnt-between ${style.navbarTopUserNone}`}>
          <li
            className={`mx-lg-4 mx-md-3 mx-sm-2`}
            onClick={() => navigate(`/insdashboard/${props.id}`)}
          >
            <img
              src="/images/home-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Dashboard"
            />
          </li>
          {insFinance && insFinance.length >=1 ? 
          <li className={`mx-lg-4 mx-md-3 mx-sm-2`}
            onClick={() => navigate(`/ins/${props.id}/finance/profile/${insFinance ? insFinance[0]._id : ''}`)}
          >
            <img
              src="/images/finance-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Finance"
            />
          </li>
          :
          <li className={`mx-lg-4 mx-md-3 mx-sm-2`}
              onClick={() => {
                setAddClass(true);
              }}
          >
            <img
              src="/images/finance-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Finance"
            />
          </li>
          }
          <li className={`mx-lg-4 mx-md-3 mx-sm-2`} onClick={LibraryHandler}>
            <img
              src="/images/library-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Library"
            ></img>
          </li>
          {insSport && insSport.length >=1 ?
          <>
          <li className={`mx-lg-4 mx-md-3 mx-sm-2`}
          onClick={() => navigate(`/ins/${props.id}/sport/profile/${insSport ? insSport[0]._id : ''}`)}
          >
          <img
              src="/images/sports-art-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Sports and Arts"
            ></img>
          </li>
          </>
          : 
          <>
          <li className={`mx-lg-4 mx-md-3 mx-sm-2`}
          onClick={() => {
            setAddSports(true);
          }}
          >
          <img
              src="/images/sports-art-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="Sports and Arts"
            ></img>
          </li>
          </>
          }
          <li className={`mx-lg-4 mx-md-3 mx-sm-2`} onClick={ElearningHandler}>
            <img
              src="/images/e-learning-icon.svg"
              className={style.svgIcon}
              data-toggle="tooltip"
              data-placement="bottom"
              title="E-Learning"
            ></img>
          </li>
          <li className={`mx-lg-4 mx-md-3 mx-sm-2`}>
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
            className={`mx-lg-4 mx-md-3 mx-sm-2`}
            onClick={() => navigate(`/ins/notification/${props.id}`)}
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
            className={`mx-lg-5 mx-md-3 mx-sm-2`}
            onClick={() => navigate(`/insuserprofile/${props.id}`)}
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
        <ul className="d-sm-none">
          <li className={style.messages}>
            <div>
              <img
                src="/images/corridor-icon.svg"
                className={style.svgIcon}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Corridor"
              ></img>
            </div>
          </li>
        </ul>
      </div>
      {showExplore && (
        <InsExploreSection
          changeExplore={(show) => setShowExplore(show)}
          id={props.id}
        />
      )}

      {showResults && (
        <InsSearchResults
          changeExplore={(show) => setShowResults(show)}
          id={props.id}
          instituteSearch={instituteSearch}
        />
      )}
      {elearning && (
        <ActivatElearning
          setDepartmentFunction={setDepartmentFunction}
          insdata={props.insdata}
          id={props.id}
        />
      )}
      {library && (
        <Activate
          setDepartmentFunction={setDepartmentFunction}
          insdata={props.insdata}
          id={props.id}
        />
      )} 
      <NewFinanceCard
        setAddClassFunction={setAddClassFunction}
        trigger={addClass}
        setTrigger={setAddClass}
     />
      <NewSportCard
        setAddSportsFunction={setAddSportsFunction}
        trigger={addSports}
        setTrigger={setAddSports}
      />
    </>
  );
};

export default NavbarTopInstitute;












// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import style from "./Navbar.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import NavSidebar from "./NavSidebar";
// import Logo from "../images/Mithkal_icon.png";
// import Logo2 from "../images/preview.png";
// import InsExploreSection from "./InsExploreSection";
// import InsSearchResults from "./InsSearchResults";
// import NewFinanceCard from '../components/pages/NewFinanceCard'
// import axios from 'axios'
// import { requestURL } from "./ReqUrl";
// import NewSportCard from '../components/pages/NewSportCard'

// const NavbarTopInstitute = (props) => {
//   const [show, setShow] = useState(false);
//   const navigate = useNavigate();
//   const [showExplore, setShowExplore] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [instituteSearch, setInstituteSearch] = useState("");
//   const [addClass, setAddClass] = useState(false);
//   const [addSports, setAddSports] = useState(false);
//   const [insFinance, setInsFinanceData] = useState([])
//   const [insSport, setInsSportData] = useState([])

//   const changed = (e) => {
//     setShowExplore(false);
//     setShowResults(true);
//     setInstituteSearch(e.target.value);
//   };

//   const exploreShow = (e) => {
//     e.target.value ? setShowExplore(false) : setShowExplore(true);
//   };

//   const setAddClassFunction = () => {
//     setAddClass(false);
//   };

//   const setAddSportsFunction = () => {
//     setAddSports(false);
//   };

//   useEffect(() =>{
//     axios.get(`${requestURL}/insdashboard/${props.id ? props.id : ''}`)
//     .then((res) =>{
//       setInsFinanceData(res.data.institute.financeDepart)
//       setInsSportData(res.data.institute.sportDepart)
//     })
//   },[])


//   return (
//     <>
//       {show ? <NavSidebar /> : null}
//       <div
//         className={` d-flex justify-content-between align-items-center ${style.mainnavs} ${style.fixed_top}`}
//       >
//         <ul>
//           <li className={`d-flex ${style.iconNlogo}`}>
//             {/* <div className={style.hamburger} onClick={() => setShow(!show)}>
//                 <img src="/images/icon-hamburger.svg" alt="" />
//               </div> */}
//             <div className={style.companyLogo}>
//               <img className={style.logo} alt="logo" src={Logo} />
//             </div>
//             <div className={style.companyLogoName}>
//               <img className={style.logo2} alt="logo" src={Logo2} />
//             </div>
//           </li>
//         </ul>
//         <ul>
//           <li className={`align-items-center ${style.input}`}>
//             <div className={style.searchbox}>
//             <img
//                       src="/images/search-icon.svg"
//                       alt="user"
//                       data-toggle="tooltip"
//                       data-placement="bottom"
//                       title="Search"
//                       style={{position: 'absolute',top: '19px',zIndex: '99999',width: '23px'}}
//                     /> 
//               <input
//                 type="text"
//                 name="Search"
//                 placeholder="Search for users and institutes..."
//                 className={style.search}
//                 autoComplete="false"
//                 onChange={changed}
//                 onClick={exploreShow}
//               />
//             </div>
//           </li>
//         </ul>
//         <ul className={`justify-conetnt-between ${style.navbarTopUserNone}`}>
//           <li
//             className={`mx-lg-4 mx-md-3 mx-sm-2`}
//             onClick={() => navigate(`/insdashboard/${props.id}`)}
//           >
//             <img
//               src="/images/home-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Dashboard"
//             />
//           </li>
//           {insFinance && insFinance.length >=1 ? 
//           <li className={`mx-lg-4 mx-md-3 mx-sm-2`}
//             onClick={() => navigate(`/ins/${props.id}/finance/profile/${insFinance ? insFinance[0]._id : ''}`)}
//           >
//             <img
//               src="/images/finance-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Finance"
//             />
//           </li>
//           :
//           <li className={`mx-lg-4 mx-md-3 mx-sm-2`}
//               onClick={() => {
//                 setAddClass(true);
//               }}
//           >
//             <img
//               src="/images/finance-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Finance"
//             />
//           </li>
//           }
//           <li className={`mx-lg-4 mx-md-3 mx-sm-2`}>
//             <img
//               src="/images/library-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Library"
//             ></img>
//           </li>
//           {insSport && insSport.length >=1 ?
//           <li className={`mx-lg-4 mx-md-3 mx-sm-2`}
//           onClick={() => navigate(`/ins/${props.id}/sport/profile/${insSport ? insSport[0]._id : ''}`)}
//           >
//           <img
//               src="/images/sports-art-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Sports and Arts"
//             ></img>
//           </li>
//           : 
//           <li className={`mx-lg-4 mx-md-3 mx-sm-2`}
//           onClick={() => {
//             setAddSports(true);
//           }}
//           >
//           <img
//               src="/images/sports-art-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Sports and Arts"
//             ></img>
//           </li>
//           }
//           <li className={`mx-lg-4 mx-md-3 mx-sm-2`}>
//           <img
//               src="/images/e-learning-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="E-Learning"
//             ></img>
//           </li>
//           <li className={`mx-lg-4 mx-md-3 mx-sm-2`}
//           onClick={() => navigate(`/ins/corridor/${props.id}`)}
//           >
//           <img
//               src="/images/corridor-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Corridor"
//             ></img>
//           </li>
//         </ul>
//         <ul className={`justify-conetnt-between ${style.navbarTopUserNone}`}>
//           <li className={`mx-lg-4 mx-md-3 mx-sm-2`} onClick={() => navigate(`/ins/notification/${props.id}`)}>
//           <img
//               src="/images/notification-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Notifications"
//             />
//           </li>
//           <li
//             className={`mx-lg-5 mx-md-3 mx-sm-2`}
//             onClick={() => navigate(`/insuserprofile/${props.id}`)}
//           >
//             <img
//               src="/images/user-avatar-icon.svg"
//               className={`${style.userimg} ${style.svgIcon}`}
//               alt="user"
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Profile"
//             />
//             <span className={`${style.availablestats}${style.online}`}></span>
//           </li>
//         </ul>
//         <ul className="d-sm-none">
//           <li className={style.messages}>
//             <div>
//             <img
//               src="/images/corridor-icon.svg"
//               className={style.svgIcon}
//               data-toggle="tooltip"
//               data-placement="bottom"
//               title="Corridor"
//             ></img>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <NewFinanceCard
//               setAddClassFunction={setAddClassFunction}
//               trigger={addClass}
//               setTrigger={setAddClass}
//             />
//       <NewSportCard
//               setAddSportsFunction={setAddSportsFunction}
//               trigger={addSports}
//               setTrigger={setAddSports}
//             />
//       {showExplore && (
//         <InsExploreSection
//           changeExplore={(show) => setShowExplore(show)}
//           id={props.id}
//         />
//       )}

//       {showResults && (
//         <InsSearchResults
//           changeExplore={(show) => setShowResults(show)}
//           id={props.id}
//           instituteSearch={instituteSearch}
//         />
//       )}

            
//     </>
//   );
// };

// export default NavbarTopInstitute;
