import { useQuery } from "@tanstack/react-query";
import { API, PlantKeys } from "../../services/api";

export const usePlants = () => {
    // const plantsQuery = useQuery({
    //     queryKey: ["Plants"],
    //     queryFn: () => {
    //         API.get(PlantKeys.BASE);
    //     },
    //     onSuccess: () => {
    //         console.log("success")
    //     },
    //     onError: () => {
    //         console.log("ups")
    //     }
    // });
    // return plantsQuery;
    return API.get(PlantKeys.BASE);
};
