import React, { useState } from "react";
import { useNavigate } from "react-router";
import style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InstituteMoreNav from "./InstituteMoreNav";

const NavbarBottomInstitute = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {show ? <InstituteMoreNav id={props.id}/> : null}
      <div className={`${style.bottomNav} ${style.fixed_bottom}`}>
        <div className={style.mainnavs}>
          <ul>
            <li onClick={() => navigate(`/insdashboard/${props.id}`)}>
              <i className="fas fa-home "></i>
            </li>
            <li onClick={() => navigate(`/announcement/${props.id}`)}>
            <i class="fas fa-bullhorn"></i>
            </li>
            <li>
              <i
                class={`fas fa-th ${style.more}`}
                onClick={() => setShow(!show)}
              ></i>
            </li>

            <li>
              <i class="fas fa-bell"></i>
            </li>
            <li onClick={() => navigate(`/insuserprofile/${props.id}`)}>
              <i class="fas fa-user"></i>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavbarBottomInstitute;
