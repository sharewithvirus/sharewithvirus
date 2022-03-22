import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Avatar, IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import styles from "./Home.module.css";
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import MicIcon from '@mui/icons-material/Mic'
import {useParams} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { style } from '@mui/system';

function Chatsa({imageDP, user}) {

 const messages = [
  {
      "to" : "Ghanshayam",
       "message" : "Please send me the latest documents ASAP",
       "from" : "Ram",
        "time" : "05/06/2021T13.30.00"
  },
  {
    "to" : "Ram",
    "message" : "I have sent yesterday.",
    "from" : "Ghanshayam",
    "time" : "05/06/2021T15.30.00"
  },
  {
    "to" : "Ghanshayam",
    "message" : "Ok, I will check.",
    "from" : "Ram",
    "time" : "05/06/2021T17.45.00"
  },
]
  return (
    <>
      <div className={styles.chats}>
            <div className={styles.chat_header}>
                <div class="d-flex gap-2">
                  <div class="d-flex align-items-center" >
                        <ArrowBackIcon />
                        <Avatar src={`https://avatars.dicebear.com/api/human/${imageDP}.svg`}/>
                      </div>

                    <div className={styles.chat_headerInfo}>
                        <h5>Raju</h5>
                        <p>Last seen</p>
                    </div>
                </div>
               
                <div className={styles.chat_headerRight}>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    
                </div>
            </div>
      

      <div className={styles.chatbody}>
      {messages.map((message, index)=>{
                const date = message.time.split('T')[0];
                console.log(date);
                const time = message.time.split('T')[1];
                console.log(time);
                if (message.from === user) {
                    return (
                        <div className={styles.chatbody_msg && styles.receiver} key={index}>
                            <span className={styles.chat_name}>{message.from}</span>
                                 {message.message}
                            <span className={styles.chat_date}>{date}</span>
                             <span className={styles.chat_time}>{time}</span>
                        </div>
                     ); 
                }
                else{
                    return (
                        <div className={styles.chatbody_msg} key={index}>
                             <span className={styles.chat_name}>{message.from}</span>
                                 {message.message}
                            <span className={styles.chat_date}>{date}</span>
                            <span className={styles.chat_time}>{time}</span>
                        </div> 
                    )
                }
         })} 
      </div> 


      <div className={styles.chatFooter}>
                <EmojiEmotionsIcon/> &nbsp; &nbsp;
                <AttachFileIcon/> &nbsp;
                <form>
                    <input type='text' placeholder='type your message'/>
                    <SendIcon/>
                </form>
                <MicIcon/>
                
              </div>   
      </div> 
    </>
  )
}

export default Chatsa