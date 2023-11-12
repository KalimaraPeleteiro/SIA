import { useState } from "react";
import Header from "../../../components/Header"
import styles from "./EstacaoAtivar.module.css"
import InputMask from 'react-input-mask';


const EstacaoAtivar = () => {
    const [culturas] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    

  return (
    <>
        <Header textHeader={"Ordene a compra e a instalação de produtos especializados para as suas necessidades agrícolas."} />

        <h1 className={styles.h1Main}>Ativar Estação</h1>

        <div className={styles.containerForm}>
            <header className={styles.headerForm}>
                <h2>Ativar Estaçao</h2>
            </header>

            <p className={styles.textDescriptionForm}>Insira aqui a chave de acesso entregue durante o processo de instalação. Associe também a estação a uma cultura já criada, para iniciarmos a coleta dos dados!</p>

            <form onSubmit={handleSubmit} className={styles.formStyle}>
                <label className={styles.labelStyle}>
                    <InputMask  placeholder="XX-XXXXX_XXXX">
                        {(inputProps) => <input {...inputProps} id="idAtivacao" className={styles.inputStyle}/>}
                    </InputMask>
                </label>

                <label className={styles.labelStyle}>
                    <select name="culturaEstacao" className={styles.inputStyle}>
                        {
                            culturas.map(cultura => (
                            <option key={cultura.id} value={cultura.id}>{cultura.Produto}</option>
                            ))
                        }
                    </select>
                </label>
                
            </form>
                <button className={styles.buttonStyle}>ATIVAR</button>
        </div>

    </>
  )
}

export default EstacaoAtivar