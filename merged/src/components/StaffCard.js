import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "./ReqUrl";
const StaffCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {props.approveData &&
        props.approveData.map((at) => (
          <div
            className={` ${styles.dlogo} ${styles.cardView}`}
            onClick={() =>
              navigate(
                `/${props.id ? props.id : ""}/user/${
                  at.user._id
                }/staff/view/profile/${at._id}`
              )
            }
          >
            <img
              className={styles.dlogoImages}
              src={
                at.photoId === "1"
                  ? "/images/image-boy2.png"
                  : `${requestURL}/search/insdashboard/staffdata/photo/${at.staffProfilePhoto}`
              }
            />
            <p className={styles.dlogoText}>
              <small>{`(${props.approveData.indexOf(at) + 1}) ${
                at.staffFirstName
              } ${at.staffMiddleName ? at.staffMiddleName : ""} ${
                at.staffLastName
              }`}</small>
            </p>
          </div>
        ))}
    </>
  );
};
StaffCard.defaultProps = {
  imgSrc: "/images/image-staff.png",
  staffname: " Staff Name",
};

export default StaffCard;
