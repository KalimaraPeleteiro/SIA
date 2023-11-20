import { useEffect, useState } from 'react';
import styles from './DadosCultura.module.css';
import exemploTemperatura from './images/exemploTemperatura.png';
import exemploUmidadeAr from './images/exemploUmidadeAr.png';
import exemploUmidadeSolo from './images/exemploUmidadeSolo.png';
import exemploVolumeChuva from './images/exemploVolumeChuva.png';
import joinha from './images/joinha.png'
import axios from "axios";
import nao from './images/nao.png';
import talvez from './images/talvez.png'


const DadosCultura = ({melhorEstacao, produto}) => {

    const[dadosMachineLearning, setDadosMachineLearning] = useState([]);

    const fetchPrevisao = async () => {
      
        const data = {
          "produtoCultura": produto
        }
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/cultura_especifica/previsao/', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            setDadosMachineLearning(response.data);
            console.log('Solicitação POST bem-sucedida');
          } else {
            console.error('Erro na solicitação POST');
          }
        } catch (error) {
          console.error('Erro ao enviar a solicitação POST:', error);
        }
      };
      
    useEffect(() => {
        fetchPrevisao();
    }, []);

  return (
    <>
        <div className={styles.containerDados}>
            <div  className={styles.containerDadosEstacao}>
                <h2>Dados Meteorológicos</h2>
                <img src={exemploTemperatura} />
                <img src={exemploUmidadeAr} />
                <img src={exemploUmidadeSolo} />
                <img src={exemploVolumeChuva} />
            </div>

            {console.log(dadosMachineLearning)}

            {(dadosMachineLearning.previsaoSafra === 'Erro de Cultura') ? (
                <div className={styles.containerDadosColheita}>
                    <h2>Colheita</h2>
                    <div className={styles.infoColheita}>
                        <p className={styles.infoColheitaTexto}>Essa cultura não está disponível para essa análise. Talvez em breve?</p>
                    </div>
                </div>
            ):(
                <div className={styles.containerDadosColheita}>
                    <h2>Colheita</h2>
                    <div className={styles.infoColheita}>
                        <div className={styles.infoColheitaNumero}>{dadosMachineLearning.previsaoSafra} kg/m²</div>
                        <p className={styles.infoColheitaTexto}>É o valor previsto para colheita com os dados coletados até então. Naturalmente, conforme o tempo avança e novos dados são entregues, mais perfeita será a previsão.De qualquer forma, considere planejar-se de acordo com o número fornecido. Caso queira encontrar possíveis compradores, considere a <span className={styles.agroAccordFont}>AgroAccord</span></p>
                    </div>
                </div> 
            )}

            <div className={styles.containerAtividadesDiarias}>
                <h2>Atividades Diárias</h2>
                <div className={styles.containerAtividasDiariasText}>
                  {dadosMachineLearning.recomendacaoIrrigacao === "Irrigação recomendada." ? (
                    <div className={styles.atividadeItem}>
                      <img src={joinha} alt="Recomendado" />
                      <p>Hoje é um bom dia para irrigação.</p>
                    </div>
                  ):(
                    <div className={styles.atividadeItem}>
                        <img src={nao} alt="Não recomendado" />
                        <p>Hoje não é um dia recomendado para irrigação.</p>
                    </div>
                  )
                  }

                  {dadosMachineLearning.recomendacaoPesticida === "O uso de pesticidas é recomendado nessa semana." ? (
                  <div className={styles.atividadeItem}>
                    <img src={joinha} alt="Recomendado" />
                    <p>Hoje é um bom dia para aplicar pesticidas!</p>
                  </div>
                  ) : (dadosMachineLearning.recomendacaoPesticida === "O uso de pesticidas não é recomendado nessa semana." ? (
                   <div className={styles.atividadeItem}>
                      <img src={nao} alt="Não Recomendado" />
                      <p>Hoje não é um bom dia para pesticidas.</p>
                   </div>
                  ):(
                    <div className={styles.atividadeItem}>
                      <img src={talvez} alt="Indiferente" />
                      <p>O uso ou não uso de pesticidas, hoje, está a sua discrição.</p>
                   </div>
                  )
                  )}

                    
                </div>
            </div>
        </div>
    </>
  )
}

export default DadosCultura