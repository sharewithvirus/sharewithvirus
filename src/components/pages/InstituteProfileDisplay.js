import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import ProfileDiaplaySection from "../ProfileDiaplaySection";
import ProfileDetailsBar from "../ProfileDetailsBar";
import ProfileSidebar from "../ProfileSidebar";
import ProfileSections from "../ProfileSections";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import axios from "axios";
import { Success } from "../SnackBar";
// import BackButton from "../BackButton";
import { requestURL } from "../ReqUrl";
import InstituteAnnouncementCard from "../InstituteAnnouncementCard";
import InstituteProfileSidebar from "../InstituteProfileSidebar";

const InstituteProfileDisplay = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [first, setFirst] = useState(false);
  const [profileDisplayData, setProfileDisplayData] = useState("");
  const [profileDisplayPostData, setProfileDisplayPostData] = useState([]);
  const [profileDisplayfollowersData, setProfileDisplayFollowersData] =
    useState([]);
  const [profileDisplayfollowingData, setProfileDisplayFollowingData] =
    useState([]);
  const [staffData, setStaffData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [insProfileDisplay, setInsProfileDisplay] = useState({
    insOperatingAdmin: "",
    insPrinciple: "",
    insStudentPresident: "",
    insTrusty: "",
    insAdminClerk: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const InsProfileDisplayHandler = (e) => {
    const { name, value } = e.target;
    setInsProfileDisplay({
      ...insProfileDisplay,
      [name]: value,
    });
  };

  const InsProfileDisplayHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/insprofiledisplay/${params.id}`, insProfileDisplay)
      .then((res) => {
        if (res.data.message) {
          setInsProfileDisplay({ showMessages: true, msg: res.data.message });
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
        setProfileDisplayData(res.data.institute);
        setProfileDisplayPostData(res.data.institute.posts);
        setProfileDisplayFollowersData(res.data.institute.followers);
        setProfileDisplayFollowingData(res.data.institute.following);
        setStaffData(res.data.institute.ApproveStaff);
        setSearchUserList(res.data.institute.userFollowersList);
        setStudentData(res.data.institute.ApproveStudent);
        setFirst(true);
      })
      .catch((e) => {
        setInsProfileDisplay({
          showMessages: true,
          msg: "something went wrong",
        });
      });
  }, []);
  // }, [profileDisplayData]);
  return (
    <>
      {insProfileDisplay.showMessages ? (
        <Success msg={insProfileDisplay.msg} />
      ) : null}
      <div className={`${styles.mainScreen} ${styles.profilePage}`}>
        <NavbarTopInstitute id={params.id} />
        <div className={styles.mainContent}>
          <div className={`${styles.profileDisplay} mt-3`}>
            <ProfileDiaplaySection
              profilePicSrc={
                profileDisplayData.photoId === "1"
                  ? "/images/institute-avatar.jpeg"
                  : first
                  ? `${requestURL}/insprofileabout/photo/${profileDisplayData.insProfilePhoto}`
                  : null
              }
              actionBtn="Setting"
              id={params.id}
              coverPicSrc={
                profileDisplayData.coverId === "2"
                  ? "/images/user-ins-cover-photo2.jpg"
                  : first
                  ? `${requestURL}/insprofileabout/coverphoto/${profileDisplayData.insProfileCoverPhoto}`
                  : null
              }
            />
            <ProfileDetailsBar
              followers={profileDisplayfollowersData}
              following={profileDisplayfollowingData}
              profilePost={profileDisplayPostData}
              profileText={profileDisplayData}
              joinedStaff={staffData.length >= 1 ? staffData.length : ""}
              joinedStudent={studentData.length >= 1 ? studentData.length : 0}
              userFollow={searchUserList}
              id={params.id}
            />
          </div>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
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
                  <form onSubmit={InsProfileDisplayHandlerChange}>
                    <div className={` m-4`}>
                      <div className="col col-12 mb-3">
                        <label htmlFor="padmin" className="form-group mb-1">
                          Operating Admin
                        </label>
                        {profileDisplayData.insOperatingAdmin ? (
                          <input
                            type="text"
                            name="padmin"
                            className="form-control"
                            id="padmin"
                            value={profileDisplayData.insOperatingAdmin}
                            disabled
                            readOnly
                          />
                        ) : (
                          <input
                            type="text"
                            name="insOperatingAdmin"
                            className="form-control"
                            id="padmin"
                            placeholder="Operating Admin"
                            onChange={InsProfileDisplayHandler}
                            required
                          />
                        )}
                      </div>
                      <div className="col col-12  mb-3">
                        <label htmlFor="pprinciple" className="form-group mb-1">
                          Principle
                        </label>
                        {profileDisplayData.insPrinciple ? (
                          <input
                            type="text"
                            name="pprinciple"
                            className="form-control"
                            id="pprinciple"
                            value={profileDisplayData.insPrinciple}
                            disabled
                            readOnly
                          />
                        ) : (
                          <input
                            type="text"
                            name="insPrinciple"
                            className="form-control"
                            id="pprinciple"
                            placeholder="Enter Principle Name"
                            onChange={InsProfileDisplayHandler}
                            required
                          />
                        )}
                      </div>
                      <div className="col col-12 mb-3">
                        <label htmlFor="ppresident" className="form-group mb-1">
                          Student President
                        </label>
                        {profileDisplayData.insStudentPresident ? (
                          <input
                            type="text"
                            name="ppresident"
                            className="form-control"
                            id="ppresident"
                            value={profileDisplayData.insStudentPresident}
                            disabled
                            readOnly
                          />
                        ) : (
                          <input
                            type="text"
                            name="insStudentPresident"
                            className="form-control"
                            id="ppresident"
                            placeholder="Enter Student President Name"
                            onChange={InsProfileDisplayHandler}
                            required
                          />
                        )}
                      </div>
                      <div className="col col-12 mb-3">
                        <label htmlFor="ptrusty" className="form-group mb-1">
                          Trusty
                        </label>
                        {profileDisplayData.insTrusty ? (
                          <input
                            type="text"
                            name="ptrusty"
                            className="form-control"
                            id="ptrusty"
                            value={profileDisplayData.insTrusty}
                            disabled
                            readOnly
                          />
                        ) : (
                          <input
                            type="text"
                            name="insTrusty"
                            className="form-control"
                            id="ptrusty"
                            placeholder="Enter Trusty Name"
                            onChange={InsProfileDisplayHandler}
                            required
                          />
                        )}
                      </div>
                      <div className="col col-12 mb-3">
                        <label htmlFor="admin" className="form-group mb-1">
                          Admin Clerk
                        </label>
                        {profileDisplayData.insAdminClerk ? (
                          <input
                            type="text"
                            name="admin"
                            className="form-control"
                            id="admin"
                            value={profileDisplayData.insAdminClerk}
                            disabled
                            readOnly
                          />
                        ) : (
                          <input
                            type="text"
                            name="insAdminClerk"
                            className="form-control"
                            id="admin"
                            placeholder="Enter Admin Clerk"
                            onChange={InsProfileDisplayHandler}
                            required
                          />
                        )}
                      </div>
                      {profileDisplayData.insOperatingAdmin &&
                      profileDisplayData.insPrinciple &&
                      profileDisplayData.insStudentPresident &&
                      profileDisplayData.insTrusty &&
                      profileDisplayData.insAdminClerk ? (
                        ""
                      ) : (
                        <div className="col-12 mb-3">
                          <button
                            type="submit"
                            className="btn btn-outline-primary mt-4 px-5 mx-auto"
                          >
                            <i class="fas fa-plus mt-1 mx-1"></i>Add Display
                            Person
                          </button>
                        </div>
                      )}
                    </div>
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

export default InstituteProfileDisplay;
