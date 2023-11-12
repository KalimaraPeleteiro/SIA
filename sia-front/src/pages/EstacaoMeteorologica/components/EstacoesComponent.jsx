/* eslint-disable react/prop-types */

import styles from './EstacoesComponent.module.css';


const EstacoesComponent = ({nome, cultureName}) => {
   
    return (
        <div className={styles.containerEstacaoComponent}>
            <header className={styles.headerEstacaoComponent}>
                <h3 className={styles.titleEstacaoComponent}>{nome}</h3>
            </header>

            <div className={styles.infoEstacaoContainer}>
                <p>Cultura {cultureName}</p>
            </div>
        </div>
    )
}

export default EstacoesComponent