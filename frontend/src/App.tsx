import HomePage from "./pages/App/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { LandingPage } from "./pages/Landing/LandingPage";
import LandingPageLogIn from "./pages/Landing/LandingPageLogin";

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
            <Route element={<LandingPageLogIn />} path="/login" />
            <Route element={<LandingPage/>} path="/"/>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
  );
}

export default App;
