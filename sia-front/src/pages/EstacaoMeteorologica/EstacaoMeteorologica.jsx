import Header from "../../components/Header"
import styles from "./EstacaoMeteorologica.module.css"
import vendaEstacao from "./images/vendaEstacao.png";
import sicronizarEstacao from "./images/sicronizarEstacao.png";
import saibaMais from "./images/saibaMais.png";
import EstacoesComponent from "./components/EstacoesComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const EstacaoMeteorologica = () => {
  const navigate = useNavigate();
  const [estacoes, setEstacoes] = useState([]);

  const fetchEstacoes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/estacoes/lista/");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as estações: " + error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEstacoes();
      setEstacoes(data.Estacoes || []);
    };

    fetchData();
  }, []);

  console.log(estacoes);

  const handleChangePageSaibaMais = () => {
    window.open(`/clima/saibaMais`, '_blank');
  }

  const handleChangePageVenda = () => {
    navigate('/clima/vendaEstacoes')
  }


  const handleChangePageAtivacao = () => {
    navigate(`/clima/ativarEstacao`)
  }
  

  return (
    <>
        <Header textHeader={"Ordene a compra e a instalação de produtos especializados para as suas necessidades agrícolas."} />

        <div className={styles.estacaoContainer}>
            <div className={styles.estacaoBox}>
                <header className={styles.headerEstacaoBox}>
                    <img src={vendaEstacao}/>
                    <h1 className={styles.fontHeader}>Venda de estação</h1>
                </header>

                <p className={styles.textEstacaoBox}>Conheça os nossos modelos especializados disponíveis e prontos para compra e instalação.</p>

                <button className={styles.buttonEstacaoBox} onClick={handleChangePageVenda}>Ordenar Instalação</button>
            </div>
            <div className={styles.estacaoBox}>
                <header className={styles.headerEstacaoBox}>
                    <img src={sicronizarEstacao}/>
                    <h1 className={styles.fontHeader}>Sicronizar sua Estação</h1>
                </header>

                <p className={styles.textEstacaoBox}>
                    Comprou uma estação e a instalação foi concluída? Envie-nos a chave particular de seu produto para que possamos ativá-lo.
                </p>


                <button className={styles.buttonEstacaoBox} onClick={handleChangePageAtivacao}>Ativar Estação</button>
            </div>
            <div className={styles.estacaoBox}>
                <header className={styles.headerEstacaoBox}>
                    <img src={saibaMais}/>
                    <h1 className={styles.fontHeader}>Saiba Mais!</h1>
                </header>

                <p className={styles.textEstacaoBox}>Não entende o porquê ter uma estação meteorológica? Deixe que nós te explicamos!</p>

                <button className={styles.buttonEstacaoBox} onClick={handleChangePageSaibaMais} >Conhecer</button>
            </div>
        </div>

        <div className={styles.estacoesEncomendadasContainer}>
            <h2 className={styles.fontHeader}>Lista de Estações</h2>
            
            <div>
                {estacoes.length ? (
                    estacoes.map(estacao => <EstacoesComponent key={estacao.nomePersonalizado}  nome = {estacao.nomePersonalizado} cultureName={estacao.cultura} ativo = {estacao.ativo}/>)
                ) : 
                (
                    <div className={styles.emptyList}>
                        <p>Você ainda não encomendou nenhuma estação.</p>
                    </div>
                )
                }
            </div>
        </div>
    </>
  )
}

export default EstacaoMeteorologica