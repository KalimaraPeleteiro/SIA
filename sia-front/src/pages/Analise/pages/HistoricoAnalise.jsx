import Header from '../../../components/Header'
import styles from './HistoricoAnalise.module.css'


const HistoricoAnalise = () => {
  return (
    <>  
       <Header textHeader={"Encomende avaliações especializada a respeito de seu terreno para o suporte agrícola."} />

       <h1 className={styles.h1Historico}>Histórico de Análises</h1>
        
        <div className={styles.containerGeral}>
            <div className={styles.containerHistorico}>
                <div className={styles.containerText}>
                    <p className={styles.text1}>Nome Personalizado</p>
                    <p>Analise do Solo</p>
                    <p>Resultado finalizado em: dd/mm/aaaa</p>
                </div>
            </div>

            <button className={styles.buttonHistorico}>Acessar Documento</button>
        </div>
    
    </>
  )
}

export default HistoricoAnalise