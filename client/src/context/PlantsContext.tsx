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
  updateTracking: (plant: IPlant) => void;
}

const PlantsContext = createContext<IPlantsContext>({
  plants: null,
  updateTracking: (plant: IPlant) => {},
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

  const updateTracking = async (plant: IPlant) => {
    plant.tracked = !plant.tracked;
    let accessToken = authTokens?.access;
    const response: Response = await fetch(`http://localhost:8000/api/update_plant/${plant.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      },
      body: JSON.stringify({'id': plant.id, 'tracked': plant.tracked,})
    });
  }

  const plantsContextValue: IPlantsContext = {
    plants: plants,
    updateTracking: updateTracking
  };

  return (
    <PlantsContext.Provider value={plantsContextValue}>
      {children}
    </PlantsContext.Provider>
  );
};
