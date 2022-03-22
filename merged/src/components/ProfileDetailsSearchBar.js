import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileDetailsSearchBar = (props) => {
  const navigate = useNavigate();


return (
    <>
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
            <div className={styles.barInnersRight} onClick={() => navigate(`/user/${props.uuid}/insdepartment/${props.profileText._id ? props.profileText._id : ''}`)}>
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
            <div className={styles.barInnersRight} onClick={() => navigate(`/user/${props.uuid}/allstaff/${props.profileText._id ? props.profileText._id : ''}`)}>
              <p>
              <img
                src="/images/admission-icon.svg"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Admission"
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
    </>
)
}

export default ProfileDetailsSearchBar