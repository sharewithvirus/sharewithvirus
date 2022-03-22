import React from "react";
import styles from "./Home.module.css";
import { requestURL } from "./ReqUrl";
import { useNavigate } from "react-router";

function SearchResults(props) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${styles.popupbg2}`}
        onClick={() => props.changeExplore(false)}
      ></div>

      <div className={`${styles.resultContainer}`}>
        {props.institute &&
          props.institute
            .filter((val) => {
              if (props.instituteSearch === "") {
                return val;
              } else if (
                val.insName &&
                val.insName
                  .toLowerCase()
                  .includes(props.instituteSearch.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val, i) => (
              <div
                key={i}
                className={styles.searchItem}
                onClick={() =>
                  navigate(`/user/${props.uid}/search/insdashboard/${val._id}`)
                }
              > 
                {val.status === 'Not Approved' ? '' : <>
                <p>{val.insName}</p>
                <img
                  src={
                    val.photoId === "1"
                      ? "/images/institute-avatar.jpeg"
                      : `${requestURL}/insprofileabout/photo/${val.insProfilePhoto}`
                  }
                />
                </>
                }
              </div>
            ))}
        {props.users &&
          props.users
            .filter((val) => {
              if (props.instituteSearch === "") {
                return val;
              } else if (
                val.userLegalName &&
                val.userLegalName
                  .toLowerCase()
                  .includes(props.instituteSearch.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val, i) => (
              <div
                key={i}
                className={styles.searchItem}
                onClick={() =>
                  navigate(
                    `/search/${props.uid}/user-search-profile/${val._id}`
                  )
                }
              >
                {props.uid !== val._id ? (
                  <>
                    <p>{val.userLegalName}</p>
                    <img
                      src={
                        val.photoId === "1"
                          ? "/images/image-boy2.png"
                          : `${requestURL}/userprofileabout/coverphoto/${val.profilePhoto}`
                      }
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            ))}
      </div>
    </>
  );
}

export default SearchResults;