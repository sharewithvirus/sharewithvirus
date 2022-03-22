import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NewInviteLinkCard from './NewInviteLinkCard'

const UserSideBar = (props) => {
  const [addInvite, setAddInvite] = useState(false)
  
  const setAddInviteFunction = () => {
    setAddInvite(false);
  };

  return (
    <>
      <div className={styles.dabout}>
            <img
              src="/images/followers-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Followers"
            /> Followers
      </div>
      <div className={styles.dabout}>
            <img
              src="/images/followers-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Followed"
            /> Followed
      </div>
      <div className={styles.dabout}>
            <img
              src="/images/circle-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Circle"
            /> Circle
      </div>
      <div className={styles.dabout}>
            <img
              src="/images/joined-playlists-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Joined Playlists"
            /> Joined Playlists
      </div>
      <div className={styles.dabout}
      onClick={() => {setAddInvite(true)}}
      >
            <img
              src="/images/invite-a-friend-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Invite Your Friends"
            /> Invite Your Friends
      </div>
      <NewInviteLinkCard
      setAddInviteFunction={setAddInviteFunction}
      trigger={addInvite}
      setTrigger={setAddInvite}
    />
    </>
  );
};

export default UserSideBar;
