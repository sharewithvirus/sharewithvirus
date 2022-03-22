import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import AboutSection from "../AboutSection";
import InstituteSidebar from "../InstituteSidebar";
import NewDepartment from "./NewDepartment";
import Dcard from "../Dcard";
import InstituteStatsSection from "../InstituteStatsSection";
import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const Department = () => {
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
    // }, [departmentData]);
  }, []);

  const setDepartmentFunction = () => {
    setDepartment(false);
  };

  return (
    <>
      <NavbarTopInstitute id={params.id} />
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
                <div className="d-flex justify-content-between">
                  <i class="fas fa-arrow-left" onClick={() => navigate(-1)}></i>
                  <div></div>
                </div>
                <h4 className="my-5">Departments</h4>
                {/* <div className={`mb-5 ${styles.dsearch} `}> */}
                <div className="d-flex justify-content-around mb-5">
                  <div className="mb-3 w-50 ">
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      placeholder="Search Departments..."
                    />
                  </div>

                  <button
                    className={styles.changebtn}
                    // onClick={() => navigate("/newdepartment")}
                    onClick={() => {
                      setDepartment(true);
                    }}
                  >
                    Add Department
                  </button>
                </div>

                {department && (
                  <NewDepartment
                    setDepartmentFunction={setDepartmentFunction}
                    id={params.id}
                  />
                )}
                <div className={` gx-0  ${styles.cardContainer} `}>
                  <Dcard
                    departData={departmentData ? departmentData : ""}
                    id={params.id}
                  />
                  {/* <Dcard />
                  <Dcard />
                  <Dcard />
                  <Dcard />
                  <Dcard />
                  <Dcard /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomInstitute id={params.id} />
    </>
  );
};

export default Department;
