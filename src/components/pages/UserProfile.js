import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDiaplaySection from "../ProfileDiaplaySection";
import ProfileDetailsBar from "../ProfileDetailsBar";
import ProfileSidebar from "../ProfileSidebar";
import PostDisplay from "../PostDisplay";
import ProfileSections from "../ProfileSections";
import BackButton from "../BackButton";
import axios from "axios";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import moment from "moment";
import Follow from './Follow'
import UserAnnouncementCard from "../UserAnnouncementCard";

const UserProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [index, setIndex] = useState(0)

  const [userfollowersData, setUserFollowersData] = useState([]);
  const [userfollowingData, setUserFollowingData] = useState([]);
  const [userprofileData, setUserProfileData] = useState("");
  const [userprofilePostData, setUserProfilePostData] = useState([]);
  const [userfollowingInsData, setUserFollowingInsData] = useState([]);
  const [userCircleData, setUserCircleData] = useState([]);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        setUserProfileData(res.data.user);
        setUserProfilePostData(res.data.user.userPosts);
        setUserFollowersData(res.data.user.userFollowers);
        setUserFollowingData(res.data.user.userFollowing);
        setUserFollowingInsData(res.data.user.userInstituteFollowing);
        setUserCircleData(res.data.user.userCircle);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);
  // }, [userprofileData]);

  return (
    <>
      <NavbarTopUser uid={params.id} />
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <div className={styles.mainContent}>
          {/* <BackButton /> */}
          <div className={`${styles.profileDisplay} mt-3`}>
            <ProfileDiaplaySection
              profilePicSrc={
                userprofileData.photoId === "1"
                  ? "/images/image-boy2.png"
                  : first
                  ? `${requestURL}/userprofileabout/photo/${userprofileData.profilePhoto}`
                  : null
              }
              coverPicSrc={
                userprofileData.coverId === "2"
                  ? "/images/user-ins-cover-photo2.jpg"
                  : first
                  ? `${requestURL}/userprofileabout/coverphoto/${userprofileData.profileCoverPhoto}`
                  : null
              }
              // actionBtn="Setting"
              uid={params.id}
            />

            <ProfileDetailsBar
              changeIndex= {(index) => setIndex(index)}
              userfollowers={userfollowersData}
              userfollowing={userfollowingData}
              userInsFollow={userfollowingInsData}
              userprofilePost={userprofilePostData}
              userprofileText={userprofileData}
              circle={userCircleData}
              uid={params.id}
            />
          </div>

          <div className="row">
            <div className={`col col-lg-4 col-xl-3  ${styles.leftside}`}>
              <ProfileSidebar />
            </div>
            <div
              className={`col col-md-11 col-lg-8 col-xl-6 mx-auto ${styles.midside}`}
            >
              <div
                className={`${styles.about} ${styles.wrapper}`}
                style={{ marginTop: "0" }}
              >
                {index === 0 && 
                <>
                <ProfileSections uid={params.id} />
                <PostDisplay
                  userPostData={
                    userprofilePostData
                      ? userprofilePostData.map((et) => et).reverse()
                      : ""
                  }
                  userdata={userprofileData ? userprofileData : ""}
                  uid={params.id}
                  first={first}
                />
                </>
                }
                {
                  index === 1 && 
                  <Follow 
                  changeIndex={() => setIndex(0)} 
                  followData={userfollowersData}
                  followingData={userfollowingData}
                  userInsFollow={userfollowingInsData}
                  circleData={userCircleData}
                  first={first}
                  />
                }
              </div>
            </div>
            <div className={`col col-xl-3 ${styles.rightside}`}>
              <img
                src="/images/announcement-icon.svg"
                alt="user"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Announcement"
                style={{ marginTop: "40px" }}
              />{" "}
              <UserAnnouncementCard uid={params.id} />
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomUser uid={params.id} />
    </>
  );
};

export default UserProfile;
