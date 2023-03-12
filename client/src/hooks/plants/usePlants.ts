import { useQuery } from "@tanstack/react-query";
import { API, PlantKeys } from "../../services/api";
import { IPlant } from "../../types/plant";

export const usePlants = () => {
    const plantsQuery = useQuery({
        queryKey: ["Plants"],
        queryFn: () => {
            return API.get<IPlant[]>(PlantKeys.BASE);
        },
        onSuccess: (data) => {
            console.log("success", data);
        },
        onError: () => {
            console.log("ups");
        },
    });
    return plantsQuery;
};
