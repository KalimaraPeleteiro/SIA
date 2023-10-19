import { Route, Routes} from "react-router-dom";
import  Dashboard  from "./pages/Dashboard/Dashboard"
import Relatorio from "./pages/RelatorioDashboard/Relatorio";



const router = () => {
  return (
     <Routes >
         <Route index element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/relatorio" element={<Relatorio />} />

     </Routes>
  )
}

export default router