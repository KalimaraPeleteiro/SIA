import Header from "../../../components/Header"
import styles from "./NovaAnalise.module.css"
import InputMask from 'react-input-mask';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";




const NovaAnalise = () => {

    const navigate = useNavigate();
    const { analiseType } = useParams();
    const [nomePersonalizado, setNomePersonalizado] = useState("");

    const handleInputChange = (e) => {
        setNomePersonalizado(e.target.value);
       };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let tipo;
        if (analiseType === "agua") {
            tipo = 1;
        } else if (analiseType === "solo") {
            tipo = 2;
        }
        const data = {
            "nomePersonalizado": nomePersonalizado,
            "tipo": tipo,
            "dataVisita": null
          };
        try {
            console.log(data)
            const response = await axios.post('http://127.0.0.1:8000/analise/nova-analise/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Erro ao enviar a requisição:', error);
        }
        finally{
            navigate("/analises/")
        }
    }
    
    
  return (
    <>
        <Header textHeader={"Encomende avaliações especializada a respeito de seu terreno para o suporte agrícola."} />

        <h1 className={styles.h1Main}>Nova Análise</h1>

        <div className={styles.containerForm}>
            <header className={styles.headerForm}>
                <h2>Nova Análise {analiseType === "agua" ? "Água" : "Solo"}</h2>
            </header>

            <p className={styles.textDescriptionForm}>Antes de encomendar uma nova análise, insira aqui um nome personalizado, para que você possa identificar ela, além de uma data recomendada de visita, caso tenha alguma preferência. Lembre-se: visitas somente serão possíveis a partir de 07 dias da encomenda!</p>

            <form onSubmit={handleSubmit} className={styles.formStyle}>
                <label className={styles.labelStyle}>
                    <input type="text" placeholder="Nome Personalizado" className={styles.inputStyle} onChange={handleInputChange}/>
                </label>

                <label className={styles.labelStyle}>
                    <InputMask mask="99/99/9999" placeholder="dd/mm/yyyy" className={styles.inputStyle}>
                        {(inputProps) => <input {...inputProps} id="dataInput" />}
                    </InputMask>
                </label>
                
            </form>
                <button className={styles.buttonStyle} onClick={handleSubmit}>Encomendar</button>
        </div>
    </>
  )
}

export default NovaAnalise