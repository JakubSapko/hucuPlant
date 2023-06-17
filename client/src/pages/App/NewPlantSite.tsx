import { Button, Form, Input, InputNumber, message } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthContext";
import { API, PlantKeys } from "../../services/api";

interface PlantFormValues {
    plantName: string;
    plantDescription: string;
    waterFreq: number;
}
const PlantFormContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25%;
    gap: 2rem;
`;

const PlantForm = styled(Form<PlantFormValues>)`
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const NewPlantSite: React.FC = () => {
    const { user } = useAuthContext();
    const [api, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onFinish = (values: PlantFormValues) => {
        setIsLoading(true);
        const plantCreationPayload = {
            name: values.plantName,
            description: values.plantDescription,
            waterFreq: values.waterFreq,
            userId: user?.id,
        };
        try {
            API.post(PlantKeys.BASE, plantCreationPayload);
            api.success("Plant created successfully!");
        } catch (error) {
            api.error("Sorry, something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            {contextHolder}
            <PlantFormContainer>
                <h1>Add a new plant to your collection!</h1>
                <PlantForm onFinish={onFinish}>
                    <Form.Item name="plantName" label="Plant Name">
                        <Input placeholder="Plant Name" />
                    </Form.Item>
                    <Form.Item
                        name="plantDescription"
                        label="Plant Description"
                    >
                        <Input placeholder="Plant Description" />
                    </Form.Item>
                    <Form.Item name="waterFreq" label="Watering frequency">
                        <InputNumber
                            placeholder="How often do you water this plant? (days)"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Add Plant
                        </Button>
                    </Form.Item>
                </PlantForm>
            </PlantFormContainer>
        </>
    );
};
