import Header from "../../components/Header"
import styles from "./AgroOne.module.css"
import droneAtivar from "./images/droneAtivar.png";
import droneImage from "./images/drone.png";
import saibaMais from "./images/saibaMais.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DroneComponent from "./components/DroneComponent";



const AgroOne = () => {
  const navigate = useNavigate();
  const [drones] = useState([]);

  const handleChangePageSaibaMais = () => {
    window.open(`/controlePestes/saibaMais`, '_blank');
  }

  const handleChangePageVenda = () => {
    navigate('/controlePestes/vendaDrone')
  }


  const handleChangePageAtivacao = () => {
    navigate(`/controlePestes/ativarDrone`)
  }
  

  return (
    <>
        <Header textHeader={"Livre-se dos miseráveis que comprometem a sua lavroura."} />

        <div className={styles.estacaoContainer}>
            <div className={styles.estacaoBox}>
                <header className={styles.headerEstacaoBox}>
                    <img src={droneImage}/>
                    <h1 className={styles.fontHeader}>Venda de Drones</h1>
                </header>

                <p className={styles.textEstacaoBox}>Conheça os nossos modelos especializados disponíveis e prontos para compra e instalação.</p>

                <button className={styles.buttonEstacaoBox} onClick={handleChangePageVenda}>Ordenar Compra</button>
            </div>
            <div className={styles.estacaoBox}>
                <header className={styles.headerEstacaoBox}>
                    <img src={droneAtivar}/>
                    <h1 className={styles.fontHeader}>Sicronizar seu Drone</h1>
                </header>

                <p className={styles.textEstacaoBox}>
                     Comprou um drone e ele está parado em sua estação? Ele não está ativo! Ative-o agora mesmo!
                </p>


                <button className={styles.buttonEstacaoBox} onClick={handleChangePageAtivacao}>Ativar Drone</button>
            </div>
            <div className={styles.estacaoBox}>
                <header className={styles.headerEstacaoBox}>
                    <img src={saibaMais}/>
                    <h1 className={styles.fontHeader}>Saiba Mais!</h1>
                </header>

                <p className={styles.textEstacaoBox}>Não sabe o que é AGRO-1 nem qual a sua utilidade? Venha que te ensinamos!</p>

                <button className={styles.buttonEstacaoBox} onClick={handleChangePageSaibaMais} >Conhecer</button>
            </div>
        </div>

        <div className={styles.estacoesEncomendadasContainer}>
            <h2 className={styles.fontHeader}>Lista de Drones</h2>
            
            <div>
                {drones.length ? (
                    drones.map(drone => <DroneComponent key={drone.id}  nome = "Nome Personalziado" cultureName="XX" />)
                ) : 
                (
                    <div className={styles.emptyList}>
                        <p>Você ainda não sincronizou nenhum drone.</p>
                    </div>
                )
                }
            </div>
        </div>
    </>
  )
}

export default AgroOne