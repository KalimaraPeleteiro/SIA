import { useParams } from "react-router-dom"
import Header from "../../../components/Header"
import styles from "./NovaEstacao.module.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';


const NovaEstacao = () => {
    const {estacaoType} = useParams();
    const navigate = useNavigate();
    const [culturas, setCulturas] = useState([]);
    const [nomePersonalizado, setNomePersonalizado] = useState("");
    const [success, setSuccess] = useState(false);
    const [culturaLigada, setCulturaLigada] = useState("");

    const fetchCulturas = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/estacoes/lista/culturas/");
          return response.data;
        } catch (error) {
          console.error("Erro ao buscar as estações: " + error);
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
    let tipo;
    if (estacaoType === "Sense"){
        tipo = 1;
    } 
    if (estacaoType === "Duo"){
        tipo = 2;
    }
    if (estacaoType === "Aqua"){
        tipo = 3;
    }
    if (estacaoType === "Pro"){
        tipo = 4;
    }
    

    const data = {
        "nomePersonalizado": nomePersonalizado,
        "nomeCultura": culturaLigada,
        "tipoEstacao": tipo
    };

    console.log(data);
 
    try {
        const response = await axios.post("http://127.0.0.1:8000/estacoes/nova-estacao/", data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);
        if (response.status === 200) {
            toast.success('Estação adquirida! Detalhes enviados ao seu e-mail. Retornando a página de Estações...'), {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 5000
              }
            setSuccess(true);
        }
    } catch (error) {
        console.error("Erro ao enviar a requisição POST: " + error);
    }
  };

    const voltarPaginaEstacoes = () => {
        navigate('/clima')
      }

    useEffect(() => {
        if (success) {
        setTimeout(voltarPaginaEstacoes, 5000);
        }
    }, [success]);
 
    

  return (
    <>
        <ToastContainer/>
        
        <Header textHeader={"Ordene a compra e a instalação de produtos especializados para as suas necessidades agrícolas."} />

        <h1 className={styles.h1Main}>Nova Estação {estacaoType} </h1>

        <div className={styles.containerForm}>
            <header className={styles.headerForm}>
                <h2>Nova Estação {estacaoType} </h2>
            </header>

            <p className={styles.textDescriptionForm}>Antes de encomendar uma nova estação, sinalize um nome personalizado para identificação da mesma! Além disso, conecte-a a uma cultura existente!</p>

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

export default NovaEstacao