import Header from "../../components/Header"
import styles from "./MinhasCulturas.module.css"
import CultureList from "./components/CultureList"
import CultureModal from "./components/CultureModal";
import buttonImage from "./images/Vector.svg"
import{ useState } from 'react';

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
              produtoIndicado={cultura.produtoIndicado}
              analiseState={cultura.analiseState}
              colheitaEsperadaState={cultura.colheitaEsperadaState}
              dataCriacao={cultura.dataCriacao}
            />
          )
        ) : (
          <div className={styles.emptyList}>
          </div>
        )}
      </div>
      
      <CultureList 
        nomeCultura={"Milho"}
        produtoIndicado={"Milho"}
        analiseState={"concluida"}
        colheitaEsperadaState={"560kg"}
        dataCriacao={"dd/mm/aaaa"}
      />

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