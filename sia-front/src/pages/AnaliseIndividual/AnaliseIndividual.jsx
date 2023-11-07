import { useParams } from "react-router-dom";
import styles from "./AnaliseIndividual.module.css";
import Header from "../../components/Header";
import coleta from './images/imagemColeta.png';
import transporte from './images/transporte.png';
import analiseLaboral from './images/analiseLaboral.png';
import inteligencia from './images/inteligencia.png';

const AnaliseIndividual = () => {
    
    const {analiseId} = useParams();

    return (
      <>
        <Header textHeader={"Encomende avaliações especializada a respeito de seu terreno para o suporte agrícola."} />
        <h1 className={styles.h1AnaliseIndividual}>Análise {analiseId}</h1>
        
        <div className={styles.rectangle1}></div>
        <span className={styles.circulo1}>1</span>
        <div className={styles.rectangledown1}></div>
        <p className={styles.textBola1}>Coleta de Amostras</p>
        <img src={coleta} className={styles.imagem1} />
        <p className={styles.descriptionBola1}>  O primeiro passo do processo de análise é a coleta de amostras em sua
            propriedade. Enviaremos uma equipe especializada para o local na data
            agendada.
        </p>
        <p className={styles.infoVisitaBola1}>Visita <br />dd/mm/aaaa | hh:mm</p>
       
        <span className={styles.circulo2}>2</span>
        <div className={styles.rectangledown2}></div>
        <p className={styles.textBola2}>Transporte</p>
        <img src={transporte} className={styles.imagem2}/>
        <p className={styles.descriptionBola2}> Em seguida, as amostras devem ser entregues ao laboratório.</p>


        <div className={styles.rectangle2}></div>
        <span className={styles.circulo3}>3</span>
        <div className={styles.rectangleleft3}></div>
        <p className={styles.textBola3}>Análise Laborial</p>
        <img src={analiseLaboral} className={styles.imagem3}/>
        <p className={styles.descriptionBola3}> Com as amostras em mão, cabe agora a equipe especializada do laboratório extrair os dados necessários para a previsão.</p>
        {/*<button className={styles.buttonRelatorio}>Baixar Relatório</button>*/}
        

        <div className={styles.rectangle3}></div>
        <div  className={styles.rectangle4}></div>
        <span className={styles.circulo4}>4</span>
        <p className={styles.textBola4}>Usando os Resultados</p>
        <img src={inteligencia} className={styles.imagem4} />
        <p className={styles.descriptionBola4}>A última etapa depende somente de você! Envie seu documento para a nossa IA e iremos retornar os resultados encontrados!</p>
        {/* <button className={styles.buttonEnviarRelatorio}>Enviar Relatório</button> */}
      </>
    )
  }
  
  export default AnaliseIndividual;