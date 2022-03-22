import styles from "../Home.module.css";
import React,{useState, useEffect} from 'react'
import Chatsa from "../Chatsa";
import Sidebar from "../Sidebar"
import "bootstrap/dist/css/bootstrap.min.css";

function Chat() {

    const random = Math.floor(Math.random()*5000);
    return (
        <>
            <div className={styles.chatContainer}>
                <div className={styles.chatt}>
                    <Sidebar imageDP={random}  user='Ram'/>
                    <Chatsa imageDP={random} user= 'Ram'/>
                </div>
            </div>
        </>
    );
  }
  
  export default Chat;
