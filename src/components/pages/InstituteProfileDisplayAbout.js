import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDetailsBar from "../ProfileDetailsBar";
import ProfileSidebar from "../ProfileSidebar";
import ProfileSections from "../ProfileSections";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import axios from "axios";
import { Success, Danger } from "../SnackBar";
import NavbarTopInstitute from "../NavbarTopInstitute";
import { requestURL } from "../ReqUrl";
import moment from "moment";
import ProfileInstituteImageUpload from "../ProfileInstituteImageUpload";
import InstituteAnnouncementCard from "../InstituteAnnouncementCard";
import InstituteProfileSidebar from "../InstituteProfileSidebar";

const InstituteProfileDisplayAbout = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [profileAboutData, setProfileAboutData] = useState("");
  const [profileAboutPostData, setProfileAboutPostData] = useState([]);
  const [profileAboutfollowersData, setProfileAboutFollowersData] = useState(
    []
  );
  const [profileAboutfollowingData, setProfileAboutFollowingData] = useState(
    []
  );
  const [staffData, setStaffData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [insProfileAbout, setInsProfileAbout] = useState({
    insEstdDate: "",
    insAffiliated: "",
    insAchievement: "",
    insEditableText: "",
    insEditableTexts: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const [first, setFirst] = useState(false);
  const InsProfileAboutHandler = (e) => {
    const { name, value } = e.target;
    setInsProfileAbout({
      ...insProfileAbout,
      [name]: value,
    });
  };

  const InsProfileAboutHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/insprofileabout/${params.id}`, insProfileAbout)
      .then((res) => {
        if (res.data.message) {
          setInsProfileAbout({ showMessages: true, msg: res.data.message });
        }
        setTimeout(() => {
          // navigate(`/insuserprofile/${res.data.institute._id}`);
        }, 100);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setProfileAboutData(res.data.institute);
        setProfileAboutPostData(res.data.institute.posts);
        setProfileAboutFollowersData(res.data.institute.followers);
        setProfileAboutFollowingData(res.data.institute.following);
        setStaffData(res.data.institute.ApproveStaff);
        setStudentData(res.data.institute.ApproveStudent);
        setSearchUserList(res.data.institute.userFollowersList);
        setFirst(true);
      })
      .catch((e) => {
        setInsProfileAbout({ showMessages: true, msg: "Something Went Wrong" });
      });
  }, []);
  // }, [profileAboutData]);
  return (
    <>
      {insProfileAbout.showMessages ? (
        <Success msg={insProfileAbout.msg} />
      ) : null}
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <NavbarTopInstitute id={params.id} />
        <div className={styles.mainContent}>
          <div className={`${styles.profileDisplay} mt-3`}>
            <ProfileInstituteImageUpload
              pathUrl={`${requestURL}/insprofileabout`}
              coverPicSrc={
                profileAboutData.coverId === "2"
                  ? "/images/user-ins-cover-photo2.jpg"
                  : first
                  ? `${requestURL}/insprofileabout/coverphoto/${profileAboutData.insProfileCoverPhoto}`
                  : null
              }
              profilePicSrc={
                profileAboutData.photoId === "1"
                  ? "/images/institute-avatar.jpeg"
                  : first
                  ? `${requestURL}/insprofileabout/photo/${profileAboutData.insProfilePhoto}`
                  : null
              }
              actionBtn="Setting"
              id={params.id}
            />
            <ProfileDetailsBar
              followers={profileAboutfollowersData}
              following={profileAboutfollowingData}
              profilePost={profileAboutPostData}
              profileText={profileAboutData}
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
                <div className={styles.about}>
                  <form onSubmit={InsProfileAboutHandlerChange}>
                    <div className="m-4">
                      <div className="col-12 mb-3">
                        <label htmlFor="pestdate" className="form-group mb-1">
                          Institute Establishment Date
                        </label>
                        {profileAboutData.insEstdDate ? (
                          <input
                            type="text"
                            name="insEstdDate"
                            className="form-control"
                            id="pestdate"
                            value={moment(profileAboutData.insEstdDate).format(
                              "DD-MM-YYYY"
                            )}
                            disabled
                            readonly
                          />
                        ) : (
                          <input
                            type="date"
                            name="insEstdDate"
                            className="form-control"
                            id="pestdate"
                            placeholder="Institute Establishment Date"
                            onChange={InsProfileAboutHandler}
                            required
                          />
                        )}
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="paffliated" className="form-group mb-1">
                          Affliated University/Autonomous
                        </label>
                        {profileAboutData.insAffiliated ? (
                          <input
                            type="text"
                            name="insAffiliated"
                            className="form-control"
                            id="paffliated"
                            value={profileAboutData.insAffiliated}
                            disabled
                            readonly
                          />
                        ) : (
                          <input
                            type="text"
                            name="insAffiliated"
                            className="form-control"
                            id="paffliated"
                            placeholder="Affliated University/Autonomous"
                            onChange={InsProfileAboutHandler}
                            required
                          />
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="pachieve" className="form-group mb-1">
                          Achievements
                        </label>
                        {profileAboutData.insAchievement ? (
                          <textarea
                            type="text"
                            name="insAchievement"
                            className="form-control"
                            id="pachieve"
                            rows="3"
                            cols="30"
                            value={profileAboutData.insAchievement}
                            disabled
                            readonly
                          ></textarea>
                        ) : (
                          <textarea
                            type="text"
                            name="insAchievement"
                            className="form-control"
                            id="pachieve"
                            rows="3"
                            cols="30"
                            placeholder="Write your latest achievements here..."
                            onChange={InsProfileAboutHandler}
                            required
                          ></textarea>
                        )}
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="pregdates" className="form-group mb-1">
                          Leaving Editable Text 1
                        </label>
                        {profileAboutData.insEditableText ? (
                          <input
                            type="text"
                            name="insEditableText"
                            className="form-control"
                            id="pregdates"
                            value={profileAboutData.insEditableText}
                            disabled
                            readonly
                          />
                        ) : (
                          <input
                            type="text"
                            name="insEditableText"
                            className="form-control"
                            id="pregdates"
                            maxLength="250"
                            placeholder="Leaving Editable text 1"
                            onChange={InsProfileAboutHandler}
                            required
                          />
                        )}
                      </div>
                      <div className="col-12 mb-3">
                        <label
                          htmlFor="pregdateText"
                          className="form-group mb-1"
                        >
                          Leaving Editable Text 2
                        </label>
                        {profileAboutData.insEditableTexts ? (
                          <input
                            type="text"
                            name="insEditableTexts"
                            className="form-control"
                            id="pregdateText"
                            value={profileAboutData.insEditableTexts}
                            disabled
                            readonly
                          />
                        ) : (
                          <input
                            type="text"
                            name="insEditableTexts"
                            className="form-control"
                            id="pregdateText"
                            maxLength="70"
                            placeholder="Leaving editable text 2"
                            onChange={InsProfileAboutHandler}
                            required
                          />
                        )}
                      </div>
                    </div>
                    {profileAboutData.insEstdDate &&
                    profileAboutData.insAffiliated &&
                    profileAboutData.insEditableText &&
                    profileAboutData.insEditableTexts &&
                    profileAboutData.insAchievement ? (
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

export default InstituteProfileDisplayAbout;
