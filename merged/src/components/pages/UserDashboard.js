import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from "../UserAboutSection";
import PostDisplay from "../PostDisplay";
import UserStatsSection from "../UserStatsSection";
import AddNewButton from "../AddNewButton";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserSideBar from "../UserSideBar";
import moment from "moment";
import UserAnnouncementCard from "../UserAnnouncementCard";
import FollowPostUser from "../FollowPostUser";
import FollowCircleUser from "../FollowCircleUser";

const UserDashboard = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState("");
  const [userPost, setUserPost] = useState([]);
  const [showPost, setShowPost] = useState(true);
  const [userAnnData, setUserAnnData] = useState([]);
  const [followData, setFollowData] = useState([]);
  const [circleData, setCircleData] = useState([]);
  const [first, setFirst] = useState(false)
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    if (showPost) {
      axios.get(`${requestURL}/userdashboard/${params.id}`).then((res) => {
        setUserData(res.data.user);
        setUserPost(res.data.user.userPosts);
        setUserAnnData(res.data.user.userInstituteFollowing);
        setFollowData(res.data.user.userFollowing);
        setCircleData(res.data.user.userCircle);
        setShowPost(false);
        setFirst(true)
      });
    }
  }, [showPost]);

  var p_date = date.getDate()
  var p_month = date.getMonth() + 1
  if(p_month <=10){
    p_month = parseInt(`0${p_month}`)
  }
  var p_year = date.getFullYear()
  var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  var b_date = userData ? userData.userDateOfBirth.slice(8, 10) : '' 
  var b_month = userData ? userData.userDateOfBirth.slice(5, 7) : ''
  var b_year = userData ? userData.userDateOfBirth.slice(0,4) : ''

  if(b_date > p_date){
    p_date = p_date + month[b_month - 1]
    p_month = p_month - 1
  }

  if(b_month > p_month){
    p_year = p_year - 1
    p_month = p_month + 12
  }

  var get_cal_date = p_date - b_date
  var get_cal_month = p_month - b_month
  var get_cal_year = p_year - b_year

  const onShowPost = () => {
    setShowPost(true);
  };

  return (
    <>
      <NavbarTopUser
        uid={params.id}
        staff={userData.staff ? userData.staff : ""}
      />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                {userData && (
                  <UserAboutSection userData={userData} uid={params.id} />
                )}
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <UserSideBar uid={params.id} />
                </div>
                <div className={styles.rightCols}>
                  <UserStatsSection id={params.id} />
                </div>
              </div>
            </div>
            <div
              className={`col col-md-11 col-lg-8 col-xl-6 ${styles.midside}`}
            >
              {userData && 
                 (
                <AddNewButton
                  userData={userData}
                  uid={params.id}
                  onShowPost={onShowPost}
                  parentalData={get_cal_year ? get_cal_year : ''}
                />
              )}
              {userData && (
                <PostDisplay
                  userPostData={
                    userPost ? userPost.map((et) => et).reverse() : ""
                  }
                  userdata={userData}
                  onShowPost={onShowPost}
                  first={first}
                  uid={params.id}
                  key={params.id}
                />
              )}
              <FollowPostUser
                userFollow={
                  followData ? followData.map((et) => et).reverse() : ""
                }
                instituteFollow={
                  userAnnData ? userAnnData.map((et) => et).reverse() : ""
                }
                onShowPost={onShowPost}
                parentalData={get_cal_year ? get_cal_year : ''}
                uid={params.id}
                first={first}
                // key={params.id}
              />
              {get_cal_year >= 13 ?
              <FollowCircleUser
                circle={circleData ? circleData : ""}
                onShowPost={onShowPost}
                uid={params.id}
                first={first}
              />
              : ''}
            </div>
            <div className={`col col-xl-3 ${styles.rightside}`}>
              <UserStatsSection uid={params.id} />
              <p className={styles.dlogoText} style={{ cursor: "pointer" }}>
                <img
                  src="/images/announcement-icon.svg"
                  // className={`${style.userimg} ${style.svgIcon}`}
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Joined"
                />{" "}
                Announcements / Notices
              </p>
              <UserAnnouncementCard uid={params.id} />
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomUser uid={params.id} />
    </>
  );
};

export default UserDashboard;







// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router";
// import styles from "../Home.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import UserAboutSection from "../UserAboutSection";
// import PostDisplay from "../PostDisplay";
// import UserStatsSection from "../UserStatsSection";
// import AddNewButton from "../AddNewButton";
// import NavbarTopUser from "../NavbarTopUser";
// import NavbarBottomUser from "../NavbarBottomUser";
// import axios from "axios";
// import { requestURL } from "../ReqUrl";
// import UserSideBar from "../UserSideBar";
// import moment from "moment";
// import UserAnnouncementCard from "../UserAnnouncementCard";
// import FollowPostUser from "../FollowPostUser";
// import FollowCircleUser from "../FollowCircleUser";

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const params = useParams();
//   const [userData, setUserData] = useState("");
//   const [userPost, setUserPost] = useState([]);
//   const [showPost, setShowPost] = useState(true);
//   const [userAnnData, setUserAnnData] = useState([]);
//   const [followData, setFollowData] = useState([]);
//   const [circleData, setCircleData] = useState([]);

//   useEffect(() => {
//     if (showPost) {
//       axios.get(`${requestURL}/userdashboard/${params.id}`).then((res) => {
//         setUserData(res.data.user);
//         setUserPost(res.data.user.userPosts);
//         setUserAnnData(res.data.user.userInstituteFollowing);
//         setFollowData(res.data.user.userFollowing);
//         setCircleData(res.data.user.userCircle);
//         setShowPost(false);
//       });
//     }
//   }, [showPost]);

//   const onShowPost = () => {
//     setShowPost(true);
//   };

//   return (
//     <>
//       <NavbarTopUser uid={params.id} />
//       <div className={styles.mainScreen}>
//         <div className={`${styles.mainContent} ${styles.dashboard}`}>
//           <div className="row">
//             <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
//               <div className={styles.leftBar}>
//                 {userData && (
//                   <UserAboutSection userData={userData} uid={params.id} />
//                 )}
//                 <div className={`${styles.about} ${styles.leftMenu}`}>
//                   <UserSideBar uid={params.id} />
//                 </div>
//                 <div className={styles.rightCols}>
//                   <UserStatsSection id={params.id} />
//                 </div>
//               </div>
//             </div>
//             <div
//               className={`col col-md-11 col-lg-8 col-xl-6 ${styles.midside}`}
//             >
//               {userData && (
//                 <AddNewButton
//                   userData={userData}
//                   uid={params.id}
//                   onShowPost={onShowPost}
//                 />
//               )}
//               {userData && (
//                 <PostDisplay
//                   userPostData={userPost ? userPost.map(et => et).reverse() : ""}
//                   userdata={userData}
//                   onShowPost={onShowPost}
//                   uid={params.id}
//                   key={params.id}
//                 />
//               )}
//               <FollowPostUser
//                 userFollow={followData ? followData.map(et => et).reverse() : ""}
//                 instituteFollow={userAnnData ? userAnnData.map(et => et).reverse() : ""}
//                 onShowPost={onShowPost}
//                 uid={params.id}
//                 // key={params.id}
//               />
//               <FollowCircleUser
//               circle={circleData ? circleData : ''}
//               onShowPost={onShowPost}
//               uid={params.id}
//               />
//             </div>
//             <div className={`col col-xl-3 ${styles.rightside}`}>
//               <UserStatsSection uid={params.id} />
//               <p className={styles.dlogoText} style={{ cursor: "pointer" }}>
//               <img
//                   src="/images/announcement-icon.svg"
//                   // className={`${style.userimg} ${style.svgIcon}`}
//                   alt="user"
//                   data-toggle="tooltip"
//                   data-placement="bottom"
//                   title="Joined"
//                 />  Announcements / Notices
//               </p>
//               <UserAnnouncementCard uid={params.id} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <NavbarBottomUser uid={params.id} />
//     </>
//   );
// };

// export default UserDashboard;
