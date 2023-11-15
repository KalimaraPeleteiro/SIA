import { useParams } from "react-router-dom";
import styles from "./AnaliseIndividual.module.css";
import Header from "../../components/Header";
import coleta from './images/imagemColeta.png';
import transporte from './images/transporte.png';
import analiseLaboral from './images/analiseLaboral.png';
import inteligencia from './images/inteligencia.png';
import { useState, useEffect } from "react";
import axios from "axios";


const AnaliseIndividual = () => {
    
    const {analiseId} = useParams();
    const [analiseData, setAnaliseData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        
        const data = {
          "analiseId": analiseId
        }
  
        try {
          const response = await axios.post('http://127.0.0.1:8000/analise/detalhes/', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            setAnaliseData(response.data);
            console.log('Solicitação POST bem-sucedida');
          } else {
            console.error('Erro na solicitação POST');
          }
        } catch (error) {
          console.error('Erro ao enviar a solicitação POST:', error);
        }
      };
  
      fetchData();
    }, [analiseId]);


    console.log(analiseData)
  

    return (
      <>
        <Header textHeader={"Encomende avaliações especializada a respeito de seu terreno para o suporte agrícola."} />
        <h1 className={styles.h1AnaliseIndividual}>{analiseData.nomePersonalizado}</h1>
        
        <div className={styles.rectangle1}></div>
        <span className={styles.circulo1}>1</span>
        <div className={styles.rectangledown1}></div>
        <p className={styles.textBola1}>Coleta de Amostras</p>
        <img src={coleta} className={styles.imagem1} />

        {analiseData.estagio === 1 ? (
          <p className={styles.descriptionBola1}>  O primeiro passo do processo de análise é a coleta de amostras em sua
          propriedade. Enviaremos uma equipe especializada para o local na data
          agendada.
          </p>
        ) : (
          <p className={styles.descriptionBola1}>  Amostras Coletadas! Aguardando transporte para laboratório.
          </p>
        )
        }
        

        {analiseData.estagio === 1 ? (
          <p className={styles.infoVisitaBola1}>Visita Agendada<br/>{analiseData.dataVisita}</p>

        ): (
          <p></p>
        )
        }

        <span className={`${styles.circulo2} ${analiseData.estagio > 1 ? styles.circuloAtivo: ''}`}>2</span>
        <div className={styles.rectangledown2}></div>
        <p className={styles.textBola2}>Transporte</p>
        <img src={transporte} className={styles.imagem2}/>

        {analiseData.estagio === 1 ? (
          <p className={styles.descriptionBola2}> Em seguida, as amostras devem ser entregues ao laboratório.</p>
        ) : (
          <p></p>
        )
        }

        {analiseData.estagio === 2 ? (
          <p className={styles.descriptionBola2}> Amostras a caminho do laboratório.</p>
        ) : (
          <p></p>
        )
        }

        {analiseData.estagio > 2 ? (
          <p className={styles.descriptionBola2}> Amostras Entregues! Passando para Análise.</p>
        ) : (
          <p></p>
        )
        }



        <div className={styles.rectangle2}></div>

        <span className={`${styles.circulo3} ${analiseData.estagio > 2 ? styles.circuloAtivo: ''}`}>3</span>
        <div className={styles.rectangleleft3}></div>
        <p className={styles.textBola3}>Análise Laboratorial</p>
        <img src={analiseLaboral} className={styles.imagem3}/>

        {analiseData.estagio < 3 ? (
          <p className={styles.descriptionBola3}> Com as amostras em mão, cabe agora a equipe especializada do laboratório extrair os dados necessários para a previsão.</p>
        ) : (
          <p></p>
        )
        }

        {analiseData.estagio === 3 ? (
          <p className={styles.descriptionBola3}> Amostras em Análise. Aguarde a conclusão dos estudos para colher o relatório.</p>
        ) : (
          <p></p>
        )
        }

        {analiseData.estagio > 3 ? (
          <div>
            <p className={styles.descriptionBola3}>Relatório Pronto!</p>
            <button className={styles.buttonRelatorio}>Baixar Relatório</button>
          </div>
        ) : (
          <p></p>
        )
        }        

        <div className={styles.rectangle3}></div>
        <div  className={styles.rectangle4}></div>
        <span className={`${styles.circulo4} ${analiseData.estagio > 3 ? styles.circuloAtivo: ''}`}>4</span>
        <p className={styles.textBola4}>Usando os Resultados</p>
        <img src={inteligencia} className={styles.imagem4} />

        {analiseData.estagio < 4 ? (
          <p className={styles.descriptionBola4}>A última etapa depende somente de você! Envie seu documento para a nossa IA e iremos retornar os resultados encontrados!</p>
        ) : (
          <p></p>
        )
        }

        {analiseData.estagio === 4 ? (
          <div>
            <p className={styles.descriptionBola4}>É hora de descobrir os resultados! Envio o relatório e receba os resultados.</p>
            <button className={styles.buttonEnviarRelatorio}>Enviar Relatório</button>
          </div>
        ) : (
          <p></p>
        )
        }      
      </>
    )
  }
  
  export default AnaliseIndividual;