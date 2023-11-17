import Header from '../../../components/Header'
import styles from './HistoricoAnalise.module.css'
import { useState, useEffect } from "react"
import axios from "axios";


const HistoricoAnalise = () => {
  const [analises, setAnalises] = useState([]);

  const fetchAnalises = async () => {
    try {
      const response = await axios.get("http://localhost:8000/analises/lista/");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as análises: " + error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAnalises();
      setAnalises(data.Analises || []);
    };

    fetchData();
  }, []);

  const downloadPDFSolo = async (idAnalise) => {

    const data = {
      "analiseId": idAnalise
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/analise/historico/baixar/solo/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
            "responseType": "blob"
        });
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Relatório.pdf');
            document.body.appendChild(link);
            link.click();
        } else {
            console.error('Erro na solicitação POST');
        }
    } catch (error) {
        console.error('Erro ao enviar a solicitação POST:', error);
    }
 };

 const downloadPDFAgua = async (idAnalise) => {

  const data = {
    "analiseId": idAnalise
  }

  try {
      const response = await axios.post('http://127.0.0.1:8000/analise/historico/baixar/agua/', data, {
          headers: {
              'Content-Type': 'application/json',
          },
          "responseType": "blob"
      });
      if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Relatório.pdf');
          document.body.appendChild(link);
          link.click();
      } else {
          console.error('Erro na solicitação POST');
      }
  } catch (error) {
      console.error('Erro ao enviar a solicitação POST:', error);
  }
};

  return (
    <>  
       <Header textHeader={"Encomende avaliações especializada a respeito de seu terreno para o suporte agrícola."} />

       <h1 className={styles.h1Historico}>Histórico de Análises</h1>

       {analises.map(analise => ( analise.existeParametro &&
        <div key={analise.id} className={styles.containerGeral}>
          <div className={styles.containerHistorico}>
            <div className={styles.containerText}>
              <p className={styles.text1}>{analise.nomePersonalizado}</p>
              <p>Análise de {analise.tipo}</p>
            </div>
          </div>
          {analise.tipo === "Solo" ? (
            <button className={styles.buttonHistorico} onClick={() => downloadPDFSolo(analise.id)}>Acessar Documento</button>
          ): (
            <button className={styles.buttonHistorico} onClick={() => downloadPDFAgua(analise.id)}>Acessar Documento</button>
          )}
        </div>
        ))}
    </>
  )
}

export default HistoricoAnalise