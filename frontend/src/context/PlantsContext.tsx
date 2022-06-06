import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { useAuthContext } from "./AuthContext";

interface IPlant {
  user: number;
  id: number;
  name: string;
  plant_species: string;
  description: string;
  date_added: string;
  how_often: number;
  last_watered: number;
  img: string;
}

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
  const { authTokens, logOutUser } = useAuthContext();

  const [plants, setPlants] = useState<IPlant[] | null>(null);

  useEffect(()=> {
      getPlants();
    }, [])

  const getPlants = async () => {
    let accessToken = authTokens?.access;
    const response = await fetch("http://localhost:8000/api/plants_data/", {
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
      logOutUser();
    }
  };

  const plantsContextValue: IPlantsContext = {
    plants: plants,
  };

  console.log(plants);
  return (
    <PlantsContext.Provider value={plantsContextValue}>
      {children}
    </PlantsContext.Provider>
  );
};
