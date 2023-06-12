import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../context/AuthContext";
import { API, PlantKeys } from "../../services/api";
import { MessageInstance } from "antd/lib/message";

export const useDeletePlant = (messageApi: MessageInstance) => {
    const queryClient = useQueryClient();
    const { user } = useAuthContext();
    const deletePlant = useMutation({
        mutationFn: (plantId: number) => {
            return API.delete(PlantKeys.BASE, { id: user?.id }, plantId);
        },
        onSuccess: (responseData) => {
            messageApi.success("Plant successfully deleted!");
            queryClient.invalidateQueries(["Plants"]);
        },
        onError: () => {
            messageApi.error("Something went wrong!");
        },
    });
    return deletePlant;
};
