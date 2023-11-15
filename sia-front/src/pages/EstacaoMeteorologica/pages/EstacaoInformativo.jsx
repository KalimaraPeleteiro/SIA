import { useNavigate } from "react-router-dom"
import Header from "../../../components/Header"
import styles from "./EstacaoInformativo.module.css"

const EstacaoInformativo = () => {
    const navigate = useNavigate()
    const handleChangePage = () => {
        navigate('/clima/vendaEstacoes')
    }



  return (
    <>
        <Header textHeader={"Ordene a compra e a instalação de produtos especializados para as suas necessidades agrícolas."} />

        <div className={styles.containerEstacaoInformativo}>

            <div className={styles.containerText}>
                <div className={styles.headerInfo}>
                    <h1 className = {styles.headerInfo}>Estações Meteorológicas</h1>
                    <h2 className = {styles.headerInfo}>Porque são importantes?</h2>
                </div>

                <p className={styles.EstacaoInformativo1}>
                    Muito dos serviços oferecidos nessa plataforma dependem de variáveis que
                    somente podem ser coletadas com estações meteorológicas. Caso queira ter
                    acesso a tudo, será necessário ter ao menos uma por lavoura!<br /><br />Os
                    serviços que estarão disponíveis são:
                </p>

                <ul className={styles.EstacaoInformativoLista}>
                    <li>Monitoramento dos dias necessários de irrigação - Umidade do Ar e do Solo</li>
                    <li>Recomendação Otimizada de Fertilizantes e Culturas - Temperatura, Umidade do Ar e do Solo</li>
                    <li>Previsão de Colheita - Temperatura e Volume de Chuva</li>
                </ul>
                    
                <p className={styles.EstacaoInformativo}>Aprenda mais na <span style={{ fontFamily: 'Cardo'}}>AgroAcademy</span>!</p>

                <button className={styles.buttonEstacaoInfo} onClick={handleChangePage}>Entendi o porquê estações são importantes. Quero uma!</button>
            </div>

            <img src="/imagemEstacao.png" alt="imagem estação" className={styles.estacaoImagem}/>
        </div>
        
    </>
  )
}

export default EstacaoInformativo