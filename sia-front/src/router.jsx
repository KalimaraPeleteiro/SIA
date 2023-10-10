import { Route, Routes} from "react-router-dom";
import  Dashboard  from "./pages/Dashboard/Dashboard"
import DeafultLaout from "./layouts/DeafultLayout";



const router = () => {
  return (
     <Routes >
      <Route path="/" element={<DeafultLaout />}>
         <Route index element={<Dashboard />} />
         <Route path="/dashboard" element={<Dashboard />} />
      </Route>


     </Routes>
  )
}

export default router