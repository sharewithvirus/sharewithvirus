import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchUserStaffCard = (props) => {
  const navigate = useNavigate();

  return (
    <> 
      {props.approveData && props.approveData.map((at) =>(
      <div
        className={` ${styles.dlogo} ${styles.cardView}`}
        onClick={() => navigate(`/search/${props.uid ? props.uid : ''}/user-search-profile/${at.user._id}`)}
      >
        <img className={styles.dlogoImages} src='https://w7.pngwing.com/pngs/14/191/png-transparent-animated-film-cartoon-graphic-design-design-team-public-relations-business-thumbnail.png' />
        <p className={styles.dlogoText}>
          <small>{`(${at.staffROLLNO}) ${at.staffFirstName} ${at.staffMiddleName ? at.staffMiddleName : ''} ${at.staffLastName}`}</small>
        </p>
      </div>
      ))}
    </>
  );
};
SearchUserStaffCard.defaultProps = {
  imgSrc: "/images/image-staff.png",
  staffname: " Staff Name",
};

export default SearchUserStaffCard;
