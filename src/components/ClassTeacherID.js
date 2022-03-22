import React from 'react'
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ClassTeacherID(props) {
  return (
    <>
        <div className={`my-4 ${styles.ddetail} ${styles.active}`}>
                    <div className="row">
                      <div className={`${styles.dTab}  ${styles.active} my-2`} onClick={()=>props.changeIndex(1)}>
                        <span>
                          <i className={`fas fa-user`}></i>
                          &nbsp; Profile Info
                        </span>
                      </div>
                      <div 
                      className={`my-2 ${styles.dTab} ${styles.active}`}
                      
                      >
                        <span>
                          <i className={`fas fa-user-friends `}></i>
                          &nbsp; Auto Attendance
                        </span>
                      </div>
                      <div className={`my-2 ${styles.dTab} `}
                      >
                        <span>
                          <i className={`fas fa-id-card-alt `}></i>
                          &nbsp; ID Cards
                        </span>
                      </div>
                      <div className={`my-2 ${styles.dTab} ${styles.active}`}
                      onClick={()=>props.changeIndex(4)}>
                        <span>
                          <i className={`fas fa-mail-bulk `}></i>
                          &nbsp; Complaints Box
                        </span>
                      </div>
                      <div
                        className={`my-2 ${styles.dTab} ${styles.active}`}
                        onClick={()=>props.changeIndex(5)}
                      >
                        <span>
                          <i className={`fas fa-user-cog `}></i>
                          &nbsp; Batch Settings
                        </span>
                      </div>
                    </div>
                  </div>

        <div className={styles.outer2}>
                  <form className="row mt-0">
                    
                    <div className="col-6 mx-auto my-4">
                     <h5 className="mb-3">Card Info</h5>
                    </div>
                    
                    {/* <div className="row row-cols-1 row-cols-md-2">
                      <div className="col-12 col-md-6 mb-2 d-flex">
                        <div className={`text-muted ${styles.continueBatch}`}>
                          <input
                            type="checkbox"
                            name="batch"
                            className="mx-2 mt-2"
                          />
                          <p> Continue Batch</p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <div className="text-muted">
                          Created On - 01-01-2001
                        </div>
                      </div>
                    </div> */}
                    <hr />
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dlogo" className="form-label">
                        Logo
                      </label>
                      <input
                        class='file-upload-input'
                        type="file"
                        name="dlogo"
                        className="form-control ml-3"
                        onChange="readURL(this)"
                        accept="Image/"
                        id="dlogo"
                        placeholder="Card Logo"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dname" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        name="dname"
                        className="form-control"
                        id="dname"
                        placeholder="Name"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dilogo" className="form-label">
                        Institution Logo
                      </label>
                      <input
                        class='file-upload-input'
                        type="file"
                        name="dilogo"
                        className="form-control ml-3"
                        onChange="readURL(this)"
                        accept="Image/"
                        id="dilogo"
                        placeholder="Card Logo"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="drolno" className="form-label">
                        Roll No.
                      </label>
                      <input
                        type="number"
                        name="drolno"
                        className="form-control"
                        id="drolno"
                        placeholder="Roll No."
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="ddname" className="form-label">
                        Department Name
                      </label>
                      <input
                        type="text"
                        name="ddname"
                        className="form-control"
                        id="ddname"
                        placeholder="Department Name"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dphoto" className="form-label">
                        Photo
                      </label>
                      <input
                        class='file-upload-input'
                        type="file"
                        name="dphoto"
                        className="form-control ml-3"
                        onChange="readURL(this)"
                        accept="Image/"
                        id="dphoto"
                        placeholder="Card Logo"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dclass" className="form-label">
                        Class
                      </label>
                      <input
                        type="text"
                        name="dclass"
                        className="form-control"
                        id="dclass"
                        placeholder="Class"
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dmobileno" className="form-label">
                        Mobile No.
                      </label>
                      <input
                        type="text"
                        name="dmobileno"
                        className="form-control"
                        id="dmobileno"
                        placeholder="Mobile No."
                      />
                    </div>
                    <div className=" d-flex col-10 flex-row justify-content-center  mt-5 mx-auto">

                      <button type="button" class="btn btn-outline-secondary p-3 mt-2 mx-2">
                      <i class="far fa-plus-square"></i>
                      </button>
                    <div className="col-3 mt-2">
                     <div className={styles.inputbox}>
                        
                        <select name="fmode" className="form-control p-4">
                            <option value="" disabled selected>Select Classes/ID</option>
                            <option value="Offline">Offline</option>
                            <option value="Online">Online</option>
                        </select>
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-secondary p-3 mt-2 mx-2">
                    <i class="fa fa-print" aria-hidden="true"></i> 
                      </button>
                    </div>
                  </form>
            </div>
    </>
  )
}

export default ClassTeacherID