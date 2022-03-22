import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";

const NewUserVisibilityPopUp = (props) => {

  const [visibility, setVisibility] = useState({
    userPostStatus: ''
  });

  const VisibilityHandler = (e) => {
    const { name, value } = e.target;
    setVisibility({
      ...visibility,
      [name]: value,
    });
  };

  const VisibilityHandlerChange = (e) => {
    e.preventDefault();    
    axios
      .put(
        `${requestURL}/userdashboard/${props.uid ? props.uid : ''}/user-post/${props.userPostId ? props.userPostId : ''}/update`, visibility)
      .then((res) => {
        if (res.data.message) {
          props.onShowPost(true);
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };


  return props.trigger ? (
    <>
      <div className={styles.popupbg}
      style={{position: 'fixed'}}
      >
        <div
          className={`col col-sm-4 col-md-4 my-2 col-lg-4 col-xl-4  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i className="fas fa-times"></i>
          </div>
          <h4>Edit Visibility</h4>
          <form onSubmit={VisibilityHandlerChange}>
          <div className="row mt-2">
            <div className="col-md-6 my-2" style={{display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="userPostStatus" className="mx-2" id="public" value="Anyone"  onChange={VisibilityHandler}/>
                <label htmlFor="public">Anyone</label>
            </div>

            <div className="col-md-6 my-2" style={{display: 'flex', alignItems: 'center'}}>
                <input type="radio" name="userPostStatus" className="mx-2" id="private" value="Private" onChange={VisibilityHandler}/>
                <label htmlFor="private">Private</label>
            </div>
            
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Update
              </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default NewUserVisibilityPopUp;
