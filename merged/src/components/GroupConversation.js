import React from 'react'
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Home.module.css";
import { requestURL } from "./ReqUrl";
import { Avatar, IconButton } from "@material-ui/core";
import { format } from "timeago.js";
import axios from "axios";
import { useEffect, useState } from "react";

const GroupConversation = ({ conversation, data, currentUserId }) => {
  const [memberData, setMemberData] = useState(null);
  const [circleChat, setCircleChat] = useState([]);
  const [first, setFirst] = useState(false)

  useEffect(() => {
    // const friendId = conversation.members.find((m) => m !== currentUserId);

    // const getUser = async () => {
    //   try {
    //     const res = await axios(`${requestURL}/member/${friendId}`);
    //     setMemberData(res.data.member);
    //     setFirst(true)
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getUser();

    const getUpdatedMessage = async () => {
      try {
        const res = await axios(
          `${requestURL}/api/messages/group/${
            conversation._id ? conversation._id : ""
          }`
        );
        console.log(res.data)
        // setCircleChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUpdatedMessage();
//   }, []);
  }, [currentUserId, conversation]);

  return (
    <>
        <div className={styles.chatLeftUserCard}>
            <div className='d-flex gap-3 align-items-center'>
                <img src={ data ? 
                  data.photoId === "1"
                  ? "/images/institute-avatar.jpeg"
                  : first
                  ? `${requestURL}/insprofileabout/photo/${data.insProfilePhoto}`
                  : null
                  : ''
                } />
                <div className={`${styles.chatleftUser} mt-2`}>
                    <h6>{data ? `${data.insName.substr(0,30)} Corridor` : ''}</h6>
                    <p>
                    {/* {circleChat && circleChat.length >= 1
                    ? circleChat[circleChat.length - 1].text.substr(0,20)
                    : ""} */}
                    Welcome
                    </p>
                </div>
            </div>
            <div className={styles.chatleftright}>
                {/* {circleChat && circleChat.length >= 1
                ? format(circleChat[circleChat.length - 1].updatedAt)
                : ""} */}
                <p>10:10</p>
                <i class="fas fa-ellipsis-v fa-sm"></i>
            </div>
        </div>
        <hr/>

    </>
  )
}

export default GroupConversation