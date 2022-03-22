import React from 'react'
import styles from '../Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubjectTestCreation = () =>{
    return (        
        <div>
            {/* <div className={styles.mainnavs}>
                <ul>
                    <li><img src="https://themes.pixelstrap.com/friendbook/assets/images/icon/logo.png" /></li>
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
                                        <option value="ABC Institute ( staff )">ABC Institute ( staff )</option>
                                        <option value="ABC Institute ( student )">ABC Institute (student )</option>
                                    </select>
                                </div>
                    </div>
                    <div className={`${styles.outer} mt-4`}>
                        <img className={styles.profileInfo} src="https://themes.pixelstrap.com/friendbook/assets/images/user/3.jpg" alt="" />
                        <p>
                            <span className={styles.name}>Josephin water</span><br/>
                            <span className={styles.name}>Roll No. 085</span><br/>
                            {/* <span className={styles.email}>Josephin.water@gmail.com</span> */}
                        </p>
                        <div className={`${styles.dabout} bg-primary`}>
                            View Profile
                        </div>
                        </div>
                        <div className={`${styles.souter3} mt-4`}>
                                <div className={styles.dabout}>
                                    Id Card
                                </div>
                                <div className={`${styles.dabout}`}>
                                    Complaints Box
                                </div>
                                <div className={styles.dabout}>
                                    Leave
                                </div>
                                <div className={styles.dabout}>
                                    Transfer
                                </div>
                                <div className={styles.dabout}>
                                    Settings
                                </div>
                            
                        </div>
                    </div>
                <div className="col-8">
                <div className={styles.outer4}>
                                    <label>Subject Teacher</label>
                                    <select name="usermember">
                                        <option value="Subject Teacher (Subject Name and Class Name)">Subject Teacher (Subject Name and Class Name)</option>
                                        <option value="Department Head (Title/Name of Department)">Department Head (Title/Name of Department)</option>
                                        <option value="Class Teacher (Class Name)">Class Teacher (Class Name)</option>
                                        <option value="Finance Manager (Name of Department)">Finance Manager (Name of Department)</option>
                                        <option value="E-content Operator (Name of Department)">E-content Operator (Name of Department)</option>
                                        <option value="Librarian (Name of Librarian)">Librarian (Name of Librarian)</option>
                                        <option value="Sports and Arts Dept. Head (Name of Department)">Sports and Arts Dept. Head (Name of Department)</option>
                                        <option value="Sports and Arts Class Coach (Name of Department)">Sports and Arts Class Coach (Name of Department)</option>
                                        <option value="Display Authority (Name of the Authority person)">Display Authority (Name of the Authority person)</option>
                                        <option value="Staff Member (Name of Department)">Staff Member (Name of Department)</option>
                                    </select>
                </div>
                    <div className={`${styles.outer2} mt-4`}>
                <form className="row g-3">
                    
                <p className={styles.extra}>Subject</p>
                <div className={styles.ddetail}>
                    <p>
                        <span><i className={`fas fa-table `}></i> <br/>Catalog</span>
                        <span><i className={`fas fa-user-friends `}></i> <br/>Score</span>
                        <span><i className={`fas fa-money-bill-alt ${styles.blueTick} `}></i> <br/>MCQ</span>
                        <span><i className={`fas fa-smile-beam `}></i> <br/>Attendence</span>
                        <span><i className={`fas fa-clipboard `}></i> <br/>Settings</span>
                    </p>
                </div>
                <hr/>
                <div className="col-12 mt-4">
                    <h5 className="mt-2">Create Test</h5>
                </div>
                <hr/>
                <div className="col-4 my-1 mb-2">
                    <label htmlFor="subName" className="form-group">Name</label>
                    <input type="text" name="subName" className="form-control" id="subName" placeholder="Name"/>
                </div>
                <div className="col-4 my-1 mb-2">
                    <label htmlFor="subQuestion" className="form-group">Total Question</label>
                    <input type="text" name="subQuestion" className="form-control" id="subQuestion" placeholder="20"/>
                </div>
                <div className="col-4 my-1 mb-2">
                    <label htmlFor="subTotal" className="form-group">Total Marks</label>
                    <input type="text" name="subTotal" className="form-control" id="subTotal" placeholder="100"/>
                </div>
                <hr/>               
                <div className="col-12">
                        <div className={styles.dlogo}>
                            <p className={styles.dlogoText}>How Much Percentage of Water On Earth?</p>
                            <hr/> 
                            <p className={styles.dlogoTexts}>Marks - </p>
                            <p className={styles.dlogoTexts}>
                                <span><input type="radio" name="submultiple" className="mx-2"/> 25%</span><br/>
                                <span><input type="radio" name="submultiple" className="mx-2"/> 50%</span><br/>
                                <span><input type="radio" name="submultiple" className="mx-2"/> 74%</span><br/>
                                <span><input type="radio" name="submultiple" className="mx-2"/> 75%</span>
                            </p>

                        </div>
                </div>
                <div className="col-6">
                    <button type="submit" className="btn btn-success mx-5 px-5">Save</button>
                </div>
                <div className="col-6">
                    <button type="submit" className="btn btn-success mx-5 px-5">Finish</button>
                </div> 
                </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SubjectTestCreation
