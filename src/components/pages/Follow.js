import React, {useState} from "react";
import { useNavigate } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { requestURL } from '../ReqUrl'
import axios from 'axios'

function Follow(props) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0)

  const UserInsUnFollowHandler = (id) => {
    axios
      .put(`${requestURL}/user/unfollow/institute`, {
        InsfollowId: id,
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
        <p className={` mt-4 ${styles.dashIcon} ${styles.dashIconsInner}`}>

        <span onClick={()=> props.changeIndex(0)}>
            <ArrowBackIcon/>
          
          </span>
        
          <span onClick={() => setIndex(0)}>
            <PeopleOutlineIcon/>
          </span>
       
        
            <span onClick={() => setIndex(1)}>
              <GroupIcon/>
              
            </span>
      
        
          <span onClick={() => setIndex(2)}>
            <GroupsIcon/>
            
          </span>
      </p>
      <hr/>
      {index === 0 && 
        <>
          {props.followData && props.followData.map((ft) => (
          <div className={styles.followdisplay}>
          <div className="d-flex gap-3">
          <img src={
                  ft.photoId === "1"
                  ? "/images/profile.jpeg"
                  : props.first
                  ? `${requestURL}/userprofileabout/photo/${ft.profilePhoto}`
                  : null
              }/>
            <div>
              <h5>{ft.userLegalName}</h5>
              <p>{ft.username}</p>
            </div>
          </div>
          <button type="button" class="btn btn-outline-info">Block</button>
        </div>
          ))}
        </>
      }

      { index === 1 && 
      <>
        {props.circleData && props.circleData.map((ft) => (
          <div className={styles.followdisplay}>
            <div className="d-flex gap-3">
            <img src={
                  ft.photoId === "1"
                  ? "/images/profile.jpeg"
                  : props.first
                  ? `${requestURL}/userprofileabout/photo/${ft.profilePhoto}`
                  : null
              }/>              
              <div>
                <h5>{ft.userLegalName}</h5>
                <p>{ft.username}</p>
              </div>
            </div>
          <button type="button" class="btn btn-outline-info">Uncircle</button>
        </div>
        ))}
        </>
      }

      {index === 2 &&
      <>
        {props.followingData && props.followingData.map((ft) => (
          <div className={styles.followdisplay}>
            <div className="d-flex gap-3">
            <img src={
                  ft.photoId === "1"
                  ? "/images/profile.jpeg"
                  : props.first
                  ? `${requestURL}/userprofileabout/photo/${ft.profilePhoto}`
                  : null
              }/>
                <div>
                  <h5>{ft.userLegalName}</h5>
                  <p>{ft.username}</p>
                </div>
          </div>
          <button type="button" class="btn btn-outline-info">Unfollow</button>
        </div>
        ))}
        {props.userInsFollow && props.userInsFollow.map((ft) => (
          <div className={styles.followdisplay}>
            <div className="d-flex gap-3">
              <img src={
                  ft.photoId === "1"
                  ? "/images/institute-avatar.jpeg"
                  : props.first
                  ? `${requestURL}/insprofileabout/photo/${ft.insProfilePhoto}`
                  : null
              }/>
                <div>
                  <h5>{ft.insName}</h5>
                  <p>{ft.name}</p>
                </div>
          </div>
          <button type="button" class="btn btn-outline-info"
          onClick={() => {
            UserInsUnFollowHandler(ft._id);
          }}
          >Unfollow</button>
        </div>
        ))}
        </>
      }
    </>
  )
}

export default Follow