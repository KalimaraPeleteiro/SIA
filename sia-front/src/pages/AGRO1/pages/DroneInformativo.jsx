import { useNavigate } from "react-router-dom"
import Header from "../../../components/Header"
import styles from "./DroneInformativo.module.css"

const DroneInformativo = () => {
    const navigate = useNavigate()
    const handleChangePage = () => {
        navigate('/controlePestes/vendaDrone')
    }



  return (
    <>
        <Header textHeader={"Livre-se dos miseráveis que comprometem a sua lavroura."} />

        <div className={styles.containerEstacaoInformativo}>

            <div className={styles.containerText}>
                <div className={styles.headerInfo}>
                    <h1>AGRO-1</h1>
                    <h2>O primeiro drone agrário da AgroConnect</h2>
                </div>

                <p className={styles.EstacaoInformativo1}>
                    Atualmente, a perda estimada por pragas em lavouras no país é, em média,
                    7.7%. Frustrado de ter que ceder parte de seu trabalho e lucro para insetos
                    e pestes? Em busca de uma solução efetiva, fácil e de baixo custo?<br /><br />É
                    aí que o AGRO-1 (Aeronave Geral de Reconhecimento e Observação) entra.<br /><br />Equipado
                    com sensores de identificação e algoritmos de visão computacional, o AGRO-1
                    é conectado a um banco de dados com inúmeras pragas e pestes que podem ser
                    identificadas e notificadas ao produtor. Com ele, você terá o controle total
                    de sua lavoura, e não ficará a mercê desses incômodos.<br /><br />Além
                    disso, o uso do AGRO-1 permite a previsão e sugestão otimizada do uso
                    correto de pesticidas em sua lavoura.<br /><br />
                </p>
                    
                <p>Aprenda mais na <span style={{ fontFamily: 'Cardo'}}>AgroAcademy</span>!</p>

                <button className={styles.buttonEstacaoInfo} onClick={handleChangePage}>Entendi o quão incrível o AGRO-1 é. Quero um!</button>
            </div>

            <img src="/imagemDrone.png" alt="imagem drone" className={styles.estacaoImagem}/>
        </div>
        
    </>
  )
}

export default DroneInformativo