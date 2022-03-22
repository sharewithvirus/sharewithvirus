import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { Success, Danger } from '../components/SnackBar'
import { requestURL } from "./ReqUrl";


const NewAnnouncement = (props) => {
  const navigate = useNavigate();
  const params = useParams()
  const [announcementData, setAnnouncementData] = useState({
      insAnnTitle: '',
      insAnnPhoto: '',
      insAnnDescription: '',
      insAnnVisibility: '',
      showMessages: false,
      showMessagesDanger: false,
      msg: "",

  })

  const AnnouncementDataHandler = (e) =>{
      const { name, value} = e.target
      setAnnouncementData({
          ...announcementData,
          [name]: value
      })
  }

  const AnnouncementDataHandlerChange = (e) =>{
      e.preventDefault()
      axios.post(`${requestURL}/ins-announcement/${params.id}`, announcementData)
      .then(res =>{
        if(res.data.message === 'Successfully Created' && res.status == 200){
          props.setTrigger(false)
          setAnnouncementData({ showMessages: true, msg: res.data.message });
        }
        setTimeout(() => {
          navigate(`/announcement/${params.id}`)
        }, 2000);

      }).catch(e =>{
          console.log('Something Went Wrong')
      })
  }
  return props.trigger ? (
    <>
          {announcementData.showMessages ? <Success msg={announcementData.msg} /> : null}
      {/* {insLogin.showMessagesDanger ? <Danger msg={insLogin.msg} /> : null} */}
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-8 col-md-8 col-lg-6 col-xl-6  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setTrigger(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="my-2">Add Announcement</h4>
          <form onSubmit={AnnouncementDataHandlerChange}>
            <div className="row">
            <div className="col-12 col-md-6 mb-2">
                <label htmlFor="dname" className="form-group mb-1">
                Announcement Title
            <span className={styles.requireField}>*</span>
                </label>
                <input
                type="text"
                name="insAnnTitle"
                className="form-control"
                placeholder="Enter Announcement Title"
                onChange={AnnouncementDataHandler}
                required
                />
            </div>
            <div className="col-12 col-md-6 mb-2">
                <label htmlFor="dtitle" className="form-group mb-1">
                Announcement Photo 
            <span className={styles.requireField}>*</span>
                </label>
                <input
                type="file"
                name="insAnnPhoto"
                className="form-control"
                accept=".jpg, .jpeg, .png"
                placeholder="Enter Announcement Photo"
                onChange={AnnouncementDataHandler}
                />
            </div>
            <div className="col-12 col-md-6 mb-2">
                <label htmlFor="dhead" className="form-group mb-1">
                  Announcement Description
            <span className={styles.requireField}>*</span>
                </label>     
                <input 
                type="text"
                name="insAnnDescription"
                className="form-control"
                id='dhead'
                placeholder="Enter Announcement Description"
                onChange={AnnouncementDataHandler}
                required
                />
            </div>
          <div className="col-12 col-md-6 mb-2">
            <label htmlFor="dhead" className="form-group mb-1">
              Announcement Visibility
            <span className={styles.requireField}>*</span>
            </label>
            <select name="insAnnVisibility" className="form-control" id="nstatus" onChange={AnnouncementDataHandler} required>
                <option value="Select Visibility" selected disabled>Select Visibility</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
            </select> 
          </div>
          </div>
          <div className="col-12 mb-2">
            <button
              type="submit"
              className="btn btn-outline-primary mt-4 px-5 mx-auto"
            >
              <i class="fas fa-plus mt-1 mx-1"></i>Add Announcement
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default NewAnnouncement;
