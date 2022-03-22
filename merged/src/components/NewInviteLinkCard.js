import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "./SnackBar";
import { requestURL } from "./ReqUrl";

const NewInviteLinkCard = (props) => {
    const [isCopied, setIsCopied] = useState(false);

    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
    const handleCopyClick = () => {
      copyTextToClipboard('http://localhost:8080/')
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  

  return props.trigger ? (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-8 col-md-8 my-2 col-lg-5 col-xl-5  ${styles.popupScreen} ${styles.about}`}
        style={{margin: '0px', textAlign: 'left'}}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddInviteFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="text-center">Invite Link</h4>
          <form>
          <div className="row mt-2">
            <div className="col-12 col-md-10 mb-2">
            <label htmlFor="bankAc" className="form-group mb-2">Share To Anyone
            </label>
              {/* <input
                type="text"
                name="fieldName"
                className="form-control"
                id="bankAc"
                value={'http://localhost:8080/'}                
              /> */}
              URL:- <span className="text-success mx-2">{isCopied ? 'Copied To Clipboard' : ''}</span>
              <p className="mt-2"><a href="http://localhost:8080" style={{letterSpacing: '0.7px'}}>http://localhost:8080/</a></p>
              <br/>
            </div>
            <div className="col-12 col-md-2 mb-2">
            <i class="far fa-clone" title="copy" onClick={handleCopyClick} style={{fontSize: 'larger'}}></i>
              {/* <button
                type="button"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Copy
              </button> */}
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

export default NewInviteLinkCard;
