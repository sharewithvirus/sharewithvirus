import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDiaplaySection from "../ProfileDiaplaySection";
import ProfileDetailsBar from "../ProfileDetailsBar";
import ProfileSidebar from "../ProfileSidebar";
import ProfileSections from "../ProfileSections";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import NavbarTopInstitute from "../NavbarTopInstitute";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import SaveInsPostDisplay from "../SaveInsPostDisplay";
import InstituteAnnouncementCard from "../InstituteAnnouncementCard";
import InstituteProfileSidebar from "../InstituteProfileSidebar";
const InstituteProfileTag = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [profileTagFollowersData, setProfileTagFollowersData] = useState([]);
  const [profileTagFollowingData, setProfileTagFollowingData] = useState([]);
  const [profileTagData, setProfileTagData] = useState("");
  const [profileTagPostData, setProfileTagPostData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [first, setFirst] = useState(false);
  const [searchUserList, setSearchUserList] = useState([]);

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setProfileTagData(res.data.institute);
        setProfileTagPostData(res.data.institute.posts);
        setProfileTagFollowersData(res.data.institute.followers);
        setProfileTagFollowingData(res.data.institute.following);
        setStaffData(res.data.institute.ApproveStaff);
        setStudentData(res.data.institute.ApproveStudent);
        setSearchUserList(res.data.institute.userFollowersList);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);
  // }, [profileTagData]);

  return (
    <>
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <NavbarTopInstitute id={params.id} />
        <div className={styles.mainContent}>
          <div className={`${styles.profileDisplay} mt-3`}>
            <ProfileDiaplaySection
              profilePicSrc={
                profileTagData.photoId === "1"
                  ? "/images/institute-avatar.jpeg"
                  : first
                  ? `${requestURL}/insprofileabout/photo/${profileTagData.insProfilePhoto}`
                  : null
              }
              coverPicSrc={
                profileTagData.coverId === "2"
                  ? "/images/user-ins-cover-photo2.jpg"
                  : first
                  ? `${requestURL}/insprofileabout/coverphoto/${profileTagData.insProfileCoverPhoto}`
                  : null
              }
              actionBtn="Setting"
              id={params.id}
            />
            <ProfileDetailsBar
              followers={profileTagFollowersData}
              following={profileTagFollowingData}
              profilePost={profileTagPostData}
              profileText={profileTagData}
              joinedStaff={staffData.length >= 1 ? staffData.length : ""}
              joinedStudent={studentData.length >= 1 ? studentData.length : 0}
              userFollow={searchUserList}
              id={params.id}
            />
          </div>

          <div className="row">
            <div className={`col col-lg-4 col-xl-3  ${styles.leftside}`}>
              <InstituteProfileSidebar />
            </div>
            <div
              className={`col col-md-11 col-lg-8 col-xl-6 mx-auto ${styles.midside}`}
            >
              <div
                className={`${styles.about} ${styles.wrapper}`}
                style={{ marginTop: "0px" }}
              >
                <ProfileSections id={params.id} />
                <SaveInsPostDisplay id={params.id} />
              </div>
            </div>
            <div className={`col col-xl-3 ${styles.rightside}`}>
              <img
                src="/images/announcement-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Announcement"
                style={{ marginTop: "40px" }}
              />
              <InstituteAnnouncementCard id={params.id} />
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.id} />
      </div>
    </>
  );
};

export default InstituteProfileTag;
