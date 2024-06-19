import * as React from 'react'
import {Navigate,Outlet ,useLocation} from "react-router-dom"

interface ProtectedRoutesProps{

}
const ProtectedRoutes :React.FunctionComponent<ProtectedRoutesProps>=(props)=>{
    const isAuth:boolean=true;
    const location =useLocation;

    return isAuth ?(<Outlet />):(
    <Navigate to="/login" state={{from:location }} />
    )
}

export default ProtectedRoutes