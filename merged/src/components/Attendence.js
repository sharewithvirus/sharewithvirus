import React from 'react'
import styles from "./Home.module.css";

function Attendence() {
    return (
        <div className={styles.examCardContainer}>
              <div className={styles.attendenceContainer}>
                  <div className={styles.attendenceinput}>
                    
                      <div className={styles.flexitem}>
                        <label htmlFor="fdate" className={`form-group ${styles.flexitemlabel}`}  style={{color: "white"}}>Date: </label>
                        <input type="date" name="fdate" placeholder="Date" required/>
                      </div>

                      <div className={styles.flexitem}>
                        <label htmlFor="ftime" className={`form-group ${styles.flexitemlabel}`} style={{color: "white"}}>Time: </label>
                        <input type="time" name="ftime" placeholder="Time" required/>
                      </div>

                       <div className={styles.flexitem}>
                        <select name="fmode" className={`form-control ${styles.flexitemselect}`}  id="sselect" required>
                              <option value="" disabled selected>Select</option>
                              <option value="Offline">first</option>
                              <option value="Online">second</option>
                          </select>
                       </div>
                  </div>

                  <div className={styles.examCardContainer}>
                    <table className={styles.attendenceTable}>

                        <thead>
                          <tr>
                            <th>Index</th>
                            <th>Student Name</th>
                            <th>Present</th>
                            <th>Absent</th>
                          </tr>
                        </thead>
                        
                        <tbody>
                          <tr>
                            <td>1 </td>
                            <td>Alfreds </td>
                            <td><i class="fa fa-check fa-sm" aria-hidden="true"></i> </td>
                            <td><i class="fas fa-times fa-sm"></i></td>
                          </tr>
                          <tr className={styles.activeRow}>
                            <td>2 </td>
                            <td>Maria </td>
                            <td><i class="fa fa-check fa-sm" aria-hidden="true"></i></td>
                            <td><i class="fas fa-times fa-sm"></i></td>
                          </tr>

                          <tr>
                            <td>3 </td>
                            <td>David</td>
                            <td><i class="fa fa-check fa-sm" aria-hidden="true"></i></td>
                            <td><i class="fas fa-times fa-sm"></i></td>
                          </tr>
                          <tr className={styles.activeRow}>
                            <td>4 </td>
                            <td>Francisco  </td>
                            <td><i class="fas fa-times fa-sm"></i></td>
                            <td><i class="fa fa-check fa-sm" aria-hidden="true"></i></td>
                          </tr>
                        </tbody>
                    </table>
                  </div>

                  <div className={styles.attendencebottom}>
                    <button>Check Attendence History</button>
                  </div>

              </div>
            </div>
    )
}

export default Attendence
