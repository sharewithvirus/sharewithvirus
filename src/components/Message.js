import React, { useEffect } from 'react';
import "./Message.css";
import styles from './Home.module.css'
import { format } from "timeago.js";

const Message = ({ message, own }) => {


  return (
    <>
      {/* {own ? ( */}
        {!own? 
        <div className={styles.sender}>
          <p>{message ? message.text : ""}</p>
          <div className="d-flex justify-content-between">
              {/* <p className={styles.chatdate}>23/03/2022</p> */}
              <p className={styles.chatdate}>
               {message ? format(message.createdAt) : ""}
              </p>
            </div>
        </div>
        : 
          <div className={styles.receiver}>
              <p>{message ? message.text : ""}</p>
              <div className="d-flex justify-content-between">
                {/* <p className={styles.chatdate}>23/03/2022</p> */}
                <p className={styles.chatdate}>
                  {message ? format(message.createdAt) : ""}
                </p>
              </div>        
          </div>
        }

    </>
  );
};

export default Message;


