import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import AboutSection from "../AboutSection";
import InstituteSidebar from "../InstituteSidebar";
import ProfileDisplaySection from "../ProfileDiaplaySection";
import NewDetailsBar from "../NewDetailsBar";
import InstituteStatsSection from "../InstituteStatsSection";
import BackButton from "../BackButton";

const DepartmentPreviousBatch = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute />
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection
                  imageSrc="https://themes.pixelstrap.com/friendbook/assets/images/user/3.jpg"
                  name="Josephin water"
                />

                <InstituteSidebar />
                <div className={styles.rightCols}>
                  <InstituteStatsSection />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <BackButton />
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection />
                  <NewDetailsBar />
                  <div className={`mb-5 ${styles.ddetail}`}>
                    <div className="row">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() => navigate("/department")}
                      >
                        <span>
                          <i class="fas fa-info-circle "></i>
                        </span>
                      </div>
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() => navigate("/departmentclass")}
                      >
                        <span>
                          <i class="fas fa-tasks mt-1 mx-2"></i>
                        </span>
                      </div>
                      <div className={`${styles.dTab}`}>
                        <span>
                          <i class="far fa-object-ungroup"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <form className="row mt-0">
                    <div className="d-flex justify-content-between">
                      <div className="col-5">
                        <label for="batch" className="form-label">
                          Select Batch
                        </label>
                        <select
                          id="batch"
                          className="form-control"
                          onChange={() => navigate("/currentbatch")}
                        >
                          <option value="2020-2021 Batch active" selected>
                            2020-2021 Batch
                          </option>
                          <option value="2021-2022 Batch">
                            2021-2022 Batch
                          </option>
                        </select>
                      </div>

                      <div className="col-5 mt-4 d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-sm btn-success px-3"
                        >
                          Create New Batch
                        </button>
                      </div>
                    </div>
                    <div className="col-6 mx-auto my-4">
                      <h5>Batch 2020-2021</h5>
                    </div>
                    <hr />
                    <div className="row row-cols-1 row-cols-md-2">
                      <div className="col-6 mb-2">
                        <p
                          className="text-muted"
                          onClick={() => navigate("/unlockbatch")}
                        >
                          <i class="fas fa-lock mx-2"></i>
                          Completed Batch
                        </p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <div className="text-muted">Created On - 01-01-2001</div>
                    </div>
                    <hr />
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dhead" className="form-label">
                        Department Head
                      </label>
                      <input
                        type="text"
                        name="dhead"
                        className="form-control"
                        id="dhead"
                        placeholder="Department Head ( Principle Name )"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dadmin" className="form-label">
                        Operating Admin
                      </label>
                      <input
                        type="text"
                        name="dadmin"
                        className="form-control"
                        id="dadmin"
                        placeholder="Operating Admin"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dstaff" className="form-label">
                        Total Staff
                      </label>
                      <input
                        type="text"
                        name="dstaff"
                        className="form-control"
                        id="dstaff"
                        placeholder="Total Staff ( Principle Name )"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dstudents" className="form-label">
                        Total Students
                      </label>
                      <input
                        type="text"
                        name="dstudents"
                        className="form-control"
                        id="dstudents"
                        placeholder="Total Students"
                      />
                    </div>
                    <div className=" d-flex col-10 flex-row justify-content-center  mt-5 mx-auto">
                      <button
                        type="button"
                        className="btn btn-outline-danger mt-2 mx-2"
                      >
                        <i class="fas fa-pen"> &nbsp; Edit</i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-success mt-2 mx-2"
                      >
                        <i class="fas fa-save"> &nbsp; Save</i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute />
      </div>
    </>
  );
};

export default DepartmentPreviousBatch;
