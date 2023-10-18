/* eslint-disable react/prop-types */
import styles from "./ReportSummary.module.css";

const ReportSummary = ({titulo, items}) => {
  return (
    <div className={styles.boxReportSummary}>
      <header className={styles.headerReportSummary}>
          <h1 className={styles.titleReportSummary}>{titulo}</h1>
      </header>

      <div className={styles.containerList}>
          <ul className={styles.listReportSummary}>
            {items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
      </div>
      
    </div>
  )
}

export default ReportSummary