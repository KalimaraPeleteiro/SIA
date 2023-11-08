import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './Cultura.module.css';
import { useNavigate } from "react-router-dom";
import InfoCultura from './components/InfoCultura';
import ScrapCultura from './components/ScrapCultura';
import DadosCultura from './components/DadosCultura';
import axios from "axios";




const Cultura = () => {
  const navigate = useNavigate();
  const { cultureName } = useParams();
  const [cultureData, setCultureData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
      const data = {
        "nomeCultura": cultureName
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/cultura_especifica/dados/', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setCultureData(response.data);
          console.log('Solicitação POST bem-sucedida');
        } else {
          console.error('Erro na solicitação POST');
        }
      } catch (error) {
        console.error('Erro ao enviar a solicitação POST:', error);
      }
    };

    fetchData();
  }, [cultureName]);

  const handleShowMinhasCulturas = () => {
    navigate('/culturas')
  }

  console.log(cultureData);

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
        <InfoCultura 
          nameCultura={cultureData.produto}          
          buttonText={cultureData.ativo ? "Cultura já Iniciada.": "Iniciar Cultura"}       
          infoType={cultureData.ativo ? "plantioIniciado" : "plantioParado"}         
          ativo = {cultureData.ativo}
          data = {cultureData.dataInicio}
        />
        
        
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