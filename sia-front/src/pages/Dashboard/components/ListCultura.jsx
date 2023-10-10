/* eslint-disable react/prop-types */
import styles from './ListCultura.module.css';


const ListCultura = ({ cultura }) => {
  return (
    <>
      <div className={styles.boxList}>
        <div className={styles.items}>
            <p className={styles.culturaName}>{cultura.name}</p>
            <p className={styles.dataCriacao}>Criada em: dd/mm/aaaa</p>
        </div>
      </div>  
    </>
  )
}

export default ListCultura