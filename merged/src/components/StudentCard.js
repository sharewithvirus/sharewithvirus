import React from "react";
// import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { requestURL } from "./ReqUrl";


const StudentCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.studentDataList &&
        props.studentDataList.map((st) => (
          <div
            className={` ${styles.dlogo} ${styles.cardView}`}
            onClick={() =>
              navigate(
                `/${props.id ? props.id : ""}/user/${
                  st.user._id
                }/student/view/profile/${st._id}`
              )
            }
            // onClick={() => navigate("/studentattendence")}
          >
            <img
              className={styles.dlogoImages}
              src={
                st.photoId === "1"
                  ? "/images/image-boy2.png"
                  : `${requestURL}/search/insdashboard/studentdata/photo/${st.studentProfilePhoto}`
              }
            />
            <p className={styles.dlogoText}>
              <small>{`${st.studentFirstName} ${
                st.studentMiddleName ? st.studentMiddleName : ""
              } ${st.studentLastName}`}</small>
            </p>
          </div>
        ))}
    </>
  );
};
StudentCard.defaultProps = {
  imgSrc: "/images/image-boy1.png",
  name: " Student Name",
};

export default StudentCard;
