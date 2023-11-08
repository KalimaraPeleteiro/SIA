/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import styles from './AnaliseComponent.module.css'

const AnaliseComponent = ({id, type, dataCricao}) => {
  return (
    <div className={styles.containerAnaliseComponent}>
        <Link to={`/analises/${id}`} className={styles.linkStyle}>  
            <header className={styles.headerAnaliseComponent}>
                <h3 className={styles.titleAnaliseComponent}>Análise</h3>
                <span className={styles.titleAnaliseComponent}>{id}</span>
            </header>

            <div className={styles.infoAnaliseContainer}>
                <p>Análise de {type}</p>
                <p>Encomendado em: {dataCricao}</p>
            </div>
        </Link>  
    </div>
  )
}

export default AnaliseComponent