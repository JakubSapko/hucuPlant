import {
    useState,
    useEffect,
    useContext,
    createContext,
    ReactNode,
} from "react";
import { IPlant } from "../types/plant";
import { useAuthContext } from "./AuthContext";

interface IPlantsContext {
    plants: IPlant[] | null;
}

const PlantsContext = createContext<IPlantsContext>({
    plants: null,
});

export const usePlantsContext = () => {
    const context = useContext(PlantsContext);

    return context;
};

type PlantsContextProviderProps = {
    children: ReactNode;
};

export const PlantsContextProvider = ({
    children,
}: PlantsContextProviderProps) => {
    const { authTokens, logoutUser } = useAuthContext();

    const [plants, setPlants] = useState<IPlant[] | null>(null);

    useEffect(() => {
        getPlants();
    }, []);

    const getPlants = async () => {
        let accessToken = authTokens;
        const response = await fetch("http://localhost:8000/api/data/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(accessToken),
            },
        });
        let data = await response.json();

        if (response.status === 200) {
            setPlants(data);
        } else if (response.statusText === "Unauthorized") {
            logoutUser();
        }
    };

    const plantsContextValue: IPlantsContext = {
        plants: plants,
    };

    return (
        <PlantsContext.Provider value={plantsContextValue}>
            {children}
        </PlantsContext.Provider>
    );
};
