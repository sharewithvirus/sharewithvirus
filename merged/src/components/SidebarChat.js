import { Avatar } from '@mui/material'
import React, {useState, useEffect} from 'react'
import styles from "./Home.module.css";
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";


function SidebarChat(props) {
    const [random, setRandom] = useState('')

    useEffect(()=> {
        setRandom(Math.floor(Math.random()*5000));
    },[])
  return (
      <>
        <Link to={`/topic`} style={{textDecoration: 'none'}}>
            <div className={styles.sidebar_chat} style={{color: 'black'}}>
                    <div className={styles.sidebar_item}>
                        <div class="d-flex align-items-center">
                            <Avatar src={`https://avatars.dicebear.com/api/human/${random}.svg`}/>
                            <div className='sidebar_chatInfo'>
                                <h5>{props.topic}</h5>
                            </div>
                            
                        </div>
                        
                        <p>Please</p>
                    </div>
                    <p>20/05/2021</p>
                    
            </div>
            
        </Link>
      </>
  );
}

export default SidebarChat;
