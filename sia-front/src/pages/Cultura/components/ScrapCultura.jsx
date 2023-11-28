/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styles from './ScrapCultura.module.css';
import axios from "axios";
import imgTobacco from './images/imagesScrap/tobacco.gif';
import imgPotato from './images/imagesScrap/potato.gif';
import imgBanana from './images/imagesScrap/banana.gif';
import imgWheat from './images/imagesScrap/wheat.gif';
import imgSoybean from './images/imagesScrap/soybean.gif';
import imgSugarCane from './images/imagesScrap/sugarcane.gif';
import imgPineapple from './images/imagesScrap/pineapple.gif';
import imgCotton from './images/imagesScrap/cotton.gif';
import imgSorghum from './images/imagesScrap/sorghum.jpg';
import imgMaize from './images/imagesScrap/maize.gif';


const ScrapCultura = ({nameCultura}) => {
  const [scrapedText, setScrapedText] = useState({
    description_cultura: [],
    img_url: ''
  });

 let imgSrc;

 switch (nameCultura) {
  case 'tobacco':
    imgSrc = imgTobacco;
    break;
  case 'potato':
    imgSrc = imgPotato;
    break;
  case 'banana': 
    imgSrc = imgBanana;
    break;
  case 'wheat':
    imgSrc = imgWheat;
    break;
  case 'soybean':
    imgSrc = imgSoybean;
    break;
  case 'sugarcane':
    imgSrc = imgSugarCane;
    break;
  case 'pineapple':
    imgSrc = imgPineapple;
    break;
  case 'cotton':
    imgSrc = imgCotton;
    break;
  case 'sorghum':
    imgSrc = imgSorghum;
    break;
  case 'maize':
    imgSrc = imgMaize;
    break;
  default:
    imgSrc = '';
    break;
 }


 
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

            <img src={imgSrc} alt="Imagem" className={styles.scrapedImage} />
        </div>

    </>
  )
}

export default ScrapCultura