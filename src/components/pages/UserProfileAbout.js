import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDetailsBar from "../ProfileDetailsBar";
import ProfileSidebar from "../ProfileSidebar";
import ProfileSections from "../ProfileSections";
import axios from "axios";
// import ProfileDisplayImageUpload from "../ProfileDisplayImageUpload";
import { requestURL } from "../ReqUrl";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
// import BackButton from "../BackButton";
import { Success } from "../SnackBar";
import ProfileUserImageUpload from "../ProfileUserImageUpload";
import moment from "moment";
import UserAnnouncementCard from "../UserAnnouncementCard";

const UserProfileAbout = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [first, setFirst] = useState(false);

  const [userprofileAboutData, setUserProfileAboutData] = useState("");
  const [userprofileAboutPostData, setUserProfileAboutPostData] = useState([]);
  const [userprofileAboutfollowersData, setUserProfileAboutFollowersData] =
    useState([]);
  const [userprofileAboutfollowingData, setUserProfileAboutFollowingData] =
    useState([]);
  const [userfollowingInsData, setUserFollowingInsData] = useState([]);
  const [userCircleData, setUserCircleData] = useState([]);

  const [userProfileAbout, setUserProfileAbout] = useState({
    userAbout: "",
    userCity: "",
    userState: "",
    userCountry: "",
    userHobbies: "",
    userEducation: "",
  });
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const UserProfileAboutHandler = (e) => {
    const { name, value } = e.target;
    setUserProfileAbout({
      ...userProfileAbout,
      [name]: value,
    });
  };

  const UserProfileAboutHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/userprofileabout/${params.id}`, userProfileAbout)
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });

        setTimeout(() => {
          navigate(`/userprofilesabout/${res.data.user._id}`);
        }, 100);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        setUserProfileAboutData(res.data.user);
        setUserProfileAboutPostData(res.data.user.userPosts);
        setUserProfileAboutFollowersData(res.data.user.userFollowers);
        setUserProfileAboutFollowingData(res.data.user.userFollowing);
        setUserFollowingInsData(res.data.user.userInstituteFollowing);
        setUserCircleData(res.data.user.userCircle);
        setFirst(true);
      })
      .catch((e) => {
        setAdminMsg({ showMessages: true, msg: "Something Went Wrong" });
      });
  }, []);
  // }, [userprofileAboutData]);
  return (
    <>
      <NavbarTopUser uid={params.id} />
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <div className={styles.mainContent}>
          {/* <BackButton /> */}
          <div className={`${styles.profileDisplay} mt-3`}>
            <ProfileUserImageUpload
              pathUrl={`${requestURL}/userprofileabout`}
              coverPicSrc={
                userprofileAboutData.coverId === "2"
                  ? "/images/user-ins-cover-photo2.jpg"
                  : first
                  ? `${requestURL}/userprofileabout/photo/${userprofileAboutData.profileCoverPhoto}`
                  : null
              }
              profilePicSrc={
                userprofileAboutData.photoId === "1"
                  ? "/images/image-boy2.png"
                  : first
                  ? `${requestURL}/userprofileabout/coverphoto/${userprofileAboutData.profilePhoto}`
                  : null
              }
              id={params.id}
            />
            <ProfileDetailsBar
              userfollowers={userprofileAboutfollowersData}
              userfollowing={userprofileAboutfollowingData}
              userInsFollow={userfollowingInsData}
              userprofilePost={userprofileAboutPostData}
              userprofileText={userprofileAboutData}
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
                <ProfileSections uid={params.id} />
                <div className={styles.about}>
                  <form onSubmit={UserProfileAboutHandlerChange}>
                    <div className="m-4">
                      <div className="col-12 mb-3">
                        <label htmlFor="pestdate" className="form-group mb-1">
                          Description
                        </label>
                        {userprofileAboutData.userAbout ? (
                          <input
                            type="text"
                            name="userAbout"
                            className="form-control"
                            id="pestdate"
                            value={userprofileAboutData.userAbout}
                            disabled
                            readonly
                          />
                        ) : (
                          <input
                            type="text"
                            name="userAbout"
                            className="form-control"
                            id="pestdate"
                            placeholder="Enter Description"
                            onChange={UserProfileAboutHandler}
                            required
                          />
                        )}
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="pregdate" className="form-group mb-1">
                          City
                        </label>
                        {userprofileAboutData.userCity ? (
                          <input
                            type="text"
                            name="userCity"
                            className="form-control"
                            id="pregdate"
                            value={userprofileAboutData.userCity}
                            disabled
                            readonly
                          />
                        ) : (
                          <input
                            type="text"
                            name="userCity"
                            className="form-control"
                            id="pregdate"
                            placeholder="Enter City"
                            onChange={UserProfileAboutHandler}
                            required
                          />
                        )}
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="paffliated" className="form-group mb-1">
                          State
                        </label>
                        {userprofileAboutData.userState ? (
                          <input
                            type="text"
                            name="userState"
                            className="form-control"
                            id="paffliated"
                            value={userprofileAboutData.userState}
                            disabled
                            readonly
                          />
                        ) : (
                          <input
                            type="text"
                            name="userState"
                            className="form-control"
                            id="paffliated"
                            placeholder="Enter State"
                            onChange={UserProfileAboutHandler}
                            required
                          />
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="paffliated" className="form-group mb-1">
                          Country
                        </label>
                        {userprofileAboutData.userCountry ? (
                          <input
                            type="text"
                            name="userCountry"
                            className="form-control"
                            id="paffliated"
                            value={userprofileAboutData.userCountry}
                            disabled
                            readonly
                          />
                        ) : (
                          <input
                            type="text"
                            name="userCountry"
                            className="form-control"
                            id="paffliated"
                            placeholder="Enter Country"
                            onChange={UserProfileAboutHandler}
                            required
                          />
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="pachieve" className="form-group mb-1">
                          Hobbies
                        </label>
                        {userprofileAboutData.userHobbies ? (
                          <textarea
                            type="text"
                            name="userHobbies"
                            className="form-control"
                            id="pachieve"
                            rows="1"
                            cols="30"
                            value={userprofileAboutData.userHobbies}
                            disabled
                            readonly
                          ></textarea>
                        ) : (
                          <textarea
                            type="text"
                            name="userHobbies"
                            className="form-control"
                            id="pachieve"
                            rows="1"
                            cols="30"
                            placeholder="Write your hobbies here..."
                            onChange={UserProfileAboutHandler}
                            required
                          ></textarea>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="pachieve" className="form-group mb-1">
                          Education and Work
                        </label>
                        {userprofileAboutData.userEducation ? (
                          <textarea
                            type="text"
                            name="userEducation"
                            className="form-control"
                            id="pachieve"
                            rows="1"
                            cols="30"
                            value={userprofileAboutData.userEducation}
                            disabled
                            readonly
                          ></textarea>
                        ) : (
                          <textarea
                            type="text"
                            name="userEducation"
                            className="form-control"
                            id="pachieve"
                            rows="1"
                            cols="30"
                            placeholder="Write your education here..."
                            onChange={UserProfileAboutHandler}
                            required
                          ></textarea>
                        )}
                      </div>
                    </div>
                    {userprofileAboutData.userAbout &&
                    userprofileAboutData.userCity &&
                    userprofileAboutData.userState &&
                    userprofileAboutData.userHobbies &&
                    userprofileAboutData.userEducation &&
                    userprofileAboutData.userCountry ? (
                      ""
                    ) : (
                      <div className="col-12 mb-3">
                        <button
                          type="submit"
                          className="btn btn-outline-primary mt-4 px-5 mx-auto"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </form>
                </div>
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

export default UserProfileAbout;
