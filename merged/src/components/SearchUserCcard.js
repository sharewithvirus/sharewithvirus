import React, {useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'

const SearchUserCcard = (props) => {
  const navigate = useNavigate();
  const params = useParams()

  return (
    <>
      {props.classData && props.classData.map((ct) => (
      <div
        className={` ${styles.dlogo} ${styles.cardView}`}
        onClick={() => navigate(`/user/${props.sid}/ins/${params.id}/department/${params.did}/batch/${params.bid}/class/${ct._id}`)}
      >
        <img className={styles.dlogoImages} src={props.imgSrc} />
        <p className={styles.dlogoText}>
          <small>{ct.className ? `${ct.className} Class` :''}</small>
        </p>
      </div>
      ))}
    </>
  );
};
SearchUserCcard.defaultProps = {
  imgSrc: "/images/logo-classroom.png",
  cname: "Class Name",
};

export default SearchUserCcard;
