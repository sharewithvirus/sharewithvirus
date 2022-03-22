import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { requestURL } from "./ReqUrl";
import { useNavigate } from "react-router";
import axios from "axios";

function InsSearchResults(props) {
  const [institute, setInstitute] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${requestURL}/insdashboard`).then((res) => {
      setInstitute(res.data.institute);
    });
  }, []);
  return (
    <>
      <div
        className={`${styles.popupbg2}`}
        onClick={() => props.changeExplore(false)}
      ></div>

      <div className={`${styles.resultContainer}`}>
        {institute &&
          institute
            .filter((val) => {
              if (props.instituteSearch === "") {
                return val;
              } else if (
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
                  navigate(`/search/${props.id}/ins-search-profile/${val._id}`)
                }
              >
                {props.id !== val._id ? (
                  <>
                    {val.status === 'Not Approved' ? '' : <>
                    <p>{val.insName} </p>
                    <img
                      src={
                        val.photoId === "1"
                          ? "/images/institute-avatar.jpeg"
                          : `${requestURL}/insprofileabout/photo/${val.insProfilePhoto}`
                      }
                    />
                    </>
                    }
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

export default InsSearchResults;