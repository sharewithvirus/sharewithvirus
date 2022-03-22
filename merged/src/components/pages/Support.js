import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import AdminAbout from "./AdminAbout.js";
import AdminSideBar from "../AdminSideBar";
import { Link } from 'react-router-dom'
import NewSupportReply from './NewSupportReply'

const Support = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(true);
  const [addClass, setAddClass] = useState(false);
  const params = useParams();

  const [adminData, setAdminData] = useState("");
  const [userSupport, setUserSupport] = useState([]);

  useEffect(() => {
    axios.get(`${requestURL}/admindashboard/${params.aid}`)
    .then((res) =>{
        setAdminData(res.data.admin);
    })
    axios.get(`${requestURL}/all/user/support`).then((res) => {
      setUserSupport(res.data.userSupport);
    });
  }, []);

  const setAddClassFunction = () => {
    setAddClass(false);
    setData(true);
  };
  return (
    <>
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AdminAbout name={`${adminData.adminName}`} />

                <div className={`pt-5 ${styles.about} ${styles.leftMenu}`}>
                  <AdminSideBar aid={params.aid}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "22px" }}>
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <h4>User Supports</h4>
                    <div className={`mb-5 mt-2 ${styles.ddetail}`}>
                    <div className="row my-5 col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-6">
                        <div
                          className={`${styles.dTab} `}
                        >
                          <span>
                            <img
                              src="/images/user-admin-icon.svg"
                              title="Users"
                            />
                          </span>
                        </div>
                        </div>
                      <div className="col-6"
                      onClick={() => navigate(`/admin/${params.aid}/query/institute`)}
                      >
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                        >
                          <span>
                            <img
                              src="/images/institute-admin-icon.svg"
                              title="Institute"
                            />
                          </span>
                        </div>
                        </div>
                      </div>
                    </div>
                    </form>

                    <div className="row d-flex justify-content-between align-items-center mb-4">
                      <div
                        className={`col-6 col-xl-3 ${styles.barInnersLeft} ${styles.countSection}`}
                      >
                        <p>{userSupport.length}</p>
                        <p>Action Pending</p>
                      </div>
                    </div>
                    {userSupport && userSupport.map((ct) => (
                    <div className={` ${styles.dUser}`}>
            <div className="col-xl-9 col-lg-8 col-md-12 d-flex justify-content-between align-items-center">
              <div>
                <img
                  className={styles.insUserProfiles}
                  src={
                    ct.user.photoId === "1"
                      ? "/images/image-boy2.png"
                      : `${requestURL}/userprofileabout/coverphoto/${ct.user.profilePhoto}`
                  }
                  alt="Profile"
                />
                <span className="mt-3 mx-3">
                   <Link to='#'>{ct.user.username}</Link>
                </span>
                <span className="mt-3 mx-3">{ct.body} - {ct.rating}</span>
              </div>
              {/* <Link to={`/${props.aid}/ins/application/${rt._id}`} className="mx-3">
            View
          </Link> */}
            </div>
            {ct.queryReply ? '' :
            <>
            <div
              id="btnGroup"
              className="btn-group col-xl-1 col-lg-2 col-md-3 mx-auto"
              role="group"
            >
              <button
                type="button"
                class={`btn btn-primary`}
                onClick={() => {
                    setAddClass(true);
                  }}
              >
                Reply
              </button>
            </div>
            <NewSupportReply
                setAddClassFunction={setAddClassFunction}
                trigger={addClass}
                setTrigger={setAddClass}
                urid={ct._id}
                uid={ct.user._id}
            />
            </>
            }
          </div>
                                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Support;
