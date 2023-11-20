import Header from "../../../components/Header"
import styles from "./DroneAtivar.module.css"
import InputMask from 'react-input-mask';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';


const DroneAtivar = () => {
    const navigate = useNavigate();

    const voltarPaginaPestes = () => {
        navigate('/controlePestes')
      }

      const handleSubmit = async (e) => {
        e.preventDefault();

        const chave = document.getElementById('idAtivacao').value;

        const data = {
            "chave": chave
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/pestes/ativar/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                toast.success('Drone ativado com sucesso!');
                setTimeout(voltarPaginaPestes, 3000);
            } else {
                toast.error('Falha ao ativar o drone. Tente novamente.');
            }
        } catch (error) {
            toast.error('Erro ao ativar o drone. Tente novamente.');
        }
    
        }

  return (
    <>
        <ToastContainer/>
        <Header textHeader={"Livre-se dos miseráveis que comprometem a sua lavroura."} />

        <h1 className={styles.h1Main}>Ativar Drone</h1>

        <div className={styles.containerForm}>
            <header className={styles.headerForm}>
                <h2>Ativar Drone</h2>
            </header>

            <p className={styles.textDescriptionForm}>Insira aqui a chave de acesso entregue durante o processo de instalação. Associe também a estação a uma cultura já criada, para iniciarmos a coleta dos dados!</p>

            <form onSubmit={handleSubmit} className={styles.formStyle}>
                <label className={styles.labelStyle}>
                    <InputMask  placeholder="XXXXXXXXXXX">
                        {(inputProps) => <input {...inputProps} id="idAtivacao" className={styles.inputStyle}/>}
                    </InputMask>
                </label>
            </form>
                <button className={styles.buttonStyle} onClick={handleSubmit}>ATIVAR</button>
        </div>

    </>
  )
}

export default DroneAtivar