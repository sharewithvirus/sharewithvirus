// import axios from "axios";
// import { useEffect, useState } from "react";
// import "./Conversation.css";
// import { requestURL } from "./ReqUrl";
// import { Avatar, IconButton } from "@material-ui/core";
// import { format } from "timeago.js";

// const Conversation = ({ conversation, currentUserId }) => {
//   const [user, setUser] = useState(null);
//   const [circleChat, setCircleChat] = useState([]);

//   useEffect(() => {
//     const friendId = conversation.members.find((m) => m !== currentUserId);

//     const getUser = async () => {
//       try {
//         const res = await axios(`${requestURL}/userdashboard/${friendId}`);
//         setUser(res.data.user);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getUser();

//     const getUpdatedMessage = async () => {
//       try {
//         const res = await axios(
//           `${requestURL}/api/messages/${
//             conversation._id ? conversation._id : ""
//           }`
//         );
//         setCircleChat(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getUpdatedMessage();
//   // }, []);
//   }, [currentUserId, conversation, circleChat]);

//   return (
//     <>
//       <div className="qviple__conversation">
//         <Avatar />
//         <div className="qviple__conversationInfo">
//           <h2>
//             {user ? user.username : ""}
//             <span className="qviple__conversationTime">
//               {circleChat && circleChat.length >= 1
//                 ? format(circleChat[circleChat.length - 1].updatedAt)
//                 : ""}
//             </span>
//           </h2>
//           <p className="qviple__conversationText">
//             {circleChat && circleChat.length >= 1
//               ? circleChat[circleChat.length - 1].text
//               : ""}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Conversation;



import React from 'react'
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Home.module.css";
import { requestURL } from "./ReqUrl";
import { Avatar, IconButton } from "@material-ui/core";
import { format } from "timeago.js";
import axios from "axios";
import { useEffect, useState } from "react";

const Conversation = ({ conversation, currentUserId }) => {
    const [user, setUser] = useState(null);
  const [circleChat, setCircleChat] = useState([]);
  const [first, setFirst] = useState(false)

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);

    const getUser = async () => {
      try {
        const res = await axios(`${requestURL}/userdashboard/${friendId}`);
        setUser(res.data.user);
        setFirst(true)
      } catch (err) {
        console.log(err);
      }
    };
    getUser();

    const getUpdatedMessage = async () => {
      try {
        const res = await axios(
          `${requestURL}/api/messages/${
            conversation._id ? conversation._id : ""
          }`
        );
        setCircleChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUpdatedMessage();
  // }, []);
  }, [currentUserId, conversation, circleChat]);

  return (
    <>
        <div className={styles.chatLeftUserCard}>
            <div className='d-flex gap-3 align-items-center'>
                <img src={ user ? 
                  user.photoId === "1"
                  ? "/images/image-boy2.png"
                  : first
                  ? `${requestURL}/userprofileabout/photo/${user.profilePhoto}`
                  : null
                  : ''
                } />
                <div className={`${styles.chatleftUser} mt-2`}>
                    <h6>{user ? user.userLegalName.substr(0,20) : ""}</h6>
                    <p>
                    {circleChat && circleChat.length >= 1
              ? circleChat[circleChat.length - 1].text.substr(0,20)
              : ""}

                    </p>
                </div>
            </div>
            <div className={styles.chatleftright}>
                <p>{circleChat && circleChat.length >= 1
                ? format(circleChat[circleChat.length - 1].updatedAt)
                : ""}</p>
                <i class="fas fa-ellipsis-v fa-sm"></i>
            </div>
        </div>
        <hr/>

    </>
  )
}

export default Conversation