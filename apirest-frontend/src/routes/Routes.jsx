import { Routes as RoutesManager, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function Routes() {
  return (
    <>
      <RoutesManager>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/cadastrar" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="/alterar/:userId" element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </RoutesManager>
    </>
  );
}

export default Routes;
