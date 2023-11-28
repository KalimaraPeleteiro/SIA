/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import styles from './InfoCultura.module.css';
import axios from 'axios';

const InfoCultura = ({nameCultura, buttonText, infoType, culturaIniciada, data, ativo, existeAnalise}) => {
  let textInfos;
  const { cultureName } = useParams();

  const iniciarCultura = async () => {
    const data = {
      "nomeCultura": cultureName
    }

    console.log(data);
    
    try {
      console.log("Sending request"); // Add log statement
      const response = await axios.put('http://127.0.0.1:8000/cultura_especifica/iniciar/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('Cultura iniciada com sucesso');
      } else {
        console.error('Erro ao iniciar a cultura');
      }
    } catch (error) {
      console.error('Erro ao iniciar a cultura:', error);
    }
   };

  switch(infoType) {
    case 'plantioIniciado':
      textInfos = <>Essa é uma cultura de <strong>{nameCultura}</strong> que foi ativa em {data}. Boa produtividade!</>;
      break;
    case 'plantioParado':
      textInfos = <>Essa é uma cultura de <strong>{nameCultura}</strong> que ainda não foi iniciada. Assim que começar o plantio, nos avise!</>;
      break;
    case 'Estação Ativa':
      textInfos = <>Você ativou uma estação sincronizada a essa cultura e pode observar os dados.</>;
      break;
    case 'Sem Ativação':
      textInfos = <>Você possui uma estação, mas ela não está ativa! Ative agora mesmo!</>;
      break;
    case 'Estação Pro':
      textInfos = <>Com o modelo mais avançado de estação meteorológica, você possui acesso a todos os serviços da SIA!</>;
      break;
    case 'Estação Fraca':
      textInfos = <>Você possui uma estação ativa, mas ela ainda não é o melhor modelo possível. Atualize seu modelo e tenha acesso aos outros serviços!</>;
      break;
    case 'Sem Estação':
      textInfos = <>Você não possui uma estação meteorológica ligada a essa cultura. Encomende uma agora!</>;
      break
    case 'Análise Existe':
      textInfos = <>Parabéns! Você foi esperto o suficiente para ordenar uma análise prévia do terreno, e agora possui acesso a conselhos especializados!</>;
      break;
    case 'Sem Análise':
      textInfos = <>Você não possui nenhum relatório ou anaĺise prévia ligados a essa cultura.</>;
      break;
    case 'servicoEstacao':
      textInfos = <>Os serviços meteorológicos não estão disponíveis para essa cultura</>;
      break;
    default:
      textInfos = <>Informação não disponível.</>;
  }

  return (
    <>
      <div className={styles.containerInfoCultura}>
        <p className={styles.pStyles}>{textInfos}</p>

        <div className={styles.containerButtonInfo}>
          <button className={`${styles.buttonInfo} ${culturaIniciada || ativo || existeAnalise ? styles.buttonInativo : ''}`}
            onClick={buttonText === "Iniciar Cultura" ? iniciarCultura : () => {}}
          >
            {buttonText}
          </button>
        </div>
      </div>  
    </>
  )
}

export default InfoCultura