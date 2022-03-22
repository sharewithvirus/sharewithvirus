import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ProfileDetailsBar from "../ProfileDetailsBar";

import axios from "axios";
import SearchInstituteJoin from "./SearchInstituteJoin";
import { requestURL } from "../ReqUrl";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";

const InstituteJoinAndApply = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [joinAs, setJoinAs] = useState(false);

  const [searchInsData, setSearchInsData] = useState("");
  const [searchInsPostData, setSearchInsPostData] = useState([]);
  const [searchInsAnnData, setSearchInsAnnData] = useState([]);
  const [searchInsFollowers, setSearchInsFollowers] = useState([]);
  const [searchInsFollowing, setSearchInsFollowing] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [closeHandler, setCloseHandler] = useState(false);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.iid}`)
      .then((res) => {
        setSearchInsData(res.data.institute);
        setSearchInsPostData(res.data.institute.posts);
        setSearchInsAnnData(res.data.institute.announcement);
        setSearchInsFollowers(res.data.institute.followers);
        setSearchInsFollowing(res.data.institute.following);
        setStaffData(res.data.institute.ApproveStaff);
        setStudentData(res.data.institute.ApproveStudent);
        setSearchUserList(res.data.institute.userFollowersList);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [searchInsData]);

  const joinCloseHandler = () => {
    setCloseHandler(false);
  };

  return (
    <>
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <NavbarTopUser uid={params.id} />
        <div className={styles.mainContent}>
          {/* <BackButton /> */}
          <div className={`${styles.profileDisplay}`}>
            <div className="mt-4">
              <div className={`${styles.profilecover} `}>
                <img
                  src={
                    searchInsData.coverId === "2"
                      ? "/images/user-ins-cover-photo.jpg"
                      : first
                      ? `${requestURL}/insprofileabout/coverphoto/${searchInsData.insProfileCoverPhoto}`
                      : null
                  }
                  alt="cover-image"
                  className={`img-fluid ${styles.imageDiaplayCover}`}
                />
              </div>
              <div className={`${styles.profilecoverImage} mb-5`}>
                <img
                  className={`img-fluid `}
                  src={
                    searchInsData.photoId === "1"
                      ? "/images/institute-avatar.jpeg"
                      : first
                      ? `${requestURL}/insprofileabout/photo/${searchInsData.insProfilePhoto}`
                      : null
                  }
                  alt="profile"
                />
              </div>
              <div className={styles.additionalProfileBtn}></div>
            </div>

            <ProfileDetailsBar
              followers={searchInsFollowers}
              following={searchInsFollowing}
              profilePost={searchInsPostData}
              profileText={searchInsData}
              userFollow={searchUserList}
              joinedStaff={staffData.length >= 1 ? staffData.length : ""}
              joinedStudent={studentData.length >= 1 ? studentData.length : 0}
              id={params.iid}
            />
          </div>

          <div className="row">
            <div className={`col col-lg-4 col-xl-3  ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <div className={styles.dabout}>
                    <i class="fas fa-palette"></i>
                    {searchInsData.insOperatingAdmin
                      ? searchInsData.insOperatingAdmin
                      : "Operating Admin"}
                  </div>
                  <div className={styles.dabout}>
                    <i class="fas fa-language"></i>
                    {searchInsData.insPrinciple
                      ? searchInsData.insPrinciple
                      : "Principal"}
                  </div>
                  <div className={styles.dabout}>
                    <i class="fas fa-headset"></i>
                    {searchInsData.insStudentPresident
                      ? searchInsData.insStudentPresident
                      : "Student President"}
                  </div>
                  <div className={styles.dabout}>
                    <i class="fas fa-info-circle"></i>
                    {searchInsData.insTrusty
                      ? searchInsData.insTrusty
                      : "Trusty"}
                  </div>
                  <div className={styles.dabout}>
                    <i class="fas fa-sign-out-alt"></i>
                    {searchInsData.insAdminClerk
                      ? searchInsData.insAdminClerk
                      : "Admin Clerk"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`col col-md-11 col-lg-8 col-xl-8 mx-auto ${styles.midside}`}
            >
              <div
                className={`${styles.about} ${styles.wrapper}`}
                style={{ marginTop: "20px" }}
              >
                <div className="row mt-2">
                  <div className="col-6">
                    <h4 className={styles.dlogoText}>Join / Apply</h4>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-success mx-auto px-5"
                      onClick={() => {
                        // setJoinAs(true);
                        setCloseHandler(true);
                      }}
                    >
                      Existing Staff and Student Join
                    </button>
                  </div>
                </div>
                {closeHandler && (
                  <SearchInstituteJoin joinCloseHandler={joinCloseHandler} />
                )}

                <div className="row mt-2"></div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default InstituteJoinAndApply;
