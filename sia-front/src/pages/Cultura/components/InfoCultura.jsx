/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './InfoCultura.module.css';


const InfoCultura = ({nameCultura, buttonText, infoType, ativo, data}) => {
  let textInfos;

  switch(infoType) {
    case 'plantioIniciado':
      textInfos = <>Essa é uma cultura de <strong>{nameCultura}</strong> que foi ativa em {data}. Boa produtividade!</>;
      break;
    case 'plantioParado':
      textInfos = <>Essa é uma cultura de <strong>{nameCultura}</strong> que ainda não foi iniciada. Assim que começar o plantio, nos avise!</>;
      break;
    case 'ativarEstacao':
      textInfos = <>Você não possui uma estação meteorológica ativa ligada a essa cultura</>;
      break;
    case 'analise':
      textInfos = <>Você não possui nenhum relatório ou análise prévia ligados a essa cultura.</>;
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
          <button className={`${styles.buttonInfo} ${ativo ? styles.buttonAtivo : ''}`}>
            {buttonText}
          </button>
        </div>
      </div>  
    </>
  )
}

export default InfoCultura