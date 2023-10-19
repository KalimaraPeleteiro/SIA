/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import styles from "./Header.module.css"


const Header = ({textHeader}) => {
  return (
    <>
        <header className={styles.header}>
            <img src="/logoSIA.png" alt="logo" className={styles.logo}/>
            <nav>
                <div className={styles.itensGroup}>
                    <div className={styles.item}>
                        <img src="/dashboard.png" alt="Dashboard" />
                        <NavLink to="/dashboard" className={styles.link}> Dashboard </NavLink>
                    </div>
                    <div className={styles.item}>
                        <img src="/cultura.png" alt="Minhas culturas" />
                        <NavLink to="/culturas" className={styles.link}>Minhas culturas</NavLink>
                    </div>
                    <div className={styles.item}>
                        <img src="/analise.png" alt="Análises" />
                        <NavLink to="/analises" className={styles.link}>Análises</NavLink>
                    </div>
                    <div className={styles.item}>
                        <img src="/clima.png" alt="Clima" />
                        <NavLink to="/clima" className={styles.link}>Clima</NavLink>
                    </div>
                    <div className={styles.item}>
                        <img src="/pestes.png" alt="Controle de Pestes" />
                        <NavLink to="/controle-pestes" className={styles.link}>Controle de Pestes</NavLink>
                    </div> 
                </div>       
            </nav>
        </header>

        <div className={styles.description}>
            <p className={styles.textDescription}>{textHeader}</p>
        </div>
    </>
  )
}

export default Header