import Header from "../../../components/Header"
import styles from "./DroneVenda.module.css"
import agro1 from "../images/agro1.png"
import agroHouse from "../images/agroHouse.png"


const DroneVenda = () => {
  return (
    <>
         <Header textHeader={"Livre-se dos miseráveis que comprometem a sua lavroura."} />

         <h1 className={styles.h1main}>Nossos Produtos</h1>

        <div className={styles.containerProdutos}>
          <div className={styles.itemContainer}>
            <div className={styles.item}>
              <h2 className={styles.headerItem}>AGRO-1</h2>
              <p className={styles.itemText}>Nosso drone especializado de identificação de pragas.</p>
              <img src={agro1}/>
              <button className={styles.buttonItem}>Comprar - R$1000</button>
            </div>
            <div className={styles.item}>
              <h2 className={styles.headerItem}>Agro House</h2>
              <p className={styles.itemText}>O local de armazenamento dos drones. Todo dia de manhã, eles automaticamente saem de forma coordenada para análise.</p>
              <img src={agroHouse} className={styles.imageDrone}/>
              <button className={styles.buttonItem}>Comprar - R$ 20000</button>
            </div>
          </div>

        </div>
    </>
  )
}

export default DroneVenda