import { useParams } from "react-router-dom"
import Header from "../../../components/Header"
import styles from "./NovaEstacao.module.css"

const NovaEstacao = () => {
    const {estacaoType} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    

  return (
    <>
        <Header textHeader={"Ordene a compra e a instalação de produtos especializados para as suas necessidades agrícolas."} />

        <h1 className={styles.h1Main}>Nova Estação {estacaoType} </h1>

        <div className={styles.containerForm}>
            <header className={styles.headerForm}>
                <h2>Nova Estação {estacaoType} </h2>
            </header>

            <p className={styles.textDescriptionForm}>Antes de encomendar uma nova estação, sinalize um nome personalizado para identificação da mesma!</p>

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

export default NovaEstacao