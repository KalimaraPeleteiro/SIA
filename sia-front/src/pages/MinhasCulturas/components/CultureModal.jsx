/* eslint-disable react/prop-types */
import React from 'react';
import Modal from 'react-modal';
import styles from './CultureModal.module.css';
import InputMask from 'react-input-mask';
import{ useState, useEffect } from 'react';
import axios from "axios";


const ModalScreens = {
  CHOICE: 'choice',
  NEW_CULTURE: 'newCulture',
  EXISTING_CULTURE: 'existingCulture',
};


const CultureModal = ({ isOpen, onClose, onNewCulture, onExistingCulture }) => {

  const [culturas, setCulturas] = useState([]);
  
  const [setLoading] = useState(true);

  const [currentScreen, setCurrentScreen] = React.useState(ModalScreens.CHOICE);

  const handleChoice = (isNew) => {
    setCurrentScreen(isNew ? ModalScreens.NEW_CULTURE : ModalScreens.EXISTING_CULTURE);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      "nomeCultura": e.target.elements[0].value,
      "produto": e.target.elements[1].value
    }

    onNewCulture(data)

    try {
      const response = await axios.post('http://127.0.0.1:8000/culturas/nova-cultura/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        console.log('Solicitação POST bem-sucedida');
        window.location.reload();
      } else {
        console.error('Erro na solicitação POST');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação POST:', error);
    }

    /*
    const nomeCulturaInput = e.target.elements[0].value;
    console.log(e.target.elements[0].value);
    console.log(e.target.elements[1].value);
    onNewCulture(nomeCulturaInput);
    */
  }

  const handleSubmitExistingCulture = (e) => {
    e.preventDefault();
    const nomeCulturaInput = e.target.elements[0].value;
    const dataInicio = e.target.elements[2].value;
    onExistingCulture(nomeCulturaInput, dataInicio);
  }

    useEffect(() => {
      const fetchCulturas = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/culturas/lavouras/");
          setCulturas(response.data.lavouras);
          setLoading(true);
          console.log("Dados da API:", response.data);
        } catch (error) {
          console.error("Erro ao buscar as culturas:", error);
        }
      };
      setTimeout(() => {
        fetchCulturas();
      }, 1000);
    }, [setLoading]);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={onClose} className={styles.containerModal}>
        {currentScreen === ModalScreens.CHOICE && (
            <div className={styles.modalChoiceContainer}>
              <div className={styles.headerModalChoiceContainer}>
                  <h2 className={styles.titleModal}>Nova Cultura?</h2>
              </div>

                <div className={styles.textChoiceContainer}>
                  <p>Registre suas lavrouras para acompanhamento especializado.</p>
                  
                  <p>Antes de criar um novo registro, ou sequer planejar o plantio, considere encomendar uma análise do solo, 
                  para sugestões especializadas de cultura e fertilizantes para o seu terreno!
                  </p>
                </div>
              <div className={styles.buttonChoiceContainer}>
                <div className={styles.buttonsChoiceStyle}>
                  <button onClick={() => handleChoice(true)}>Nova Cultura</button>
                  <button onClick={() => handleChoice(false)}>Cultura Existente</button>
                </div>
              </div>
            </div>
        )}

        {currentScreen === ModalScreens.NEW_CULTURE && (
          <div className={styles.modalNovaCulturaContainer}>
            <div className={styles.headerModalCulturaContainer}>
              <h1 className={styles.titleModalCultura}>Registrar Nova Cultura</h1>
            </div>

          <div className={styles.formTitle}>
            <div className={styles.container1}>
              <span className={styles.spanFormTitle}>1</span>
              <h2 className={styles.spanFormTitleText}>Nome Personalizado</h2>
            </div>
            <div className={styles.container2}>
              <span className={styles.spanFormTitle}>2</span>
              <h2 className={styles.spanFormTitleText}>Produto a ser Cultivado</h2>
            </div>
          </div> 

        
            <form onSubmit={handleSubmit} className={styles.formStyleNovaCultura}>
              <div className={styles.labelContainerNovaCultura}>
                <label>
                  <input type="text" placeholder="Nome da cultura" className={styles.inputCultura} />
                </label>
                <label>
                  <select name="produtoASerCultivado" className={styles.inputCultura}>
                      {
                      culturas.map(cultura => (
                        <option key={cultura.id} value={cultura.id}>{cultura.Produto}</option>
                      ))
                      }
                  </select>
                </label>
              </div>
              <div className={styles.buttonRegistrarCulturaNovaContainer}>
                <div className={styles.buttonRegistarCulturaNovaStyle}>
                  <button type="submit">Salvar</button>
                  <button onClick={() => setCurrentScreen(ModalScreens.CHOICE)}>Voltar</button>
                </div>
              </div>
            </form>
         </div>
        )}

        {currentScreen === ModalScreens.EXISTING_CULTURE && (
            <div>
              <div className={styles.headerModalCulturaContainer}>
                <h1 className={styles.titleModalCultura}>Registrar Cultura Existente</h1>
              </div>
              <div className={styles.formTitleExistingCulture}>
                <div className={styles.containerTitleExistingCulture}>
                  <span className={styles.spanFormTitleExistingCulture}>1</span>
                  <h2 className={styles.spanFormTitleTextExistingCulture}>Nome Personalizado</h2>
                </div>
                <div className={styles.containerTitleExistingCulture2}>
                  <span className={styles.spanFormTitleExistingCulture}>2</span>
                  <h2 className={styles.spanFormTitleTextExistingCulture}>Produto sendo Cultivado</h2>
                </div>
              </div> 

              <div className={styles.formTitleExistingCulture2}>
                <div className={styles.containerExistingCulture3}>
                  <span className={styles.spanFormTitleExistingCulture}>3</span>
                  <h2 className={styles.spanFormTitleTextExistingCulture}>Data de inicio</h2>
                </div>
              </div>

              <form onSubmit={handleSubmitExistingCulture} className={styles.formStyleExistingCultura}>
                <div className={styles.containerLabelExistingCulture}>
                  <label className={styles.labelNomeCulturaExistingCulture}>
                      <input type="text" placeholder="Nome da cultura" className={styles.inputCulturaExistingCultura} />
                  </label>

                  <label className={styles.labelProdutoCultivadoExistingCulture}>
                      <input type="text" placeholder="Produto cultivado" className={styles.inputCulturaExistingCultura} />
                  </label>

                </div>

                <label className={styles.labelDataExistingCulture}>
                  <InputMask mask="99/99/9999" placeholder="dd/mm/yyyy">
                        {(inputProps) => <input {...inputProps} id="dataInput" />}
                  </InputMask>
                </label>


                <div className={styles.buttonRegistrarCulturaExistingCulture}>
                  <div className={styles.buttonRegistarCulturaExistingCultureStyle}>
                    <button type="submit">Salvar</button>
                    <button onClick={() => setCurrentScreen(ModalScreens.CHOICE)}>Voltar</button>
                  </div>
                </div>

              </form> 

            </div>
          )}
      </Modal>
    </>
  )
}

export default CultureModal