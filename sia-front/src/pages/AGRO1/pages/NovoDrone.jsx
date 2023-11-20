import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../../../components/Header"
import styles from "./NovoDrone.module.css"
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";



const NovoDrone = () => {
    const [culturas, setCulturas] = useState([]);
    const { droneorHouse } = useParams();
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [nomePersonalizado, setNomePersonalizado] = useState("");
    const [culturaLigada, setCulturaLigada] = useState("");

    const fetchCulturas = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/pestes/lista/culturas/");
          return response.data;
        } catch (error) {
          console.error("Erro ao buscar as pestes: " + error);
          return [];
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          const data = await fetchCulturas();
          setCulturas(data.Culturas || []);
          if (data.Culturas && data.Culturas.length === 1) {
            setCulturaLigada(data.Culturas[0].nomePersonalizado)
          }
        };
    
        fetchData();
      }, []);
    

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            "nomePersonalizado": nomePersonalizado,
            "nomeCultura": culturaLigada,
        };
    
        console.log(data);
     
        try {
            const response = await axios.post("http://127.0.0.1:8000/pestes/novo-drone/", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            if (response.status === 200) {
                toast.success('Drone adquirido! Detalhes enviados ao seu e-mail. Retornando a página de Controle de Pestes...'), {
                    position: toast.POSITION.TOP_LEFT,
                    autoClose: 5000
                  }
                setSuccess(true);
            }
        } catch (error) {
            console.error("Erro ao enviar a requisição POST: " + error);
        }
      };

    const voltaPaginaPestes = () => {
        navigate('/controlePestes')
      }

    useEffect(() => {
        if (success) {
        setTimeout(voltaPaginaPestes, 5000);
        }
    }, [success]);
    
    
  return (
    <>
        <ToastContainer/>

        <Header textHeader={"Livre-se dos miseráveis que comprometem a sua lavroura."} />

        <h1 className={styles.h1Main}>Novo {droneorHouse === "agro1" ? "AGRO-1" : "Agro House"}</h1>

        <div className={styles.containerForm}>
            <header className={styles.headerForm}>
                <h2>Novo  {droneorHouse === "agro1" ? "AGRO-1" : "Agro House"}</h2>
            </header>

            <p className={styles.textDescriptionForm}>Antes de encomendar um novo drone, sinalize um nome personalizado para o mesmo!</p>

            <form onSubmit={handleSubmit} className={styles.formStyle}>
                <label className={styles.labelStyle}>
                    <input type="text" placeholder="Nome Personalizado" className={styles.inputStyle} onChange={(e) => setNomePersonalizado(e.target.value)}/>
                </label>

                <label className={styles.labelStyle}>
                    <select name="culturaEstacao" className={styles.inputStyle} onChange={(e) => setCulturaLigada(e.target.value)}>
                        {
                            culturas.map(cultura => (
                            <option key={cultura.nomePersonalizado} value={cultura.nomePersonalizado}>{cultura.nomePersonalizado}</option>
                            ))
                        }
                    </select>
                </label>
                
            </form>
                <button className={styles.buttonStyle} onClick={handleSubmit}>Encomendar</button>
        </div>
    </>
  )
}

export default NovoDrone