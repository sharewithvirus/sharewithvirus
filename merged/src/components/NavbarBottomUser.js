import React, { useState } from "react";
import { useNavigate } from "react-router";
import style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InstituteMoreNav from "./InstituteMoreNav";

const NavbarBottomUser = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {show ? <InstituteMoreNav uid={props.uid} /> : null}
      <div className={`${style.bottomNav} ${style.fixed_bottom}`}>
        <div className={style.mainnavs}>
          <ul>
            <li onClick={() => navigate(`/userdashboard/${props.uid}`)}>
              <img
                src="/images/icon-home.svg"
                className={style.svgIcon}
                data-toggle="tooltip"
                data-placement="top"
                title="Dashboard"
              />
            </li>
            <li onClick={() => navigate(`/userannouncement/${props.uid}`)}>
              <img
                src="/images/icon-announcement.svg"
                alt="finance"
                className={style.svgIcon}
                data-toggle="tooltip"
                data-placement="top"
                title="Finance"
              />
            </li>
            <li onClick={() => setShow(!show)}>
              <img
                src="/images/icon-bmenu.svg"
                className={style.svgIcon}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Menu"
              />
            </li>

            <li onClick={() => navigate(`/user/notification/${props.uid}`)}>
              <img
                src="/images/icon-notification.svg"
                className={style.svgIcon}
                data-toggle="tooltip"
                data-placement="top"
                title="Notifications"
              />
            </li>
            <li>
              <div onClick={() => navigate(`/userprofiles/${props.uid}`)}>
                <img
                  src="/images/icon-profile.svg"
                  className={`${style.userimg} ${style.svgIcon}`}
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Profile"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarBottomUser;
