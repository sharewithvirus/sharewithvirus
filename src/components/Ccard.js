import React from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Ccard = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      {props.classData &&
        props.classData.map((ct) => (
          <div
            className={` ${styles.dlogo} ${styles.cardView}`}
            onClick={() =>
              navigate(
                `/ins/${params.id}/department/${params.did}/batch/${params.bid}/class/${ct._id}`
              )
            }
          >
            <img
              className={styles.dlogoImages}
              src={props.imgSrc}
              alt="not found"
            />
            <p className={styles.dlogoText}>
              <small>
                {ct.className ? `${ct.className}-${ct.classTitle} Class` : ""}
              </small>
            </p>
          </div>
        ))}
    </>
  );
};
Ccard.defaultProps = {
  imgSrc: "/images/logo-classroom.png",
  cname: "Class Name",
};

export default Ccard;
