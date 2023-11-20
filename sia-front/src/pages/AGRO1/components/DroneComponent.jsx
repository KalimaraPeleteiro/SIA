/* eslint-disable react/prop-types */

import styles from './DroneComponent.module.css';


const DroneComponent = ({nome, cultureName, ativo}) => {
   
    return (
        <div className={styles.containerEstacaoComponent}>
            <header className={styles.headerEstacaoComponent}>
                <h3 className={styles.titleEstacaoComponent}>{nome}</h3>
            </header>

            <div className={styles.infoEstacaoContainer}>
                <p>{cultureName}</p>
                {ativo ? (
                    <p>Drone Ativo</p>
                ) : (
                    <p>Drone Ainda não Ativado</p>
                )}
            </div>
        </div>
    )
}

export default DroneComponent