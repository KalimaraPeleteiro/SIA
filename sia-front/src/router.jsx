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




const router = () => {
  return (
     <Routes >
         <Route index element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/relatorio" element={<Relatorio />} />
         <Route path="/culturas" element={<MinhasCulturas />} />
         <Route path="/culturas/:cultureName" element={<Cultura />} />
         <Route path="/analises" element={<Analise />} />
         <Route path="/analises/:analiseId" element={<AnaliseIndividual />} />
         <Route path="/clima" element={<EstacaoMeteorologica />}/>
         <Route path="/clima/saibaMais" element={<EstacaoInformativo />}/>
         <Route path="/clima/vendaEstacoes" element={<EstacaoVenda />}/>
         <Route path="/clima/ativarEstacao" element={<EstacaoAtivar />}/>
         <Route path="/controlePestes" element={<AgroOne />}/>
         <Route path="/controlePestes/saibaMais" element={<DroneInformativo />}/>
         <Route path="/controlePestes/vendaDrone" element={<DroneVenda />}/>
         <Route path="/controlePestes/ativarDrone" element={<DroneAtivar />}/>
     </Routes>
  )
}

export default router