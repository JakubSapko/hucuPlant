import { useQuery } from "@tanstack/react-query"

const usePlants = () => {
    const plantsQuery = useQuery([], async () => {});
    return plantsQuery;
}