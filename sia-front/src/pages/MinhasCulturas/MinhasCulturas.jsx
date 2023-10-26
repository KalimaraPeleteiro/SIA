import Header from "../../components/Header"
import styles from "./MinhasCulturas.module.css"
import CultureList from "./components/CultureList"
import CultureModal from "./components/CultureModal";
import buttonImage from "./images/Vector.svg"
import{ useState, useEffect } from 'react';
import axios from "axios";


const MinhasCulturas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [culturesList, setCulturesList] = useState([]);



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewCulture = (nomePersonalizado, produtoIndicado, analiseState, colheitaEsperadaState) => {
    const newCulture = {
      type: "new",
      nomeCultura: nomePersonalizado,
      produtoIndicado,
      analiseState,
      colheitaEsperadaState,
      dataCriacao: new Date().toLocaleDateString(),
    };
    setCulturesList([...culturesList, newCulture]);
  };

  const handleExistingCulture = (nomePersonalizado, dataCriacao) => {
    const newCulture = {
      type: "existing",
      nomeCultura: nomePersonalizado,
      dataCriacao: dataCriacao,
    };

    console.log("Definindo dataCriacao:", dataCriacao)
    setCulturesList([...culturesList, newCulture]);
  }

  const fetchCulturas = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/culturas/lista/");
      setCulturesList(response.data.culturas);
      console.log("Dados da API:", response.data);
    } catch (error) {
      console.error("Erro ao buscar as culturas:", error);
    }
  };

  useEffect(() => {
    fetchCulturas(); // Chamando a função quando o componente for montado
  }, []);
  
  


  return (
    <>
      <Header textHeader={"Registre e acompanhe o crescimento de suas lavrouras."} />
      <h1 className={styles.tituloCulturas}>Lista de Culturas</h1>
      
      <div>
        {culturesList.length ? (
          culturesList.map((cultura, index) => 
            <CultureList 
               key={`${cultura.nomeCultura}-${index}`}  
              nomeCultura={cultura.nomeCultura}
              produtoIndicado={cultura.produtoCultura}
              analiseState={
                cultura.analisePrevia && cultura.estagioAnalise  === 4
                  ? "A Análise foi encomendada e concluída."
                  : cultura.analisePrevia
                    ? "A Análise foi encomendada e está em processo."
                    : "A Cultura não teve análise prévia."
              }
              colheitaEsperadaState={cultura.colheitaEsperadaState}
              dataCriacao={cultura.dataCriacao}
            />
          )
        ) : (
          <div className={styles.emptyList}>
          </div>
        )}
      </div>

      <button className={styles.buttonAdicionarCultura} onClick={openModal}>
        Adicionar Cultura
        <img src={buttonImage} />
      </button>

      <CultureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onNewCulture={handleNewCulture}
        onExistingCulture={handleExistingCulture}
      />
      
    </>
  )
}

export default MinhasCulturas