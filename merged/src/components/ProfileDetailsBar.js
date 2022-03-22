import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileDetailsBar = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.id ?
      <div className={styles.bar}>
        <div className={styles.barMainrow}>
          <div
            className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
          >
            <div className={` ${styles.barInnersLeft}`}>
              <p>{props.profilePost.length}</p>
              <p>Posts</p>
            </div>
            <div className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}>
              <p>{props.followers.length + props.userFollow.length}</p>
              <p>Followers</p>
            </div>
            <div
              className={` ${styles.barInnersLeft} ${styles.barRightShort} `}
            >
              <p>{props.following.length}</p>
              <p>Following</p>
            </div>
            <div className={`${styles.barInnersLeft}`}>
              <p>{ props.joinedStaff + props.joinedStudent}</p>
              <p>Joined</p>
            </div>
          </div>
          <div
            className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
          >
            <div className={`w-100 ${styles.barInnerCenter}`}>
              <p className={` ${styles.profileName}`}>{props.profileText.insName}</p>
              <p>
                {/* <span>
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{props.location}</span>
                </span> */}

                <span>
                  {/* <i class="fas fa-link"></i> */}
                  {/* <a href={props.link}> */}
                    <span style={{fontSize: '15px'}}>{props.profileText.name}</span>
                  {/* </a> */}
                </span>

                {/* <span>
                  <i class="fas fa-calendar-alt"></i>
                  <span>Since {props.DOJ}</span>
                </span> */}
              </p>
            </div>
            {/* <div className={styles.barInners}><i class="fas fa-search mt-1 mx-2"></i><input type="text" name="search" placeholder="Search Here..."/></div> */}
          </div>
          <div
            className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}
          >
            <div className={styles.barInnersRight} onClick={() => navigate(`/insdepartment/${props.profileText._id ? props.profileText._id : ''}`)}>
              <p>
              <img
                src="/images/department-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Department"
              />
              </p>
              <p>Departments</p>
            </div>
            <div className={styles.barInnersRight}>
              <p>
              <img
                src="/images/admission-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Admission"
              />
              </p>
              <p>Admissions</p>
            </div>
            <div className={styles.barInnersRight} onClick={() => navigate(`/allstaff/${props.profileText._id ? props.profileText._id : ''}`)}>
              <p>
              <img
                src="/images/staff-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Staff"
              />
              </p>
              <p>Staff</p>
            </div>
            <div className={styles.barInnersRight}>
              <p>
              <img
                src="/images/student-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Student"
              />
              </p>
              <p>Students</p>
            </div>
          </div>
        </div>
      </div>
      : 
      <div className={styles.bar}>
        <div className={styles.barMainrow}>
          <div
            className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
          >
            <div className={` ${styles.barInnersLeft}`}>
              <p>{props.userprofilePost.length}</p>
              <p>Posts</p>
            </div>
            <div className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}
            onClick={() => props.changeIndex(1)}
            >
              <p>{props.userfollowers.length}</p>
              <p>Followers</p>
            </div>
            <div
              className={` ${styles.barInnersLeft} ${styles.barRightShort} `}
              onClick={() => props.changeIndex(1)}
            >
              <p>{props.userfollowing.length + props.userInsFollow.length}</p>
              <p>Following</p>
            </div>
            <div className={`${styles.barInnersLeft}`}
            onClick={() => props.changeIndex(1)}
            >
              <p>{props.circle.length}</p>
              <p>Circle</p>
            </div>
          </div>
          <div
            className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
          >
            <div className={`w-100 ${styles.barInnerCenter}`}>
              <p className={` ${styles.profileName}`}>{props.userprofileText.userLegalName}</p>
              <p>
                {/* <span>
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{props.location}</span>
                </span> */}

                <span>
                  {/* <i class="fas fa-link"></i> */}
                  {/* <a href={props.link}> */}
                    <span style={{fontSize: '15px'}}>{props.userprofileText.username}</span>
                  {/* </a> */}
                </span>

                {/* <span>
                  <i class="fas fa-calendar-alt"></i>
                  <span>Since {props.DOJ}</span>
                </span> */}
              </p>
            </div>
            {/* <div className={styles.barInners}><i class="fas fa-search mt-1 mx-2"></i><input type="text" name="search" placeholder="Search Here..."/></div> */}
          </div>
          <div
            className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}
          >
            {props.userprofileText.userBio ? (
                <div className={styles.barInnersRight}>
                  <p>
                    {props.userprofileText.userBio
                      ? props.userprofileText.userBio.substr(0, 138)
                      : "About"}
                  </p>
                  {/* <p>{props.userprofileText.userBio ? props.userprofileText.userBio.substr(45,66) : ''}</p> */}
                </div>
              ) : (
                <div className={`${styles.barInnersRight} mx-auto`}>
                  <p>
                    {props.userprofileText.userBio
                      ? props.userprofileText.userBio.substr(0, 138)
                      : "About"}
                  </p>
                  {/* <p>{props.userprofileText.userBio ? props.userprofileText.userBio.substr(45,66) : ''}</p> */}
                </div>
              )}
            {/* <div className={styles.barInnersRight}>
              <p>
                <i class="fas fa-landmark mt-1 mx-2"></i>
              </p>
              <p>KYC</p>
            </div> */}
            {/* <div className={styles.barInnersRight} onClick={() => navigate(`/user/${props.userprofileText._id ? props.userprofileText._id : ''}/staffmember`)}>
              <p>
                <i class="fas fa-chalkboard-teacher mt-1 mx-1"></i>
              </p>
              <p>Joined</p>
            </div> */}
            
            {/* <div className={styles.barInnersRight}>
              <p>
                <i class="fas fa-users mt-1 mx-1"></i>
              </p>
              <p>Students</p>
            </div> */}
          </div>
        </div>
      </div>
      }
    </>
  );
};

ProfileDetailsBar.defaultProps = {
  name: "Profile Name",
  location: "New Delhi",
  link: "#",
  DOJ: "Dec 2021",
  // postsCount: 50,
  // followersCount: 140,
  // followedCount: 100,
  joinedCount: 120,
};

export default ProfileDetailsBar;
