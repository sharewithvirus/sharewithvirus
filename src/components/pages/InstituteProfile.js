import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import ProfileDiaplaySection from "../ProfileDiaplaySection";
import ProfileDetailsBar from "../ProfileDetailsBar";
import ProfileSidebar from "../ProfileSidebar";
import PostDisplay from "../PostDisplay";
import ProfileSections from "../ProfileSections";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import InstituteAnnouncementCard from "../InstituteAnnouncementCard";
import InstituteProfileSidebar from "../InstituteProfileSidebar";
const InstituteProfile = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [followersData, setFollowersData] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [profileData, setProfileData] = useState("");
  const [profilePostData, setProfilePostData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [first, setFirst] = useState(false);
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setProfileData(res.data.institute);
        setProfilePostData(res.data.institute.posts);
        setFollowersData(res.data.institute.followers);
        setFollowingData(res.data.institute.following);
        setStaffData(res.data.institute.ApproveStaff);
        setStudentData(res.data.institute.ApproveStudent);
        setSearchUserList(res.data.institute.userFollowersList);
        setFirst(true);
      })
      .catch((e) => {
        setAdminMsg({ showMessages: true, msg: "Something Went Wrong" });
      });
  }, []);
  // }, [profileData]);

  return (
    <>
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <NavbarTopInstitute id={params.id} />
        <div className={styles.mainContent}>
          {/* <BackButton /> */}
          <div className={`${styles.profileDisplay} mt-3`}>
            <ProfileDiaplaySection
              profilePicSrc={
                profileData.photoId === "1"
                  ? "/images/institute-avatar.jpeg"
                  : first
                  ? `${requestURL}/insprofileabout/photo/${profileData.insProfilePhoto}`
                  : null
              }
              coverPicSrc={
                profileData.coverId === "2"
                  ? "/images/user-ins-cover-photo2.jpg"
                  : first
                  ? `${requestURL}/insprofileabout/coverphoto/${profileData.insProfileCoverPhoto}`
                  : null
              }
              actionBtn="Setting"
              id={params.id}
            />
            <ProfileDetailsBar
              followers={followersData}
              following={followingData}
              profilePost={profilePostData}
              profileText={profileData}
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
                style={{ marginTop: "0" }}
              >
                <ProfileSections id={params.id} />
                <PostDisplay
                  postData={
                    profilePostData
                      ? profilePostData.map((et) => et).reverse()
                      : ""
                  }
                  data={profileData ? profileData : ""}
                  id={params.id}
                  first={first}
                />
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

export default InstituteProfile;
