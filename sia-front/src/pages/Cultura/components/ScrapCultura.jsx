import { useState } from 'react';
import styles from './ScrapCultura.module.css';


/*
function useWebScraping(cultureName) {
    fetch(`/api/getCultureData?name=${cultureName}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error("Error fetching data:", error);
   
  return data;
}
*/

/*

  useEffect(() => {
    // Aqui você chamará a função/lógica de web scraping
    // E depois armazenaria o resultado em scrapedText
    const fetchData = async () => {
      let data = await useWebScraping(); // Exemplo
      setScrapedText(data);
    };

    fetchData();
  }, []);
*/



const ScrapCultura = () => {
const [scrapedText] = useState('');
 //const { cultureName } = useParams(); pegar o nome da cultura pelo parametreo



  return (
    <>
        <div className={styles.containerInfosScraping}>
            <div name="scrapedData" value={scrapedText} readOnly className={styles.pContainerInfosScraping}>
                <p>A soja (Glycine max) é uma das culturas mais importantes do mundo e é cultivada para obtenção de óleo e proteínas. A produção mundial atual é de cerca de 176,6 milhões de toneladas de feijão em 75,5 milhões de hectares. A cultura é efectuada principalmente em condições de sequeiro, mas a irrigação, especificamente a irrigação suplementar, é cada vez mais utilizada. (FAOSTAT, 2001).</p> 
                <p>A cultura é efectuada em condições quentes nos trópicos, subtrópicos e climas temperados. A soja é relativamente resistente a temperaturas baixas e muito altas, mas as taxas de crescimento diminuem acima de 35°C e abaixo de 18°C. Nalgumas variedades, a floração pode ser atrasada a temperaturas inferiores a 24°C. As temperaturas mínimas para o crescimento são cerca de 10°C e para a produção de culturas cerca de 15°C. Apenas 25 a 30 por cento das flores produzem vagens, dependendo o número final do vigor da planta durante o período de floração.</p> 
                <p>As variações de temperatura de ano para ano podem levar a diferenças na floração.A soja é basicamente uma planta de dias curtos, mas a resposta à duração do dia varia consoante a variedade e a temperatura, e as variedades desenvolvidas só estão adaptadas a diferenças de latitude bastante estreitas. A duração do dia tem influência na taxa de desenvolvimento da cultura; nos tipos de dias curtos, o aumento da duração do dia pode resultar no atraso da floração e em plantas mais altas com mais nós. Os dias curtos aceleram a floração, nomeadamente nas variedades de maturação tardia. O crescimento vegetativo cessa normalmente durante a formação do rendimento. A duração do período total de crescimento é de 100 a 130 dias ou mais. A soja é frequentemente cultivada como cultura de rotação em combinação com o algodão, o milho e o sorgo. O espaçamento entre linhas varia de 0,4 a 0,6 m, com 30 a 40 sementes por metro de linha.</p>
            </div>

            <img src="/exemploScrapingCultura.png" className={styles.scrapedImage}/>
        </div>

    </>
  )
}

export default ScrapCultura