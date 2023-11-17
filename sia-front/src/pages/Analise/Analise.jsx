import Header from "../../components/Header"
import styles from './Analise.module.css'
import analiseAguaImage from './images/analiseAgua.png' 
import historicoAnalisesImage from './images/historico.png'
import analiseSolo from './images/analiseSolo.png'
import AnaliseComponent from "./components/AnaliseComponent"
import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"


const Analise = () => {

 const [analises, setAnalises] = useState([]);
 const navigate = useNavigate();

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

  console.log(analises)

const handleChangePageHistorico = () => {
    navigate('/analises/historico')
}

const handleChangePageNovaAnalise = (analysisType) => {
    navigate(`/analises/encomedarAnalise/${analysisType}`);
 }
 

return (
    <>
        <Header textHeader={"Encomende avaliações especializada a respeito de seu terreno para o suporte agrícola."} />

        <div className={styles.analiseEncomendaContainer}>
            <div className={styles.analiseEncomenda}>
                <header className={styles.headerAnaliseEncomenda}>
                    <img src={analiseAguaImage}/>
                    <h1 className={styles.fontHeader}>Análise de Água</h1>
                </header>

                <p className={styles.textAnaliseEncomenda}>Não sabe se aquela fonte de água é utilizável ou não? Se é segura para consumo? Encomende a análise e uma equipe especializada da AgroConnect irá colher amostras e retornar uma resposta especializada!</p>

                <button className={styles.buttonAnaliseEncomenda} onClick={() => handleChangePageNovaAnalise("agua")}>Encomedar Análise</button>
            </div>
            <div className={styles.analiseEncomenda}>
                <header className={styles.headerAnaliseEncomenda}>
                    <img src={historicoAnalisesImage}/>
                    <h1 className={styles.fontHeader}>Análises Anteriores</h1>
                </header>

                <p className={styles.textAnaliseEncomenda}>
                    Não se lembra do resultado de alguma análise?
                    Acesse todo o histórico de análises passadas!
                </p>


                <button className={styles.buttonAnaliseEncomenda} onClick={handleChangePageHistorico}>Acessar Histórico</button>
            </div>
            <div className={styles.analiseEncomenda}>
                <header className={styles.headerAnaliseEncomenda}>
                    <img src={analiseSolo}/>
                    <h1 className={styles.fontHeader}>Análise do Solo</h1>
                </header>

                <p className={styles.textAnaliseEncomenda}>O produto ideal para cultivo varia de acordo com os nutrientes do solo. Encomende uma análise especializada para descobrir a melhor lavoura e garanta produtividade máxima!</p>

                <button className={styles.buttonAnaliseEncomenda} onClick={() => handleChangePageNovaAnalise("solo")}>Encomedar Análise</button>
            </div>
        </div>

        <div className={styles.analisesEncomendadasContainer}>
            <h2 className={styles.fontHeader}>Lista de Análises Pendentes</h2>
            
            <div>
                {analises.length ? (
                    analises.map(analise => !analise.existeParametro && 
                                            <AnaliseComponent key={analise.id} id = {analise.id} nome = {analise.nomePersonalizado} type={analise.tipo} dataCricao={analise.dataEncomenda}/>)
                ) : 
                (
                    <div className={styles.emptyList}>
                        <p>Você ainda não encomendou nenhuma análise.</p>
                    </div>
                )
                }
            </div>
        </div>

    </>
  )
}

export default Analise