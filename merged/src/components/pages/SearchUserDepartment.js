import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutSection from "../AboutSection";
import InstituteSidebar from "../InstituteSidebar";
import InstituteStatsSection from "../InstituteStatsSection";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import SearchUserDCard from "../SearchUserDCard";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";

const SearchUserDepartment = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [department, setDepartment] = useState(false);
  // const [dmodalOpen, setDepartmentModal] = useState(false);

  const [dInsData, setDInsData] = useState("");
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    axios.get(`${requestURL}/insdashboard/${params.id}`).then((res) => {
      const data = res.data.institute;
      const ddata = res.data.institute.depart;
      setDInsData(data);
      setDepartmentData(ddata);
    });
  }, []);
  // }, [dInsData]);

  return (
    <>
      <NavbarTopUser uid={params.sid} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <InstituteSidebar id={params.id} />
                <div className={styles.rightCols}>
                  <InstituteStatsSection id={params.id} />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div
                className={` h-100 ${styles.about}`}
                style={{ marginTop: "24px" }}
              >
                {/* <BackButton /> */}
                <h4 className="my-5">Departments</h4>
                <div className="mb-3 d-flex justify-content-center">
                  <div class="w-50">
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      placeholder="Search Departments..."
                    />
                  </div>
                </div>
                <div className={`mb-5 ${styles.dsearch} `}>
                  <div className=" mb-3 col col-3"></div>
                </div>
                <div className={`mb-5 ${styles.dsearch} `}>
                  <div className=" mb-3 col col-3"></div>
                </div>
                <div className={` gx-0  ${styles.cardContainer} `}>
                  <SearchUserDCard
                    departData={departmentData ? departmentData : ""}
                    id={params.id}
                    sid={params.sid}
                  />
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

export default SearchUserDepartment;
