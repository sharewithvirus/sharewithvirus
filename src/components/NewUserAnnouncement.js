import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { Success, Danger } from '../components/SnackBar'
import { requestURL } from "./ReqUrl";


const NewUserAnnouncement = (props) => {
  const navigate = useNavigate();
  const params = useParams()
  const [userAnnouncementData, setUserAnnouncementData] = useState({
      userAnnTitle: '',
      userAnnPhoto: '',
      userAnnDescription: '',
      userAnnVisibility: '',
      showMessages: false,
      showMessagesDanger: false,
      msg: "",

  })

  const UserAnnouncementDataHandler = (e) =>{
      const { name, value} = e.target
      setUserAnnouncementData({
          ...userAnnouncementData,
          [name]: value
      })
  }

  const UserAnnouncementDataHandlerChange = (e) =>{
      e.preventDefault()
      axios.post(`${requestURL}/user-announcement/${params.uid}`, userAnnouncementData)
      .then(res =>{
        if(res.data.message === 'Successfully Created' && res.status == 200){
          props.setTrigger(false)
          setUserAnnouncementData({ showMessages: true, msg: res.data.message });
        }
        setTimeout(() => {
          navigate(`/user/announcement/${params.uid}`)
        }, 100);

      }).catch(e =>{
          console.log('Something Went Wrong')
      })
  }
  return props.trigger ? (
    <>
          {userAnnouncementData.showMessages ? <Success msg={userAnnouncementData.msg} /> : null}
      {/* {insLogin.showMessagesDanger ? <Danger msg={insLogin.msg} /> : null} */}
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-12 col-md-10 col-lg-9 col-xl-8  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setTrigger(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Add Announcement</h4>
          <form onSubmit={UserAnnouncementDataHandlerChange}>
            <div className="col col-12 mb-3">
                <label htmlFor="dname" className="form-group mb-1">
                Announcement Title
                </label>
                <input
                type="text"
                name="userAnnTitle"
                className="form-control"
                placeholder="Enter Announcement Title"
                onChange={UserAnnouncementDataHandler}
                required
                />
            </div>
            <div className="col col-12 mb-3">
                <label htmlFor="dtitle" className="form-group mb-1">
                Announcement Photo
                </label>
                <input
                type="file"
                name="userAnnPhoto"
                accept=".jpg, .jpeg, .png"
                className="form-control"
                placeholder="Enter Announcement Photo"
                onChange={UserAnnouncementDataHandler}
                />
            </div>
            <div className="col col-12 mb-3">
                <label htmlFor="dhead" className="form-group mb-1">
                  Announcement Description
                </label>     
                <input 
                type="text"
                name="userAnnDescription"
                className="form-control"
                id='dhead'
                placeholder="Enter Announcement Description"
                onChange={UserAnnouncementDataHandler}
                required
                />
            </div>
          <div className="col col-12 mb-3">
            <label htmlFor="dhead" className="form-group mb-1">
              Announcement Visibility
            </label>
            <select name="userAnnVisibility" className="form-control" id="nstatus" onChange={UserAnnouncementDataHandler} required>
                <option value="Select Visibility">Select Visibility</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
            </select> 
          </div>
          <div className="col-12 mb-3">
            <button
              type="submit"
              className="btn btn-outline-primary mt-4 px-5 mx-auto"
            >
              <i class="fas fa-plus mt-1 mx-1"></i>Create
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

export default NewUserAnnouncement;
