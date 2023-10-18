/* eslint-disable react/prop-types */
import styles from './ListReport.module.css';



const ListReports = ({ imageUrl, altText, text }) => {
  return (
    <>
      <div className={styles.containerReportBlock}>
          <div className={styles.reportBlock}>
            <div className={styles.contentReport}>
              <img src={imageUrl} alt={altText} />
              <p>{text}</p>
            </div>
          </div>
      </div>
    </>
  )
}

export default ListReports