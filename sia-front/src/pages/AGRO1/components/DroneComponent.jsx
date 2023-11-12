/* eslint-disable react/prop-types */

import styles from './DroneComponent.module.css';


const DroneComponent = ({nome, cultureName}) => {
   
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

export default DroneComponent