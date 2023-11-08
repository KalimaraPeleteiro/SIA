import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './Cultura.module.css';
import { useNavigate } from "react-router-dom";
import InfoCultura from './components/InfoCultura';
import ScrapCultura from './components/ScrapCultura';
import DadosCultura from './components/DadosCultura';
import axios from "axios";




const Cultura = () => {
  const LISTA_CULTURAS_ACEITAS_FAOSTAT = ["Tabaco", "Milho", "Sorgo", "Trigo", "Algodão", "Alfafa",
                                          "Banana", "Laranja", "Uva", "Abacaxi", "Amendoim", "Azeitona",
                                          "Açafrão", "Soja", "Girassol", "Feijião", "Ervilha", "Batata",
                                          "Beterraba", "Cana-de-Açúcar", "Couve", "Cebola", "Pimenta",
                                          "Tomate", "Melancia"];
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

const produtoNaLista = LISTA_CULTURAS_ACEITAS_FAOSTAT.includes(cultureData.produto)

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
          buttonText={cultureData.culturaIniciada ? "Cultura já Iniciada.": "Iniciar Cultura"}       
          infoType={cultureData.culturaIniciada ? "plantioIniciado" : "plantioParado"}         
          culturaIniciada = {cultureData.culturaIniciada}
          data = {cultureData.dataInicio}
        />
        
        <InfoCultura 
          buttonText={cultureData.existeAnalise ? "Ver Relatório" : "Ver Análises"}
          infoType={cultureData.existeAnalise ? "Análise Existe": "Sem Análise"}
          existeAnalise = {cultureData.existeAnalise}
        />

        {cultureData.existeEstacao ? (
          <InfoCultura 
          buttonText={cultureData.ativo ? "Estação já Ativa." : "Ativar Estação"} 
          infoType={cultureData.ativo ? "Estação Ativa" : "Sem Ativação"}
          ativo = {cultureData.ativo}
        /> 
        ): (
          <InfoCultura 
            buttonText={"Ver Estações"} 
            infoType="Sem Estação"
          />
        )}
        

        {cultureData.existeEstacao ? (
          <InfoCultura 
            buttonText={cultureData.melhorEstacao ? "Aproveite!" : "Comprar Estação"} 
            infoType={cultureData.melhorEstacao ? "Estação Pro" : "Estação Fraca"}
          />
        ) : (
          <InfoCultura 
            buttonText={"Ver Estações"}  
            infoType="Sem Estação"
          />
        )
        }
        

      </div>

      {produtoNaLista ? (
        <header className={styles.headerScrapingCultura}> 
          <h2 className={styles.h2CulturaInfo}>Informações: </h2>
          <p>Para entender melhor, visite a <span className={styles.agroAcademyFont}>AgroAcademy</span></p>
        </header>
      ):(
        <header className={styles.headerScrapingCultura}> 
          <h2 className={styles.h2CulturaInfo}>Que Pena!</h2>
          <p>Essa cultura não possui texto disponível. Encontre mais informações sobre ela na <span className={styles.agroAcademyFont}>AgroAcademy</span>.</p>
        </header>
      )}

      {produtoNaLista ? (
        <ScrapCultura/>

      ): (
        <p></p>
      )}

      
      {produtoNaLista ? (
        <div className={styles.divStateCulture}>
          <p>No momento, a sua cultura ainda não foi ativa. O tempo esperado para colheita é de 105 - 140 dias.</p>
        </div>
      ):
      (
        <p></p>
      )}
      
      
      {cultureData.existeEstacao ? 
      (
        <div className={styles.containerDados}>
          <DadosCultura
            melhorEstacao = {cultureData.melhorEstacao}
          />
        </div>
      ):
      <header className={styles.headerScrapingCultura}> 
        <h2 className={styles.h2CulturaInfo}>Dados Meteorológicos</h2>
        <p>Adquira ou ative uma estação para ter acesso!</p>
      </header>
      }
      
    </>
  )
}

export default Cultura