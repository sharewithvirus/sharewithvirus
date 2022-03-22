import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import AboutSection from "../AboutSection";
import PostDisplay from "../PostDisplay";
import InstituteStatsSection from "../InstituteStatsSection";
import AddNewButton from "../AddNewButton";
import InstituteSidebar from "../InstituteSidebar";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import InstituteAnnouncementCard from "../InstituteAnnouncementCard";
import moment from "moment";

const InstituteDashboard = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [insdata, setInsData] = useState("");
  const [inspost, setInsPost] = useState([]);
  const [insAnnData, setInsAnnData] = useState([]);
  const [showPost, setShowPost] = useState(true);
  const [first, setFirst] = useState(false)

  useEffect(() => {
    if (showPost) {
      axios.get(`${requestURL}/insdashboard/${params.id}`).then((res) => {
        setInsData(res.data.institute);
        setInsPost(res.data.institute.posts);
        setInsAnnData(res.data.institute.announcement);
        setShowPost(false);
        setFirst(true)
      });
    }
  }, [showPost]);
  // }, [inspost, insAnnData]);

  const onShowPost = () => {
    setShowPost(true);
  };

  return (
    <>
      <NavbarTopInstitute id={params.id} insdata={insdata} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                {insdata && <AboutSection insData={insdata} id={params.id} />}
                {<InstituteSidebar id={params.id} />}
                <div className={styles.rightCols}>
                  <InstituteStatsSection id={params.id} />
                </div>
              </div>
            </div>
            <div
              className={`col col-md-11 col-lg-8 col-xl-6 ${styles.midside}`}
            >
              {insdata && (
                <AddNewButton
                  insdata={insdata}
                  id={params.id}
                  onShowPost={onShowPost}
                />
              )}
              {insdata && (
                <PostDisplay
                  postData={inspost ? inspost.map((et) => et).reverse() : ""}
                  data={insdata}
                  id={params.id}
                  onShowPost={onShowPost}
                  first={first}
                />
              )}
            </div>
            <div
              style={{ marginTop: "0px" }}
              className={`col col-xl-3 ${styles.rightside}`}
            >
              <InstituteStatsSection id={params.id} />
              {insdata.status === "Approved" ? (
                <p
                  className={styles.dlogoText}
                  onClick={() => navigate(`/announcement/${params.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="/images/announcement-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Announcement"
                  />
                  Announcements / Notices
                </p>
              ) : (
                <p className={styles.dlogoText}>
                  <img
                    src="/images/announcement-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Announcement"
                  />
                  Announcements / Notices
                </p>
              )}
              <InstituteAnnouncementCard id={params.id} />
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomInstitute id={params.id} />
    </>
  );
};

export default InstituteDashboard;





// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router";
// import styles from "../Home.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import NavbarTopInstitute from "../NavbarTopInstitute";
// import NavbarBottomInstitute from "../NavbarBottomInstitute";
// import AboutSection from "../AboutSection";
// import PostDisplay from "../PostDisplay";
// import InstituteStatsSection from "../InstituteStatsSection";
// import AddNewButton from "../AddNewButton";
// import InstituteSidebar from "../InstituteSidebar";
// import axios from "axios";
// import { requestURL } from "../ReqUrl";
// import InstituteAnnouncementCard from "../InstituteAnnouncementCard";
// import moment from "moment";

// const InstituteDashboard = () => {
//   const navigate = useNavigate();
//   const params = useParams();

//   const [insdata, setInsData] = useState("");
//   const [inspost, setInsPost] = useState([]);
//   const [insAnnData, setInsAnnData] = useState([]);
//   const [showPost, setShowPost] = useState(true);

//   useEffect(() => {
//     if (showPost) {
//       axios.get(`${requestURL}/insdashboard/${params.id}`).then((res) => {
//         setInsData(res.data.institute);
//         setInsPost(res.data.institute.posts);
//         setInsAnnData(res.data.institute.announcement);
//         setShowPost(false);
//       });
//       console.log("This is institute dashboard : ");
//     }
//   }, [showPost]);

//   // }, [inspost, insAnnData]);

//   const onShowPost = () => {
//     setShowPost(true);
//   };

//   return (
//     <>
//       <NavbarTopInstitute id={params.id} />
//       <div className={styles.mainScreen}>
//         <div className={`${styles.mainContent} ${styles.dashboard}`}>
//           <div className="row">
//             <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
//               <div className={styles.leftBar}>
//                 {insdata && <AboutSection insData={insdata} id={params.id} />}
//                 {<InstituteSidebar id={params.id} />}
//                 <div className={styles.rightCols}>
//                   <InstituteStatsSection id={params.id} />
//                 </div>
//               </div>
//             </div>
//             <div
//               className={`col col-md-11 col-lg-8 col-xl-6 ${styles.midside}`}
//             >
//               {insdata && (
//                 <AddNewButton
//                   insdata={insdata}
//                   id={params.id}
//                   onShowPost={onShowPost}
//                 />
//               )}
//               {insdata && (
//                 <PostDisplay
//                   postData={inspost ? inspost.map(et => et).reverse() : ""}
//                   data={insdata}
//                   id={params.id}
//                   onShowPost={onShowPost}
//                 />
//               )}
//             </div>
//             <div
//               style={{ marginTop: "0px" }}
//               className={`col col-xl-3 ${styles.rightside}`}
//             >
//               <InstituteStatsSection id={params.id} />
//               {insdata.status === 'Approved' ? 
//               <p
//                 className={styles.dlogoText}
//                 onClick={() => navigate(`/announcement/${params.id}`)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <img
//                       src="/images/announcement-icon.svg"
//                       data-toggle="tooltip"
//                       data-placement="bottom"
//                       title="Announcement"
//                     /> 

//                 Announcements / Notices
//               </p>
//               :
//               <p className={styles.dlogoText}>
//                     <img
//                       src="/images/announcement-icon.svg"
//                       data-toggle="tooltip"
//                       data-placement="bottom"
//                       title="Announcement"
//                     />  
//                 Announcements / Notices
//               </p>
//               }
//               <InstituteAnnouncementCard id={params.id} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <NavbarBottomInstitute id={params.id} />
//     </>
//   );
// };

// export default InstituteDashboard;






