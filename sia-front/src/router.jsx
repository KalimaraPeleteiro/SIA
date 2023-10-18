import { Route, Routes} from "react-router-dom";
import  Dashboard  from "./pages/Dashboard/Dashboard"
import DeafultLaout from "./layouts/DeafultLayout";
import Relatorio from "./pages/RelatorioDashboard/Relatorio";



const router = () => {
  return (
     <Routes >
      <Route path="/" element={<DeafultLaout />}>
         <Route index element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
      </Route>
         <Route path="/relatorio" element={<Relatorio />} />

     </Routes>
  )
}

export default router