import Header from "../../../components/Header"
import styles from "./NovaAnalise.module.css"
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';


const NovaAnalise = () => {

    const { analiseType } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    
    
  return (
    <>
        <Header textHeader={"Encomende avaliações especializada a respeito de seu terreno para o suporte agrícola."} />

        <h1 className={styles.h1Main}>Nova Análise</h1>

        <div className={styles.containerForm}>
            <header className={styles.headerForm}>
                <h2>Nova Análise {analiseType === "agua" ? "Água" : "Solo"}</h2>
            </header>

            <p className={styles.textDescriptionForm}>Antes de encomendar uma nova análise, insira aqui um nome personalizado, para que você possa identificar ela, além de uma recomendada de visita, caso tenha alguma preferência. Lembre-se: visitas somente serão possíveis a partir de 07 dias da encomenda!</p>

            <form onSubmit={handleSubmit} className={styles.formStyle}>
                <label className={styles.labelStyle}>
                    <input type="text" placeholder="Nome Personalizado" className={styles.inputStyle}/>
                </label>

                <label className={styles.labelStyle}>
                    <InputMask mask="99/99/9999" placeholder="dd/mm/yyyy" className={styles.inputStyle}>
                        {(inputProps) => <input {...inputProps} id="dataInput" />}
                    </InputMask>
                </label>
                
            </form>
                <button className={styles.buttonStyle}>Encomedar</button>
        </div>
    </>
  )
}

export default NovaAnalise