import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";


export const useLogout = () => {
    const {setAuthTokens, setUser} = useAuthContext();
    const navigate = useNavigate();

    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/", { replace: true });
}