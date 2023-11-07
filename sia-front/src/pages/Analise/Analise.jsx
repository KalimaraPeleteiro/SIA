import Header from "../../components/Header"
import styles from './Analise.module.css'
import analiseAguaImage from './images/analiseAgua.png' 
import historicoAnalisesImage from './images/historico.png'
import analiseSolo from './images/analiseSolo.png'
import AnaliseComponent from "./components/AnaliseComponent"
import { useState } from "react"


const Analise = () => {
 const [analises] = useState([]);    


return (
    <>
        <Header textHeader={"Encomende avaliações especializada a respeito de seu terreno para o suporte agrícola."} />

        <div className={styles.analiseEncomendaContainer}>
            <div className={styles.analiseEncomenda}>
                <header className={styles.headerAnaliseEncomenda}>
                    <img src={analiseAguaImage}/>
                    <h1>Análise de Água</h1>
                </header>

                <p className={styles.textAnaliseEncomenda}>Não sabe se aquela fonte de água é utilizável ou não? Se é segura para consumo? Enciomende a análise e uma equipe especializada da AgroConnect irá colher amostras e retornar uma resposta especializada!</p>

                <button className={styles.buttonAnaliseEncomenda}> Encomedar Análise</button>
            </div>
            <div className={styles.analiseEncomenda}>
                <header className={styles.headerAnaliseEncomenda}>
                    <img src={historicoAnalisesImage}/>
                    <h1>Análises Anteriores</h1>
                </header>

                <p className={styles.textAnaliseEncomenda}>
                    Não se lembra do resultado de alguma análise?
                    Acesse todo o histórico de análises passadas!
                </p>


                <button className={styles.buttonAnaliseEncomenda}>Acessar Histórico</button>
            </div>
            <div className={styles.analiseEncomenda}>
                <header className={styles.headerAnaliseEncomenda}>
                    <img src={analiseSolo}/>
                    <h1>Análise do Solo</h1>
                </header>

                <p className={styles.textAnaliseEncomenda}>O produto ideal para cultivo varia de acordo com os nutrientes do solo. Encomende uma análise especializada para descobrir a melhor lavoura e garanta produtividade máxima!</p>

                <button className={styles.buttonAnaliseEncomenda}>Encomedar Análise</button>
            </div>
        </div>

        <div className={styles.analisesEncomendadasContainer}>
            <h2>Lista de Análises Pendentes</h2>
            
            <AnaliseComponent id="1111" type="Agua" dataCricao="dd/mm/yyyy"/>
            <div>
                {analises.length ? (
                    analises.map(analise => <AnaliseComponent key={analise.id} type={analise.type} dataCricao={analise.dataCricao}/>)
                ) :
                    <div className={styles.emptyList}>
                        <strong>Você ainda não encomendou nenhuma análise.</strong>
                    </div>
                }
            </div>
        </div>

    </>
  )
}

export default Analise