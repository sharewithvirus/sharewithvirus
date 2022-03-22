// import "./Corridor.css";
// import Conversation from "../Conversation";
// import Message from "../Message";
// import "bootstrap/dist/css/bootstrap.min.css";
// import NavbarTopUser from "../NavbarTopUser";
// // import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { requestURL } from "../ReqUrl";

// const Corridor = () => {
//   const params = useParams();
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [sessionUser, setSessionUser] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   const socket = useRef();
//   const scrollRef = useRef();





//   useEffect(() => {
//     socket.current = io("ws://localhost:8900");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);


//   useEffect(() => {
//     socket.current.emit("addUser", `${params.id}`);
//     socket.current.on("getUsers", (users) => {
//       console.log(users);
//       // setOnlineUsers(
//       //   sessionUserCircle.filter((f) => users.some((u) => u.userId === f))
//       // );
//     });
//   }, [params.id]);

//   // console.log(onlineUsers);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get(
//           `${requestURL}/api/conversations/${params.id}`
//         );
//         // console.log(res);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [params.id]);

//   var currentChatId = currentChat?.members.find(
//     (member) => member !== `${params.id}`)

//   useEffect(() =>{
//     try{

//     axios.get(`${requestURL}/userdashboard/${currentChatId}`)
//     .then((res) =>{ 
//       console.log(res.data.user)
//     })
//     }catch{

//     }
//   },[])

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(
//           `${requestURL}/api/messages/${currentChat?._id}`
//         );
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   // console.log(messages)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: `${params.id}`,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find(
//       (member) => member !== `${params.id}`
//     );

//     socket.current.emit("sendMessage", {
//       senderId: `${params.id}`,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await axios.post(`${requestURL}/api/messages`, message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <div
//         className="corridor"
//         style={{ backgroundImage: "url('/images/chat-background.png')" }}
//       >
//         <div
//           className="row my-1"
//           style={{ minHeight: "620px", maxHeight: "800px" }}
//         >
//           <div className="col-12 col-md-4 messagesList">
//             <div className="ChatProfile">
//               {/* <img
//                 className="conversationImg"
//                 src={
//                   "https://themes.pixelstrap.com/friendbook/assets/images/user/3.jpg"
//                 }
//                 alt=""
//               /> */}
//               <span className="messageProfiles">
//                 <i class="fas fa-chalkboard-teacher"></i>
//               </span>
//               <span className="messageProfiles">
//                 <i class="fas fa-ellipsis-v"></i>
//               </span>
//             </div>
//             <div className="messenger">
//               <div className="chatMenu">
//                 <div className="chatMenuWrapper">
//                   <input
//                     placeholder="Search for friends in circle"
//                     className="form-control chatInput"
//                   />
//                   {conversations.map((c) => (
//                     <div onClick={() => setCurrentChat(c)}>
//                       <Conversation
//                         conversation={c}
//                         currentUserId={params.id}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-12 col-md-8 chatList">
//             <div className="ChatProfile">
//               {/* <img
//                 className="conversationImg"
//                 src={
//                   "https://themes.pixelstrap.com/friendbook/assets/images/user/3.jpg"
//                 }
//                 alt=""
//               /> */}
//               {/* <span className="conversationName">Last seen : </span> */}
//               <span className="chatconversationName">
//                 <i class="fas fa-ellipsis-v"></i>
//               </span>
//             </div>
//             <div className="chatBox">
//               <div className="chatBoxWrapper">
//                 {currentChat ? (
//                   <>
//                     <div className="chatBoxTop">
//                       {messages.map((m) => (
//                         <div ref={scrollRef}>
//                           <Message message={m} own={m.sender === params.id} />
//                         </div>
//                       ))}
//                     </div>
//                     <div className="ChatProfileInput">
//                       <i
//                         class="fas fa-smile-beam mx-2"
//                         style={{ fontSize: "25px", color: "gray" }}
//                       ></i>
//                       <input
//                         className="form-control p-2"
//                         placeholder="write something..."
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         value={newMessage}
//                         style={{ width: "80%" }}
//                       />
//                       <i
//                         class="fas fa-paper-plane chatSend mx-5"
//                         onClick={handleSubmit}
//                       ></i>
//                     </div>
//                   </>
//                 ) : ''
//                   // <span className="noConversationText">
//                   //   Open a conversation to start a chat.
//                   // </span>
//                 }
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Corridor;



import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import NavbarBottomUser from "../NavbarBottomUser";
import Conversation from "../Conversation"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { BorderBottom } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { requestURL } from "../ReqUrl";
import Message from "../Message"

const Corridor = () => {
  const params = useParams()

    const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sessionUser, setSessionUser] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userData, setUserData] = useState('')
  const [userStaff, setUserStaff] = useState([])
  const [userStudent, setUserStudent] = useState([])

  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    socket.current.emit("addUser", `${params.id}`);
    socket.current.on("getUsers", (users) => {
      console.log(users);
      // setOnlineUsers(
      //   sessionUserCircle.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [params.id]);

  // console.log(onlineUsers);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${requestURL}/api/conversations/${params.id}`
        );
        // console.log(res);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [params.id]);



  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${requestURL}/api/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // console.log(messages)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: `${params.id}`,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== `${params.id}`
    );

    socket.current.emit("sendMessage", {
      senderId: `${params.id}`,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(`${requestURL}/api/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    const chatleftRef = useRef(0)
    const chatrightRef = useRef(0)
    const mainChatInfo = useRef(0)
    const groupChatInfo = useRef(0)
  
    const handleRight = () => {
        if (window.innerWidth <= 615) {

            chatleftRef.current.style.display = "none";
            chatrightRef.current.style.display = "block";
        }
    }
    const handleLeft = () => {
        if (window.innerWidth <= 615) {

            chatleftRef.current.style.display = "block";
            chatrightRef.current.style.display = "none";
        }
    }
    const mainClick = () => {
        mainChatInfo.current.style.display="block";
        mainChatInfo.current.style.BorderBottom="#000";
        groupChatInfo.current.style.display="none";
    }
    const groupClick = () => {
        mainChatInfo.current.style.display="none";
        groupChatInfo.current.style.display="block";
    }

    useEffect(() =>{
      axios.get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) =>{
        setUserStaff(res.data.user.staff)
        console.log(res)
        setUserStudent(res.data.user.student)
      })
    },[])

  return (
    <>
    <NavbarTopUser uid={params.id}/>
      
      <div className={styles.chatparent}>
          <div className={styles.chatheight}>
            <div className={`${styles.chatleft} mt-2`} ref={chatleftRef} >
                    <div className={styles.chatheadercolor}>
                        <div className={styles.chatleftheader}>
                            <h5 ref={mainChatInfo} onClick={mainClick}>Main Chat</h5>
                            <h5 ref={groupChatInfo} onClick={groupClick}>Group Chat</h5>
                        </div>

                        <div className={styles.chatleftsearch}>
                            <div className={styles.searchContainer}>
                                <table className={styles.searchTable}>
                                    <tr>
                                        <td>
                                            <input class={styles.search} type="text" placeholder="Search..." />
                                        </td>
                                        <td>
                                            <a href='#'><i class="fa fa-search fa-sm" aria-hidden="true"></i></a>

                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className={styles.chatleftUserParent} onClick={handleRight}>
                        
                    {conversations.map((c) => (             
                            <div className={styles.mainChat} ref={mainChatInfo} onClick={() => setCurrentChat(c)} style={{cursor: 'pointer'}}>
                                {/* <Conversation userName='Roshan'/> */}
                                <Conversation
                                  conversation={c}
                                  currentUserId={params.id}
                                />
                            </div>
                    ))}
                    {userStaff.joinedInsGroup ? userStaff.joinedInsGroup.length : ''}

                            <div className={styles.groupChat} ref={groupChatInfo}>
                              <p>No Groups Available</p>
                                {/* <Conversation userName='TechDock Labs' />
                                <Conversation userName='Mithkal TechDock'/>
                                <Conversation userName='TechDock Mern'/> */}
                            </div>
                           
                           
                        
                    </div>
             </div>

             <div className={`${styles.chatright} mt-2`} ref={chatrightRef}>
                <div className={styles.chatrightheader}>
                            <div className="d-flex gap-3 align-items-center">
                                {/* <h6 onClick={handleLeft}><img src={`/images/back-icon.svg`}/></h6> */}
                                <img src='/images/image-boy2.png' />
                                <div className={styles.chatrightright}>
                                    <h5>{userData ? userData.userLegalName : ''}</h5>
                                    {/* <p>Last Seen : </p> */}
                                </div>
                        </div>
                    <i class="fas fa-ellipsis-v fa-sm"></i>
                </div>

                <div className={styles.chatrightchats}>
                {currentChat ? 
                      messages.map((m) => (
                         <div ref={scrollRef}>
                           <Message message={m} own={m.sender === params.id} />
                         </div>
                      ))
                : ''}
                </div>
                <div className={styles.chatFooter}>
                    <i class="fas fa-smile"></i>
                    <textarea
                                rows='1'
                                type="text"
                                name="search"
                                placeholder="What are you want to talk about?..."
                                onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                    />
                    <SendIcon style={{fill: "whitesmoke"}} onClick={handleSubmit}
/>
                    <AttachFileIcon className={styles.attachIcon} style={{fill: "whitesmoke"}}/>
                </div>
             </div>
          </div>
      </div>
                
                
        
    </>
  );
};

export default Corridor;
