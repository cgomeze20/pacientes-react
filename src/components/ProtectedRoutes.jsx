import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoutes = ({ login, children, redirectTo='/' }) => {


 if( !login ){
    return <Navigate to={ redirectTo }/>
 }

 return children ? children :  <Outlet/>

}
