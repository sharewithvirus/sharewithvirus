import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../images/Mithkal_icon.png";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Dropdown from "react-bootstrap/Dropdown";

const languages = [
  { code: "en", name: "English" },
  { code: "hn", name: "हिंदी" },
  { code: "mt", name: "मराठी" },
];

const SigninHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.headerSection}>
        <div className={styles.logoSection}>
          <a href="/">
            <img className={styles.imgFluid} alt="img" src={Logo} />
          </a>
        </div>
        <div className={styles.rightLinks}>
          <ul>
            <li>
              <a>{t("about-link-label")}</a>
            </li>
            <li>
              <a>{t("upgrade-label")}</a>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {t("languages-link-label")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => i18next.changeLanguage(languages[0].code)}
                  >
                    {languages[0].name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => i18next.changeLanguage(languages[1].code)}
                  >
                    {languages[1].name}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => i18next.changeLanguage(languages[2].code)}
                  >
                    {languages[2].name}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SigninHeader;
