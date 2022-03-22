import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
const ReportCardStyle = () => {
  return (
    <div className={`${styles.reportTopDesign1}`}>
      <div>
        <div className={`${styles.reportTopBox}`}></div>
        <div className={` my-5 ${styles.reportTopDesign}`}>
          <h3
            id={styles.reportTop}
            className={`py-md-5 py-sm-4 offset-sm-4 offset-md-0 ${styles.reportText}`}
          >
            Report Card
          </h3>
        </div>
        <div className={`${styles.reportTopBox2}`}></div>
      </div>
    </div>
  );
};

export default ReportCardStyle;
