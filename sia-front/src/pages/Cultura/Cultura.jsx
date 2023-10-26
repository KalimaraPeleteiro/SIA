import { useParams } from 'react-router-dom';
import styles from './Cultura.module.css';
import { useNavigate } from "react-router-dom";
import InfoCultura from './components/InfoCultura';
import ScrapCultura from './components/ScrapCultura';
import DadosCultura from './components/DadosCultura';



const Cultura = () => {
  const navigate = useNavigate();
  const { cultureName } = useParams();

  const handleShowMinhasCulturas = () => {
    navigate('/culturas')
  }

  return (
    <>
      <header className={styles.headerCultura}>
        <button onClick={handleShowMinhasCulturas} className={styles.buttonRelatorio}> 
          <img src="/buttonRelatorio.png" alt="icone voltar" className={styles.imageButtonRelatorio}/>
        </button>
        <h1 className={styles.titleCultura}>Minha cultura: {cultureName}</h1>
      </header>

      <h2 className={styles.h2Cultura}>Visão Geral</h2>

      <div className={styles.containerInfosCulturas}>
        <InfoCultura nameCultura={cultureName} buttonText={"Iniciar Cultura"} infoType="plantio"/>
        <InfoCultura buttonText={"Ativar Estação"} infoType="ativarEstacao"/>
        <InfoCultura buttonText={"Ver Análises"} infoType="analise"/>
        <InfoCultura buttonText={"Ver estações"} infoType="servicoEstacao"/>
      </div>

      <header className={styles.headerScrapingCultura}> 
        <h2 className={styles.h2CulturaInfo}>Informações: </h2>
        <p>Para entender melhor, visite a <strong>AgroAcademy</strong></p>
      </header>

      <ScrapCultura />

      <div className={styles.divStateCulture}>
        <p>No momento, a sua cultura ainda não foi ativa. O tempo esperado para colheita é de 105 - 140 dias.</p>
      </div>
      

      <div className={styles.containerDados}>
        <DadosCultura />
      </div>
    </>
  )
}

export default Cultura