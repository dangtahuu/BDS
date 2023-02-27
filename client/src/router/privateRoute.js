import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const PrivateRoute = ({ element, roles }) => {
  const { isAuth, currentRole } = useSelector(state => state.auth);
  //kiem tra quyen truy cap trang cua nguoi dung
  const checkRoleAccess = () => {
    return roles.find(role => role === currentRole);
  }


  if (isAuth && checkRoleAccess()) {

    return element
  } else {

    return <Navigate to="/?requiredLogin=true" />
  }

}



export default PrivateRoute