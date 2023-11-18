import Header from "../../../components/Header"
import styles from "./EstacaoAtivar.module.css"
import InputMask from 'react-input-mask';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';


const EstacaoAtivar = () => {
    const navigate = useNavigate();

    const voltarPaginaEstacoes = () => {
        navigate('/clima')
      }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const chave = document.getElementById('idAtivacao').value;

        const data = {
            "chave": chave
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/estacoes/ativar/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                toast.success('Estação ativada com sucesso!');
                setTimeout(voltarPaginaEstacoes, 3000);
            } else {
                toast.error('Falha ao ativar a estação. Tente novamente.');
            }
        } catch (error) {
            toast.error('Erro ao ativar a estação. Tente novamente.');
        }
    
        }
    

  return (
    <>
        <ToastContainer/>
        <Header textHeader={"Ordene a compra e a instalação de produtos especializados para as suas necessidades agrícolas."} />

        <h1 className={styles.h1Main}>Ativar Estação</h1>

        <div className={styles.containerForm}>
            <header className={styles.headerForm}>
                <h2>Ativar Estaçao</h2>
            </header>

            <p className={styles.textDescriptionForm}>Insira aqui a chave de acesso entregue durante o processo de instalação. Associe também a estação a uma cultura já criada, para iniciarmos a coleta dos dados!</p>

            <form className={styles.formStyle}>
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

export default EstacaoAtivar