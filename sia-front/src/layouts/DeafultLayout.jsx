import { Outlet } from "react-router-dom"
import Header from "../components/Header"





const DeafultLaout = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default DeafultLaout