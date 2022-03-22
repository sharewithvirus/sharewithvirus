import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
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
import axios from "axios";
import { requestURL } from "../ReqUrl";
import moment from "moment";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";

const SearchUserDepartmentCurrentBatch = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [dBatchData, setDBatchData] = useState([]);
  const [departData, setDepartData] = useState([]);
  const [batchDataText, setBatchDataText] = useState("");
  const [data, setData] = useState(true);
  const [dBatchTextData, setDBatchTextData] = useState("");

  const BatchDetailHandler = (e) => {
    const batch = e.target.value;
    axios
      .get(`${requestURL}/${params.did}/batchdetail/${batch}`)
      .then((res) => {
        setBatchDataText(res.data.batches);
        setData(true);
        console.log(res.data.batches);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    axios
      .get(`${requestURL}/department/${params.did}`)
      .then((res) => {
        setDBatchTextData(res.data.department.departmentSelectBatch);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };
  useEffect(() => {
    axios
      .get(`${requestURL}/department/${params.did}`)
      .then((res) => {
        const data = res.data.department;
        const batch = res.data.department.batches;

        setDepartData(data);
        setDBatchData(batch);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [departData]);

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.sid} />
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <InstituteSidebar id={params.id} />
                <div className={styles.rightCols}>
                  <InstituteStatsSection />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection />
                  <NewDetailsBar dData={departData} />
                  <div className={`mb-5 ${styles.ddetail}`}>
                  <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-3">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/user/${params.sid}/${params.id}/department/${params.did}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />
                        </span>
                      </div>
                      </div>
                      <div className="col-3">
                      {batchDataText._id ? (
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          onClick={() =>
                            navigate(
                              `/user/${params.sid}/${params.id}/departmentclass/${params.did}/batch/${batchDataText._id}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/class-icon.svg" title="Class" />
                          </span>
                        </div>
                      ) : (
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          disabled
                        >
                          <span>
                          <img src="/images/class-icon.svg" title="Class" />
                          </span>
                        </div>
                      )}
                      </div>
                      <div className="col-3">
                      <div className={`${styles.dTab}`}>
                        <span>
                        <img src="/images/batch-icon.svg" title="Batch" />
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>
                  <form
                    className="row mt-0"
                  >
                    <div className="d-flex justify-content-between my-4">
                      <div className="col-5">
                        <label for="batch" className="form-label">
                          Select Batch
                        </label>
                        <select
                          id="batch"
                          class="form-select form-select-lg"
                          aria-label="Default select example"
                          onChange={BatchDetailHandler}
                        >
                          <option value="Select Batch">Select Batch</option>
                          {dBatchData &&
                            dBatchData.map((de) => (
                              <option value={de._id}>{de.batchName}</option>
                            ))}
                        </select>
                      </div>
                      <div className="col-5 mx-auto mt-4 d-flex justify-content-end">
                      <h5>{batchDataText ? batchDataText.batchName : ""}</h5>
                      </div>
                    </div>
                    <hr />
                    <div className="row row-cols-1 row-cols-md-2">
                      <div className="col-12 col-md-6 mb-2 d-flex">
                        <div className={`text-muted ${styles.continueBatch}`}>
                          {batchDataText ? (
                            <input
                              type="checkbox"
                              name="batch"
                              className="mx-2 mt-2"
                              checked
                            />
                          ) : (
                            <input
                              type="checkbox"
                              name="batch"
                              className="mx-2 mt-2"
                            />
                          )}
                          <p> Continue Batch</p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <div className="text-muted">
                          Created On -{" "}
                          {moment(batchDataText.createdAt).format("DD-MM-YYYY")}
                        </div>
                      </div>
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
                        value={
                          departData.dHead
                            ? `${departData.dHead.staffFirstName} ${
                                departData.dHead.staffMiddleName
                                  ? departData.dHead.staffMiddleName
                                  : ""
                              } ${departData.dHead.staffLastName}`
                            : ""
                        }
                        disabled
                        readOnly
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
                        value={
                          departData.dOperatingAdmin
                            ? departData.dOperatingAdmin
                            : ""
                        }
                        disabled
                        readOnly
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
                        value="Total Staff ( Principle Name )"
                        disabled
                        readOnly
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
                        value="Total Students"
                        disabled
                        readOnly
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.sid} />
      </div>
    </>
  );
};

export default SearchUserDepartmentCurrentBatch;
