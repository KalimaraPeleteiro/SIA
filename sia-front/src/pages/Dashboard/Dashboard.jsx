
import { useState } from "react"
import styles from "./Dashboard.module.css"
import SummaryBox from "./components/SummaryBox"
import ListCultura from "./components/ListCultura";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const Dashboard = () => {
  const [culturas, setCulturas] = useState([]);
  const navigate = useNavigate();

  function handleCreateCulture() {
    const newCulture = {
        id: Date.now().toString(),
        name: "Nova Cultura" 
    };

    setCulturas(prevCulturas => [...prevCulturas, newCulture]);
  }

  const handleShowRelatorio = () => {
    navigate("/relatorio");
  }
  return (
    <>
      <Header textHeader={"Um painel geral a respeito de nossos serviços e suas atividades."} />
      <h1 className={styles.titleTop}>Visão geral</h1>
      <div className={styles.summaryBoxContainer}>
        <SummaryBox text={`Culturas Ativas`}/>
        <SummaryBox text={"Análises pendentes"}/>
        <SummaryBox text={"Quilos Estimados para Colheita"}/>
        <SummaryBox text={"Pestes Detectadas por m²"}/>
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.buttonAbrirRelatorio} onClick={handleShowRelatorio}>Abrir Relatório</button>
      </div>
      

      <h2 className={styles.titleList}>Lista de Culturas</h2>
      <button onClick={handleCreateCulture}>AAAAA</button>
      <div className={styles.listCulturaContainer}>
        {culturas.length ? (
          culturas.map(cultura => <ListCultura key={cultura.id} cultura={cultura} />)
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