import UserAboutSection from "../../UserAboutSection";
import styles from "../../Home.module.css";
const SideBar = (props) => {
  return (
    <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
      <div className={styles.leftBar}>
        <UserAboutSection uid={props.id} />
        <div className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}>
          <select
            className="form-control-plaintext"
            id="usermember"
            name="usermember"
          >
            <option value="ABC Institute ( staff )">
              ABC Institute ( staff )
            </option>
            <option value="ABC Institute ( student )">
              ABC Institute (student )
            </option>
          </select>
        </div>

        <div className={` ${styles.about} ${styles.leftMenu}`}>
          <div className={styles.dabout}>Id Card</div>
          <div className={styles.dabout}>Complaints Box</div>
          <div className={styles.dabout}>Leave</div>
          <div className={styles.dabout}>Transfer</div>
          <div className={styles.dabout}>Settings</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
