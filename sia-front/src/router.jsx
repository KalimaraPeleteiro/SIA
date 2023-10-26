import { Route, Routes} from "react-router-dom";
import  Dashboard  from "./pages/Dashboard/Dashboard"
import Relatorio from "./pages/RelatorioDashboard/Relatorio";
import MinhasCulturas from "./pages/MinhasCulturas/MinhasCulturas";
import Cultura from "./pages/Cultura/Cultura";



const router = () => {
  return (
     <Routes >
         <Route index element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/relatorio" element={<Relatorio />} />
         <Route path="/culturas" element={<MinhasCulturas />} />
         <Route path="/culturas/:cultureName" element={<Cultura />} />
     </Routes>
  )
}

export default router