

import Header from "../../../components/Header"
import styles from "./NovoDrone.module.css"
import { useParams } from 'react-router-dom';


const NovoDrone = () => {

    const { droneorHouse } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    
    
  return (
    <>
        <Header textHeader={"Livre-se dos miseráveis que comprometem a sua lavroura."} />

        <h1 className={styles.h1Main}>Novo {droneorHouse === "agro1" ? "AGRO-1" : "Agro House"}</h1>

        <div className={styles.containerForm}>
            <header className={styles.headerForm}>
                <h2>Novo  {droneorHouse === "agro1" ? "AGRO-1" : "Agro House"}</h2>
            </header>

            <p className={styles.textDescriptionForm}>Antes de encomendar um novo drone, sinalize um nome personalizado para o mesmo!</p>

            <form onSubmit={handleSubmit} className={styles.formStyle}>
                <label className={styles.labelStyle}>
                    <input type="text" placeholder="Nome Personalizado" className={styles.inputStyle}/>
                </label>
                
            </form>
                <button className={styles.buttonStyle}>Encomedar</button>
        </div>
    </>
  )
}

export default NovoDrone