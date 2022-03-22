// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import styles from "./Home.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios'

// const CommentSection = (props) => {
//   const navigate = useNavigate()
//   const params = useParams()
//   const [userCommentData, setUserCommentData] = useState({
//     userCommentDesc: ''
// })

// const UserCommentDataHandler = (e) =>{
//     const { name, value} = e.target
//     setUserCommentData({
//         ...userCommentData,
//         [name]: value
//     })
// }

// const UserCommentDataHandlerChange = (e) =>{
//     e.preventDefault()
//     axios.post(`http://localhost:8080/user/post/comments/${props.cid}`, userCommentData)
//     .then(res =>{
//         if(res.data.message === 'Successfully Commented' && res.status == 200){
//             // navigate(`/userdashboard/${params.id}`)
//         }
//         else{
//             alert("something went wrong")
//         }
//     }).catch(e =>{
//         console.log('Something Went Wrong')
//     })
//     const usercomment = document.querySelector(`#${props.uid}`)
//     usercomment.value = ''
// }


// const [commentData, setCommentData] = useState({
//   commentDesc: ''
// })

// const CommentDataHandler = (e) =>{
//   const { name, value} = e.target
//   setCommentData({
//       ...commentData,
//       [name]: value
//   })
// }

// const CommentDataHandlerChange = (e) =>{
//   e.preventDefault()
//   axios.post(`http://localhost:8080/post/comments/${props.ccid}`, commentData)
//   .then(res =>{
//       if(res.data.message === 'Successfully Commented' && res.status == 200){
//           // navigate(`/insdashboard/${params.id}`)
//       }
//       else{
//           alert("something went wrong")
//       }
//   }).catch(e =>{
//       console.log('Something Went Wrong')
//   })
//   const comment = document.querySelector(`#${props.id}`)
//   comment.value = ''
// }
//   return props.trigger ? (
//     <>
//       {props.ccid ?
//       <div className={` ${styles.commentsContainer}`}>
//         <div className={styles.commentBox}>
//           <div className={styles.postUserImg}>
//             <img className={styles.insUserProfile} src={props.uProfilePic} />
//           </div>
//           <div className={styles.commentInput}>
//             <form method="post" onSubmit={CommentDataHandlerChange}>
//               <div class="form-group">
//                 <input
//                   type="text"
//                   class="form-control"
//                   name="commentDesc"
//                   id={props.id}
//                   placeholder="Leave your thoughts here"
//                   onChange={CommentDataHandler}
//                   required
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//         {/* <div className="d-flex justify-content-end px-4">
//             <button type="button" class="btn btn-primary btn-sm">
//               Comment
//             </button>
//           </div> */}
//         {/* <div className={styles.sortComment}>
//           <p>Comments</p>
//           <p>
//             <small>Most recent &nbsp; </small>
//             <i class="fas fa-sort-down"></i>
//           </p>
//         </div> */}
//         <div className={styles.commentCollections}>{props.comment}</div>
//       </div>
//       :
//       <div className={` ${styles.commentsContainer}`}>
//         <div className={styles.commentBox}>
//           <div className={styles.postUserImg}>
//             <img className={styles.insUserProfile} src={props.uProfilePic} />
//           </div>
//           <div className={styles.commentInput}>
//             <form method="post" onSubmit={UserCommentDataHandlerChange}>
//               <div class="form-group">
//                 <input
//                   type="text"
//                   class="form-control"
//                   name="userCommentDesc"
//                   id={props.uid}
//                   placeholder="Leave your thoughts here"
//                   onChange={UserCommentDataHandler}
//                   required
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="d-flex justify-content-end px-4">
//             <button type="button" class="btn btn-primary btn-sm">
//               Comment
//             </button>
//           </div>
//         <div className={styles.sortComment}>
//           <p>Comments</p>
//           <p>
//             <small>Most recent &nbsp; </small>
//             <i class="fas fa-sort-down"></i>
//           </p>
//         </div>
//         <div className={styles.commentCollections}>{props.comment}</div>
//       </div>
//       }
//     </>
//   ) : null;
// };
// CommentSection.defaultProps = {
//   uProfilePic:
//     "https://themes.pixelstrap.com/friendbook/assets/images/user/3.jpg",
//   comment: "",
// };
// export default CommentSection;
