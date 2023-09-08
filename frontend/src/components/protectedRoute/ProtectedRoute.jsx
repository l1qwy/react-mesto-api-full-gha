import React from "react";
import { Navigate } from "react-router-dom";

// export default function ProtectedRote({ component: Component, userEmail, ...props }) {

//   return(
//     <Route>
//       {
//         () => props.inLogged === true ? <Component { ...props } /> : <Redirect to='/logIn' />
//       }
//     </Route>

//   )
// }

export default function ProtectedRoute({
  element: Component,
  inLogged,
  ...props
}) {
  return inLogged ? (
    <Component {...props} />
  ) : (
    <Navigate to={'/sign-in'} replace />
  );
}
