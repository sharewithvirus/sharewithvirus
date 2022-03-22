import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Scard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.subjectData && props.subjectData.map((st) =>(
      <div
        className={` ${styles.dlogo} ${styles.cardView}`}
      >
        <img className={styles.dlogoImages} src={props.imgSrc} />
        <p className={styles.dlogoText}>
          <small>{st.subjectName ? st.subjectName : ''} subject</small>
        </p>
      </div>
      ))}
    </>
  );
};
Scard.defaultProps = {
  imgSrc: "/images/logo-book.png",
  sname: " Subject Name",
};

export default Scard;
