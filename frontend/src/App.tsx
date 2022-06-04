import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthContextProvider } from "./context/AuthContext";

function App() {

  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route
              path="/home"
              element={
                <PrivateRoute outlet={<HomePage />} />
              }
            />
            <Route element={<LoginPage />} path="/login" />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
