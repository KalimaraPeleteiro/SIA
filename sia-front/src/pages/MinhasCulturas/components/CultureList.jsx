/* eslint-disable react/prop-types */
import styles from "./CultureList.module.css";
import { Link } from 'react-router-dom';

const CultureList = ({produtoIndicado, analiseState, colheitaEsperadaState, dataCriacao, nomeCultura}) => {

  return (
    <div>
      <div className={styles.containerCultureList}>
        <Link to={`/culturas/${nomeCultura}`} className={styles.linkStyle}>
          <h2 className={styles.titleCultureList}>{nomeCultura || 'Nome Personalizado'}</h2>
          <div className={styles.pContainer}>
            <p>Produto Indicado: {produtoIndicado}</p>
            <p>Análise previa: {analiseState}</p>
            <p>Colheita esperada: {colheitaEsperadaState}</p>
            <p>Criada em: {dataCriacao}</p>
          </div>
        </Link>
      </div>
    </div>
 
  )
}

export default CultureList