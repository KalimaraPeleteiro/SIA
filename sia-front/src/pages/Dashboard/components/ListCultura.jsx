/* eslint-disable react/prop-types */
import styles from './ListCultura.module.css';


const ListCultura = ({ cultura }) => {
  return (
    <>
      <div className={styles.boxList}>
        <div className={styles.items}>
            <p className={styles.culturaName}>{cultura.nomeCultura}</p>
            <p className={styles.dataCriacao}>Criada em: {cultura.diaCriacao}</p>
        </div>
      </div>  
    </>
  )
}

export default ListCultura