import styles from "./Relatorio.module.css"
import { useNavigate } from "react-router-dom";
import ListReports from "./components/listReports";
import okImage from "./images/ok.png"
import atencaoImage from "./images/atencao.png"
import cuidadoImage from "./images/cuidado.png"
import ReportSummary from "./components/ReportSummary";


const Relatorio = () => {
  const navigate = useNavigate();

  const handleShowRelatorio = () => {
    navigate("/dashboard");
  }

  return (
    <>
      <h1 className={styles.title}>Relatório Diário</h1>
      <button onClick={handleShowRelatorio} className={styles.buttonRelatorio}> 
        <img src="/buttonRelatorio.png" alt="icone voltar" className={styles.imageButtonRelatorio}/>
      </button>

      <div className={styles.contentListReport}>
        <ListReports imageUrl={okImage} altText="icone relatório ok" text={"Todas as estações meteorológicas estão funcionando perfeitamente"}/>
        <ListReports imageUrl={atencaoImage} altText="icone relatório atenção" text={"Você possui 06 culturas pendentes para irrigação até o fim do dia."}/>
        <ListReports imageUrl={cuidadoImage} altText="icone relatório vermelho" text={"Você possui 03 culturas cuja irrigação não é necessária hoje."}/>
      </div>
      
      <div className={styles.contentReportSummary}>
        <ReportSummary titulo="Irrigação pendente" items={["Nome Personalizado", "Nome Personalizado", "Nome Personalizado", "Nome Personalizado", "Nome Personalizado", "Nome Personalizado", "Nome Personalizado","Nome Personalizado","Nome Personalizado"]}/>
        <ReportSummary titulo="Uso de Pesticidas" items={["Nome Personalizado", "Nome Personalizado"]}/>
      </div>

    </>
  )
}

export default Relatorio