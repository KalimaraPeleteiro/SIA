/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styles from './ScrapCultura.module.css';
import axios from "axios";




const ScrapCultura = ({nameCultura}) => {
  const [scrapedText, setScrapedText] = useState({
    description_cultura: [],
    img_url: ''
  });

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/cultura_especifica/scraping/${nameCultura}`);
        setScrapedText(response.data);
        console.log("Dados da API:", response.data)
      } catch (error) {
        console.error("Erro ao buscar os dados da dashboard:", error);
      }
    };
  
    fetchData();
  }, [nameCultura]);
  

  return (
    <>
        <div className={styles.containerInfosScraping}>
            <div name="scrapedData" value={scrapedText} readOnly className={styles.pContainerInfosScraping}>
                {Array.isArray(scrapedText.description_cultura) && scrapedText.description_cultura.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <img src={scrapedText.img_url} alt="Imagem" className={styles.scrapedImage} />
        </div>

    </>
  )
}

export default ScrapCultura