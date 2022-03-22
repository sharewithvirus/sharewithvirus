import React, { useState } from "react";
import { useNavigate } from "react-router";
import style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavSidebar from "./NavSidebar";

const ProfileNavbar = ({ profilePicSrc, name }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {show ? <NavSidebar profilePicSrc={profilePicSrc} name={name} /> : null}

      <div className={style.profileNav}>
        <i class="fas fa-long-arrow-alt-left" onClick={() => navigate(-1)} style={{cursor: 'pointer'}}></i>
        <div className={style.searchbox}>
          <input
            type="text"
            name="Search"
            placeholder="Search ..."
            className={style.search}
            autoComplete="false"
          />
        </div>
        {/* <i class="fas fa-ellipsis-v " onClick={() => setShow(!show)}></i> */}
      </div>
    </>
  );
};

export default ProfileNavbar;
