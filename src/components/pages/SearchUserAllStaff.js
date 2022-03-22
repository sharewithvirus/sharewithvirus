import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutSection from "../AboutSection";
import StaffCard from "../StaffCard";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import SearchUserStaffCard from "../SearchUserStaffCard";
import StaffUserCard from "../StaffUserCard";

const SearchUserAllStaff = () => {
  const params = useParams();

  const [allStaffData, setAllStaffData] = useState("");
  const [allStaffApprove, setAllStaffApprove] = useState([]);

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setAllStaffData(res.data.institute);
        setAllStaffApprove(res.data.institute.ApproveStaff);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [allStaffData]);

  return (
    <>
      <NavbarTopUser uid={params.sid} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <div className={`mt-5 ${styles.dabout} ${styles.active}`}>
                  <img src="/images/staff-icon.svg" title="Staff" /> Staff
                  </div>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <h4>
                      Staff
                      <span className={styles.staffForm}></span>
                    </h4>

                    {/* <div className="row d-flex justify-content-between align-items-center mb-4"> */}
                    <div className={styles.actionApproved}>
                      <div className="col-7">
                        <input
                          type="text"
                          name="search"
                          className="form-control"
                          placeholder="search staff here"
                        />
                      </div>
                      <div className={`col-4 col-lg-3 ${styles.countSection}`}>
                        <p>Action Approved: {allStaffApprove.length}</p>
                      </div>
                    </div>

                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                      {allStaffApprove && (
                        <StaffUserCard
                          approveData={allStaffApprove}
                          uid={params.sid}
                        />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomUser uid={params.sid} />
    </>
  );
};

export default SearchUserAllStaff;
