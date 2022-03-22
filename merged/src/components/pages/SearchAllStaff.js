import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import AboutSection from "../AboutSection";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import StaffCard from "../StaffCard";
import { requestURL } from "../ReqUrl";
// import BackButton from "../BackButton";
import axios from "axios";

const SearchAllStaff = () => {
  // const navigate = useNavigate();
  const params = useParams();

  const [allStaffData, setAllStaffData] = useState("");
  const [allStaffApprove, setAllStaffApprove] = useState([]);

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        const staffData = res.data.institute;
        const staffText = res.data.institute.ApproveStaff;
        setAllStaffData(staffData);
        setAllStaffApprove(staffText);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [allStaffData]);

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.sid} />
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <div
                    className={`mt-5 ${styles.dabout} ${styles.active}`}
                    // onClick={() => navigate(`/allstaff/${params.id}`)}
                  >
                  <img src="/images/staff-icon.svg" title="Staff" /> Staff
                  </div>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <h4>
                      Staff
                      <span className={styles.staffForm}></span>
                    </h4>
                    <div className="row d-flex justify-content-between align-items-center mb-4">
                      <div
                        className={`col-4 col-lg-3 ${styles.barInnersLeft} ${styles.countSection}`}
                      >
                        <p>{allStaffApprove.length}</p>
                        <p>Action Approved</p>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          name="search"
                          className="form-control"
                          placeholder="search staff here"
                        />
                      </div>
                    </div>

                    <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                      {allStaffApprove && (
                        <StaffCard
                          approveData={allStaffApprove}
                          id={params.id}
                        />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.sid} />
      </div>
    </>
  );
};

export default SearchAllStaff;
