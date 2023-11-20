/* eslint-disable react/prop-types */
import styles from "./SummaryBox.module.css"


const SummaryBox = (props) => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.items}>
            <span className={styles.numberInfo}>{props.number}</span>
            <p className={styles.textInfo}>{props.text}</p>
        </div>
      </div>  
    </>
  )
}

export default SummaryBox