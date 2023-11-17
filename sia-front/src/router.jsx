import { Route, Routes} from "react-router-dom";
import  Dashboard  from "./pages/Dashboard/Dashboard"
import Relatorio from "./pages/RelatorioDashboard/Relatorio";
import MinhasCulturas from "./pages/MinhasCulturas/MinhasCulturas";
import Cultura from "./pages/Cultura/Cultura";
import Analise from "./pages/Analise/Analise";
import AnaliseIndividual from "./pages/AnaliseIndividual/AnaliseIndividual";
import EstacaoMeteorologica from "./pages/EstacaoMeteorologica/EstacaoMeteorologica";
import EstacaoInformativo from "./pages/EstacaoMeteorologica/pages/EstacaoInformativo";
import EstacaoVenda from "./pages/EstacaoMeteorologica/pages/EstacaoVenda";
import EstacaoAtivar from "./pages/EstacaoMeteorologica/pages/EstacaoAtivar";
import AgroOne from "./pages/AGRO1/AgroOne";
import DroneInformativo from "./pages/AGRO1/pages/DroneInformativo";
import DroneVenda from "./pages/AGRO1/pages/DroneVenda";
import DroneAtivar from "./pages/AGRO1/pages/DroneAtivar";
import HistoricoAnalise from "./pages/Analise/pages/HistoricoAnalise";
import NovaAnalise from "./pages/Analise/pages/NovaAnalise";
import NovoDrone from "./pages/AGRO1/pages/NovoDrone";
import NovaEstacao from "./pages/EstacaoMeteorologica/pages/NovaEstacao";




const router = () => {
  return (
     <Routes >
         <Route index element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/relatorio" element={<Relatorio />} />
         <Route path="/culturas" element={<MinhasCulturas />} />
         <Route path="/culturas/:cultureName" element={<Cultura />} />
         <Route path="/analises" element={<Analise />} />
         <Route path="/analises/historico" element={<HistoricoAnalise />} />
         <Route path="/analises/encomedarAnalise/:analiseType" element={<NovaAnalise />} />
         <Route path="/analises/:analiseId" element={<AnaliseIndividual />} />
         <Route path="/clima" element={<EstacaoMeteorologica />}/>
         <Route path="/clima/saibaMais" element={<EstacaoInformativo />}/>
         <Route path="/clima/vendaEstacoes" element={<EstacaoVenda />}/>
         <Route path="/clima/vendaEstacoes/:estacaoType" element={<NovaEstacao />}/>
         <Route path="/clima/ativarEstacao" element={<EstacaoAtivar />}/>
         <Route path="/controlePestes" element={<AgroOne />}/>
         <Route path="/controlePestes/saibaMais" element={<DroneInformativo />}/>
         <Route path="/controlePestes/vendaDrone" element={<DroneVenda />}/>
         <Route path="/controlePestes/ativarDrone" element={<DroneAtivar />}/>
         <Route path="/controlePestes/vendaDrone/:droneorHouse" element={<NovoDrone />}/>

     </Routes>
  )
}

export default router