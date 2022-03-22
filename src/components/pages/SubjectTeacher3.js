import React,{useState} from "react";
import { useNavigate } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewDetailsBar from "../NewDetailsBar";
import NavbarBottomUser from "../NavbarBottomUser";
import TeacherCard from "../TeacherCard"
import Score from "../Score"
import MCQ from "../MCQ"
import Attendence from "../Attendence";
import { width } from "@mui/system";

const SubjectTeacher = () => {
  const navigate = useNavigate();

  function handleChange(value) {
    navigate(`/${value}`);
  }

  const handleShow = () => {

  }

  const [index, setIndex] = useState(1);
  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopUser />
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection
                  imageSrc="https://themes.pixelstrap.com/friendbook/assets/images/user/3.jpg"
                  name="Josephin water"
                />
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                  <select
                    class="form-control-plaintext"
                    id="usermember"
                    name="usermember"
                  >
                    <option value="ABC Institute ( staff )">
                      ABC Institute ( staff )
                    </option>
                    <option value="ABC Institute ( student )">
                      ABC Institute (student )
                    </option>
                  </select>
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <div className={styles.dabout}>Id Card</div>
                  <div className={styles.dabout}>Complaints Box</div>
                  <div className={styles.dabout}>Leave</div>
                  <div className={styles.dabout}>Transfer</div>
                  <div className={styles.dabout}>Settings</div>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`}>
                <BackButton />
                <div className={styles.insTitle}>
                  <select
                    className="form-control-plaintext"
                    name="usermembertitle"
                    onChange={(event) => handleChange(event.target.value)}
                  >
                    <option value="departmenthead">
                      Department Head (Title/Name of Department)
                    </option>
                    <option value="classteacher">
                      Class Teacher (Class Name)
                    </option>
                    <option selected value="subjectteacher">
                      Subject Teacher (Subject Name and Class Name)
                    </option>
                    <option value="financemanager">
                      Finance Manager (Name of Department)
                    </option>
                    <option value="econtentoperator">
                      E-content Operator (Name of Department)
                    </option>
                    <option value="librarian">
                      Librarian (Name of Librarian)
                    </option>
                    <option value="sportsandarthead">
                      Sports and Arts Dept. Head (Name of Department)
                    </option>
                    <option value="sportandartcoach">
                      Sports and Arts Class Coach (Name of Department)
                    </option>
                    <option value="displayauthority">
                      Display Authority (Name of the Authority person)
                    </option>
                    <option value="staffmembermain">
                      Staff Member (Name of Department)
                    </option>
                  </select>
                </div>
                <div className={` ${styles.outer2} ${styles.profileCreationPage}`}>
                  <div class="d-flex justify-content-between mt-3">
                    <div></div>
                    <h3>Subject</h3>
                    <img src="/images/icon-setting.svg" alt="setting" onClick={() => setIndex(5)} />
                  </div>
                  <hr/>
                  <form className="row g-3 mt-4">
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() => setIndex(1)}
                      >
                        <span>
                        <i class="fa fa-users fa-sm" aria-hidden="true"></i>
                          &nbsp; Catalog
                        </span>
                      </div>
                      <div className={`${styles.dTab} ${styles.active}`} 
                      
                      onClick={() => setIndex(2)}>
                      
                        <span>
                        <i class="fa fa-eercast fa-sm" aria-hidden="true"></i>
                          &nbsp; Score
                        </span>
                      </div>
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() => setIndex(3)}>
                        <span>
                        <i class="fa fa-question-circle fa-sm" aria-hidden="true"></i>
                          &nbsp;MCQ
                        </span>
                      </div>
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() => setIndex(4)}>
                        <span>
                        <i class="fa fa-gift fa-sm" aria-hidden="true"></i>
                          &nbsp;Attendence
                        </span>
                      </div>
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        >
                        <span>
                        <i class="fa fa-book fa-sm" aria-hidden="true"></i>

                          &nbsp;Daily-Diary
                        </span>
                      </div>
                    </div>
                  </div>

                      {index === 1 && 
                        <>
                          <div className={styles.dtechh3}>
                              <div className={styles.searchContainer}>
                                  <table className={styles.searchTable}>
                                      <tr>
                                          <td>
                                              <input class={styles.search} type="text" placeholder="Search..." />
                                          </td>
                                          <td>
                                              <a href='#'><i class="fa fa-search fa-sm" aria-hidden="true"></i></a>

                                          </td>
                                      </tr>
                                  </table>
                              </div>
                              
                          </div>
                          <div className={styles.dtech4}>
                              <TeacherCard index="1"/>
                              <TeacherCard index="2"/>
                              <TeacherCard index="3"/>
                              <TeacherCard index="4"/>
                              <TeacherCard index="5"/>
                              <TeacherCard index="6"/>
                              <TeacherCard index="7"/>
                              <TeacherCard index="8"/>
                          </div>
                        </>
                      }

                      {index === 2 && 
                        <Score/>
                      }
                      {index === 3 && 
                        <MCQ/>
                      }
                      {index === 4 && 
                        <Attendence/>
                      }
                      
                      {index === 5 && 
                        <div className="d-flex justify-content-center mt-5" >
                          <div className="w-50  p-3" style={{background: '#fff', height: '150px'}}>
                            <select class="form-select " aria-label="Default select example">
                              <option selected>Select Attendence</option>
                                <option value="on">Turn On</option>
                                <option value="off">Turn Off</option>
                            </select>

                            <div className="d-flex justify-content-center">
                              <button
                                  type="button"
                                  className="btn btn-outline-success mt-3 p-0"
                                  onClick={()=> setIndex(2)}
                                >
                                  Complete Subject
                              </button>
                            </div>
                          </div>

                        </div>
                      }
                     
                      
                  </form>
                  

                  <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser />
      </div>
    </>
  );
};

export default SubjectTeacher;

