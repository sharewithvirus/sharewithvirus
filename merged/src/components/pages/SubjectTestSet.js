import React from "react";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SubjectTestSet = () => {
  return (
    <div>
      {/* <div className={styles.mainnavs}>
                <ul>
                    <li><img src="https://themes.pixelstrap.com/friendbook/assets/images/icon/logo.png" alt="img" /></li>
                    <li className={styles.input}><i class="fas fa-search"></i><input type="text" name="Search" placeholder="Search..."/></li>
                    <li><i className="fas fa-home mt-3 mr-5"></i><p><small>Home</small></p></li>
                    <li><i className="far fa-user-circle mt-3 mr-2"></i><p><small>User</small></p></li>
                    <li><i className="fas fa-sms mt-3 mr-2"></i><p><small>SMS</small></p></li>
                    <li><i className="fas fa-moon mt-3 mr-2"></i><p><small>Dark</small></p></li>
                    <li><i className="fas fa-bell mt-3 mr-2"></i><p><small>Notify</small></p></li>
                    <li>
                        <div className="media d-inline-flex">
                                    <div>
                                        <img src="https://themes.pixelstrap.com/friendbook/assets/images/user-sm/1.jpg" 
                                            className={styles.userimg} alt="user"/>
                                        <span className={`${styles.availablestats}${styles.online}`}></span>
                                    </div>
                                    <div className={styles.profile}>
                                        <h4 className={styles.userprofile}>Josephin water</h4>
                                        <span className="mt-0">active now</span>
                                    </div>
                                </div>
                    </li>
                </ul>
            </div> */}
      <div className="row ml-5">
        <div className="col-3">
          <div className={styles.souter4}>
            <div className={styles.dabout}>
              <label>Institute Role</label>
              <select name="usermember">
                <option value="ABC Institute ( staff )">
                  ABC Institute ( staff )
                </option>
                <option value="ABC Institute ( student )">
                  ABC Institute (student )
                </option>
              </select>
            </div>
          </div>
          <div className={`${styles.outer} mt-4`}>
            <img
              className={styles.profileInfo}
              src="https://themes.pixelstrap.com/friendbook/assets/images/user/3.jpg"
              alt="img"
            />
            <p>
              <span className={styles.name}>Josephin water</span>
              <br />
              <span className={styles.name}>Roll No. 085</span>
              <br />
              {/* <span className={styles.email}>Josephin.water@gmail.com</span> */}
            </p>
            <div className={`${styles.dabout} bg-primary`}>View Profile</div>
          </div>
          <div className={`${styles.souter3} mt-4`}>
            <div className={styles.dabout}>Id Card</div>
            <div className={`${styles.dabout}`}>Complaints Box</div>
            <div className={styles.dabout}>Leave</div>
            <div className={styles.dabout}>Transfer</div>
            <div className={styles.dabout}>Settings</div>
          </div>
        </div>
        <div className="col-8">
          <div className={styles.outer4}>
            <label>Subject Teacher</label>
            <select name="usermember">
              <option value="Subject Teacher (Subject Name and Class Name)">
                Subject Teacher (Subject Name and Class Name)
              </option>
              <option value="Department Head (Title/Name of Department)">
                Department Head (Title/Name of Department)
              </option>
              <option value="Class Teacher (Class Name)">
                Class Teacher (Class Name)
              </option>
              <option value="Finance Manager (Name of Department)">
                Finance Manager (Name of Department)
              </option>
              <option value="E-content Operator (Name of Department)">
                E-content Operator (Name of Department)
              </option>
              <option value="Librarian (Name of Librarian)">
                Librarian (Name of Librarian)
              </option>
              <option value="Sports and Arts Dept. Head (Name of Department)">
                Sports and Arts Dept. Head (Name of Department)
              </option>
              <option value="Sports and Arts Class Coach (Name of Department)">
                Sports and Arts Class Coach (Name of Department)
              </option>
              <option value="Display Authority (Name of the Authority person)">
                Display Authority (Name of the Authority person)
              </option>
              <option value="Staff Member (Name of Department)">
                Staff Member (Name of Department)
              </option>
            </select>
          </div>
          <div className={`${styles.outer2} mt-4`}>
            <form className="row g-3">
              <p className={styles.extra}>Subject</p>
              <div className={styles.ddetail}>
                <p>
                  <span>
                    <i className={`fas fa-table `}></i> <br />
                    Catalog
                  </span>
                  <span>
                    <i className={`fas fa-user-friends `}></i> <br />
                    Score
                  </span>
                  <span>
                    <i
                      className={`fas fa-money-bill-alt ${styles.blueTick} `}
                    ></i>{" "}
                    <br />
                    MCQ
                  </span>
                  <span>
                    <i className={`fas fa-smile-beam `}></i> <br />
                    Attendence
                  </span>
                  <span>
                    <i className={`fas fa-clipboard `}></i> <br />
                    Settings
                  </span>
                </p>
              </div>
              <hr />
              <div className="col-12 mt-4">
                <h5 className="mt-2">Test Sets</h5>
              </div>
              <hr />
              <div className="col-6 my-1 mb-2">
                <label htmlFor="subsearch" className="form-group">
                  Search
                </label>
                <input
                  type="text"
                  name="subsearch"
                  className="form-control"
                  id="subsearch"
                  placeholder="Search..."
                />
              </div>
              <div className="col-6 mt-4">
                <button
                  type="submit"
                  className="btn btn-success mx-5 mt-1 px-5"
                >
                  Search
                </button>
              </div>
              <div className="col-4">
                <div className={styles.dlogo}>
                  <img
                    className={styles.dlogoImages}
                    alt="img"
                    src="data:image/jpeg;base64,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"
                  />
                  <p className={styles.dlogoText}>
                    <small>Name of Set</small>
                  </p>
                  <hr />
                  <p className={styles.dlogoTextsInner}>Marks - 20</p>
                  <p className={styles.dlogoTextsInner}>Question - 20</p>
                  <button type="text" className="btn btn-primary mx-4 px-5">
                    Take
                  </button>
                </div>
              </div>
              <div className="col-4">
                <div className={styles.dlogo}>
                  <img
                    className={styles.dlogoImages}
                    alt="img"
                    src="data:image/jpeg;base64,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"
                  />
                  <p className={styles.dlogoText}>
                    <small>Name of Set</small>
                  </p>
                  <hr />
                  <p className={styles.dlogoTextsInner}>Marks - 20</p>
                  <p className={styles.dlogoTextsInner}>Question - 20</p>
                  <button type="text" className="btn btn-primary mx-4 px-5">
                    Take
                  </button>
                </div>
              </div>
              <div className="col-4">
                <div className={styles.dlogo}>
                  <img
                    className={styles.dlogoImages}
                    alt="img"
                    src="data:image/jpeg;base64,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"
                  />
                  <p className={styles.dlogoText}>
                    <small>Name of Set</small>
                  </p>
                  <hr />
                  <p className={styles.dlogoTextsInner}>Marks - 20</p>
                  <p className={styles.dlogoTextsInner}>Question - 20</p>
                  <button type="text" className="btn btn-primary mx-4 px-5">
                    Take
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectTestSet;
