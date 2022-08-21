import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { LandingPage } from "./pages/LandingPage";

function App() {

  return (
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
            <Route element={<LandingPage/>} path="/"/>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
  );
}

export default App;
