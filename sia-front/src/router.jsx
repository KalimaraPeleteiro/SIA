import { Route, Routes} from "react-router-dom";
import  Dashboard  from "./pages/Dashboard/Dashboard"
import Relatorio from "./pages/RelatorioDashboard/Relatorio";
import MinhasCulturas from "./pages/MinhasCulturas/MinhasCulturas";
import Cultura from "./pages/Cultura/Cultura";
import Analise from "./pages/Analise/Analise";
import AnaliseIndividual from "./pages/AnaliseIndividual/AnaliseIndividual";



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
     </Routes>
  )
}

export default router