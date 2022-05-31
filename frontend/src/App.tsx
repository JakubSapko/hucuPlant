import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<PrivateRoute outlet={<HomePage/>} isAuthenticated={true}/>}/>
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
