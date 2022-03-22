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
import { Success, Danger } from "../SnackBar";
import { requestURL } from "../ReqUrl";

const NewBatch = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [createDepartmentBatchData, setCreateDepartmentBatchData] = useState(
    []
  );

  const [dBatchData, setDBatchData] = useState([]);

  const [batchData, setBatchData] = useState({
    batchName: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const BatchDataHandler = (e) => {
    const { name, value } = e.target;
    setBatchData({
      ...batchData,
      [name]: value,
    });
  };

  const BatchDataHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/addbatch/${params.did}/ins/${params.id}`, batchData)
      .then((res) => {
        if (res.data.message) {
          setBatchData({ showMessages: true, msg: res.data.message });
        }
        setTimeout(() => {
          navigate(`/${params.id}/currentbatch/${params.did}`);
        }, 500);
        // navigate(`/${params.id}/currentbatch/${params.did}`)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/department/${params.did}`)
      .then((res) => {
        const depart = res.data.department;
        setCreateDepartmentBatchData(depart);
        setDBatchData(res.data.department.departmentSelectBatch);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [createDepartmentBatchData]);

  return (
    <>
      <NavbarTopInstitute id={params.id} />
      {batchData.showMessages ? <Success msg={batchData.msg} /> : null}
      {/* {insLogin.showMessagesDanger ? <Danger msg={insLogin.msg} /> : null} */}
      <div className={styles.mainScreen}>
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
              <div className={`${styles.about}`}>
                {/* <BackButton /> */}
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection />
                  <NewDetailsBar dData={createDepartmentBatchData} />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-3">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                          onClick={() =>
                            navigate(`/${params.id}/department/${params.did}/`)
                          }
                        >
                          <span>
                            <img src="/images/info-icon.svg" title="Info" />
                          </span>
                        </div>
                      </div>
                      {dBatchData ? (
                        <div className="col-3">
                          <div
                            className={`${styles.dTab} ${styles.active} `}
                            onClick={() =>
                              navigate(
                                `/${params.id}/departmentclass/${params.did}/batch/${dBatchData._id}`
                              )
                            }
                          >
                            <span>
                              <img src="/images/class-icon.svg" title="Class" />
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="col-3">
                          <div className={`${styles.dTab} ${styles.active} `}>
                            <span>
                              <img src="/images/class-icon.svg" title="Class" />{" "}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="col-3">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                          onClick={() =>
                            navigate(
                              `/${params.id}/departmentmaster/${params.did}/batch/${dBatchData._id}`
                            )
                          }
                        >
                          <span>
                            <img src="/images/master-icon.svg" title="Master" />{" "}
                          </span>
                        </div>
                      </div>
                      <div className="col-3">
                        <div
                          className={`${styles.dTab}`}
                          onClick={() =>
                            navigate(`/${params.id}/currentbatch/${params.did}`)
                          }
                        >
                          <span>
                            <img src="/images/batch-icon.svg" title="Batch" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <form className="row mt-0" onSubmit={BatchDataHandlerChange}>
                    <div className="d-flex justify-content-between">
                      <div className="col-6">
                        <label for="batch" className="form-label">
                          New Batch Name 
                          <span className={styles.requireField}>*</span>
                        </label>
                        <input
                          type="text"
                          name="batchName"
                          id="batch"
                          className="form-control"
                          placeholder="Enter Batch Name (CS 2021-2022)"
                          onChange={BatchDataHandler}
                          required
                        />
                      </div>
                      <div className="col-6 mt-4 d-flex justify-content-end">
                        {batchData.batchName !== '' ?
                        <button
                          type="submit"
                          className="btn btn-primary px-3 my-0 mx-auto"
                        >
                          Add Batch
                        </button>
                        : 
                        <button type="submit" className="btn btn-primary px-3 my-0 mx-auto" disabled>
                          Add Batch
                        </button>
                        } 
                      </div>
                    </div>

                    {/* <div className=" d-flex col-10 flex-row justify-content-center  mt-5 mx-auto"> */}
                    {/* <button
                        type="button"
                        className="btn btn-outline-danger mt-2 mx-2"
                      >
                        <i class="fas fa-pen"> &nbsp; Edit</i>
                      </button> */}
                    {/* <button
                        type="button"
                        className="btn btn-outline-success mt-2 mx-2"
                      >
                        <i class="fas fa-save"> &nbsp; Save</i>
                      </button>
                    </div> */}
                  </form>
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

export default NewBatch;
