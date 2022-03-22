import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchUserDCard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.departData && props.departData.map((dt) => (
      <div
        className={` ${styles.dlogo} ${styles.cardView}`}
        onClick={() => navigate(`/user/${props.sid ? props.sid : ''}/${props.id}/department/${dt._id}`)}
      >
        <img className={styles.dlogoImages} src={dt.profilePhoto ? dt.profilePhoto : 'http://localhost:3000/images/icon-admission.svg'} />
        <p className={styles.dlogoText}>
          <small>{dt.dName}</small>
        </p>
      </div>
      ))}
    </>
  );
};
SearchUserDCard.defaultProps = {
  imgSrc: "/images/logo-department.png",
  dname: " Department Name",
};

export default SearchUserDCard;
