import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import AboutSection from "../AboutSection";
import InstituteSidebar from "../InstituteSidebar";
import NewAnnouncement from "../NewAnnouncement";
import InstituteStatsSection from "../InstituteStatsSection";
import { requestURL } from "../ReqUrl";
import axios from "axios";

const Announcement = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [announcement, setAnnouncement] = useState(false);

  const [insData, setInsData] = useState("");
  const [insAnnTextData, setInsAnnTextData] = useState([]);

  useEffect(() => {
    axios.get(`${requestURL}/insdashboard/${params.id}`).then((res) => {
      const announcements = res.data.institute.announcement;
      const data = res.data.institute;
      setInsAnnTextData(announcements);
      setInsData(data);
    });
  }, []);
  // }, [insData.announcement]);

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id} />
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
                <h4 className="my-5">Announcements</h4>
                <div className={`mb-5 ${styles.dsearch} `}>
                  <div className="mb-3 col col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      placeholder="Search Announcements..."
                    />
                  </div>
                  <div className=" mb-3 col col-3">
                    <button
                      type="button"
                      className="btn btn-outline-primary openModalBtn"
                      onClick={() => navigate("/newannouncement")}
                      onClick={() => {
                        setAnnouncement(true);
                      }}
                    >
                      <i class="far fa-plus-square mt-1 mx-2"></i>
                      Add Announcement
                    </button>
                    {/* {dmodalOpen && (
                    <Modal setDepartmentModal={setDepartmentModal} /> */}
                  </div>
                </div>
                <NewAnnouncement
                  trigger={announcement}
                  setTrigger={setAnnouncement}
                  id={params.id}
                />
                <div className={` gx-0  ${styles.cardContainer} `}>
                  {insAnnTextData &&
                    insAnnTextData.map((at) => (
                      <div
                        className={` ${styles.dlogo} ${styles.cardView}`}
                        onClick={() =>
                          navigate(`/${params.id}/announcementdetail/${at._id}`)
                        }
                      >
                        <img
                          className={styles.dlogoImages}
                          src={
                            insData.insProfilePhoto
                              ? insData.insProfilePhoto
                              : "/images/institute-avatar.jpeg"
                          }
                        />
                        <p className={styles.dlogoText}>
                          <small>{at.insAnnTitle}</small>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <NavbarBottomInstitute id={params.id} />
      </div>
    </>
  );
};

export default Announcement;
