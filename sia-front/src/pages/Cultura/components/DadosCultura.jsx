import styles from './DadosCultura.module.css';
import exemploTemperatura from './images/exemploTemperatura.png';
import exemploUmidadeAr from './images/exemploUmidadeAr.png';
import exemploUmidadeSolo from './images/exemploUmidadeSolo.png';
import exemploVolumeChuva from './images/exemploVolumeChuva.png';
import joinha from './images/joinha.png'
import nao from './images/nao.png';


const DadosCultura = () => {
  return (
    <>
        <div className={styles.containerDados}>
            <div  className={styles.containerDadosEstacao}>
                <h2>Dados Meteorológicos</h2>
                <img src={exemploTemperatura} />
                <img src={exemploUmidadeAr} />
                <img src={exemploUmidadeSolo} />
                <img src={exemploVolumeChuva} />
            </div>

            <div className={styles.containerDadosColheita}>
                <h2>Colheita</h2>
                <div className={styles.infoColheita}>
                    <div className={styles.infoColheitaNumero}>65 kg/ha</div>
                    <p className={styles.infoColheitaTexto}>É o valor previsto para colheita com os dados coletados até então. Naturalmente, conforme o tempo avança e novos dados são entregues, mais perfeita será a previsão.De qualquer forma, considere planejar-se de acordo com o número fornecido. Caso queira encontrar possíveis compradores, considere a <span className={styles.agroAccordFont}>AgroAccord</span></p>
                </div>
            </div>

            <div className={styles.containerAtividadesDiarias}>
                <h2>Atividades Diárias</h2>
                <div className={styles.containerAtividasDiariasText}>
                    <div className={styles.atividadeItem}>
                        <img src={nao} alt="Não recomendado" />
                        <p>Hoje não é um dia recomendado para irrigação.</p>
                    </div>
                    <div className={styles.atividadeItem}>
                        <img src={joinha} alt="Recomendado" />
                        <p>Hoje é um bom dia para aplicar pesticidas!</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DadosCultura