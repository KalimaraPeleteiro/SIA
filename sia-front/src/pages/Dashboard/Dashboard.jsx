
import { useState, useEffect } from "react"
import styles from "./Dashboard.module.css"
import SummaryBox from "./components/SummaryBox"
import ListCultura from "./components/ListCultura";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";

const Dashboard = () => {
  const [culturas, setCulturas] = useState([]);
  const [dadosDashboard, setDadosDashboard] = useState([]);
  const navigate = useNavigate();

  const fetchCulturas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/dashboard/lista/");
      setCulturas(response.data.culturas);
      console.log("Dados da API:", response.data);
    } catch (error) {
      console.error("Erro ao buscar as culturas:", error);
    }
  };

  const fetchDados = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/dashboard/detalhes/");
      setDadosDashboard(response.data);
      console.log("Dados da API:", response.data);
    } catch (error) {
      console.error("Erro ao buscar as dados da dashboard:", error);
    }
  };

  useEffect(() => {
    fetchCulturas(); // Chamando a função fetchCulturas quando o componente for montado
   
    const timer = setTimeout(() => {
      fetchDados(); // Chamando a função fetchDados 1 segundo após fetchCulturas
    }, 100); // 1000 milissegundos = 1 segundo
   
    // Limpeza do efeito
    return () => clearTimeout(timer);
   }, []);

  const handleShowRelatorio = () => {
    navigate("/relatorio");
  }
  return (
    <>
      <Header textHeader={"Um painel geral a respeito de nossos serviços e suas atividades."} />
      <h1 className={styles.titleTop}>Visão geral</h1>
      <div className={styles.summaryBoxContainer}>
        <SummaryBox text={`Culturas Ativas`} number = {dadosDashboard.numeroCulturasAtivas}/>
        <SummaryBox text={"Análises pendentes"} number = {dadosDashboard.numeroAnalisesPendentes}/>
        <SummaryBox text={"Quilos Estimados para Colheita"} number = {0}/>
        <SummaryBox text={"Pestes Detectadas por m²"} number = {dadosDashboard.numeroInsetos}/>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.buttonAbrirRelatorio} onClick={handleShowRelatorio}>Abrir Relatório</button>
      </div>
      

      <h2 className={styles.titleList}>Lista de Culturas</h2>
      <div className={styles.listCulturaContainer}>
        {culturas.length ? (
          culturas.map(cultura => <ListCultura key={cultura.nomeCultura} cultura={cultura} />)
        ) : (
          <div className={styles.emptyList}>
            <strong>Você ainda não criou nenhuma cultura no sistema. Crie agora e aproveite os serviços da SIA!</strong>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard