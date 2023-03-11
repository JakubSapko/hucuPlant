import HomePage from "./pages/App/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthContextProvider } from "./context/AuthContext";
import { LandingPage } from "./pages/Landing/LandingPage";
import LandingPageLogIn from "./pages/Landing/LandingPageLogin";
import { message } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {contextHolder}
                <AuthContextProvider>
                    <Routes>
                        <Route
                            path="/home"
                            element={<PrivateRoute outlet={<HomePage />} />}
                        />
                        <Route element={<LandingPageLogIn />} path="/login" />
                        <Route element={<LandingPage />} path="/" />
                    </Routes>
                </AuthContextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
