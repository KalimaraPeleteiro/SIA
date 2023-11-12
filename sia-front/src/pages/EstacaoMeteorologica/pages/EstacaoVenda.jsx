import Header from "../../../components/Header"
import styles from "./EstacaoVenda.module.css"
import senseImage from "../images/sense.png"
import duoImage from "../images/duo.png"
import aquaImage from "../images/aqua.png"
import proImage from "../images/pro.png"


const EstacaoVenda = () => {
  return (
    <>
         <Header textHeader={"Ordene a compra e a instalação de produtos especializados para as suas necessidades agrícolas."} />

         <h1 className={styles.h1main}>Nossos Produtos</h1>

        <div className={styles.containerProdutos}>
          <div className={styles.itemContainer}>
            <div className={styles.item}>
              <h2 className={styles.headerItem}>Sense</h2>
              <p className={styles.itemText}>Nosso modelo mais básico, capaz de coletar dados referentes a umidade do solo e ar.</p>
              <img src={senseImage}/>
              <button className={styles.buttonItem}>Comprar - R$ 120</button>
            </div>
            <div className={styles.item}>
              <h2 className={styles.headerItem}>Duo</h2>
              <p className={styles.itemText}>Uma evolução do outro modelo, capaz também de detectar a temperatura do ambiente..</p>
              <img src={duoImage}/>
              <button className={styles.buttonItem}>Comprar - R$ 200</button>
            </div>
            <div className={styles.item}>
              <h2 className={styles.headerItem}>Aqua</h2>
              <p className={styles.itemText}>Modelo capaz de colher informações de volume de chuva, além da temperatura.</p>
              <img src={aquaImage}/>
              <button className={styles.buttonItem}>Comprar - R$ 240</button>
            </div>
            <div className={styles.item}>
              <h2 className={styles.headerItem}>Pro</h2>
              <p className={styles.itemText}>O modelo supremo. Capaz de coletar informações sobre todos os aspectos agrícolas.</p>
              <img src={proImage}/>
              <button className={styles.buttonItem}>Comprar - R$ 500</button>
            </div>
          </div>

        </div>
    </>
  )
}

export default EstacaoVenda