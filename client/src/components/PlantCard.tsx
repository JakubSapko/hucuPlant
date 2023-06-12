import { ReactNode } from "react";
import styled from "styled-components";
import { ICardProps } from "../types/plant";
import { DeleteButton } from "./PlantCardUtils/DeleteButton";

const StyledCard = styled.div`
    border-radius: 14px;
    border: 1px solid #52822e;
    overflow: hidden;
    z-index: 0;
    width: 15rem;
    height: 100%;
`;

const PhotoContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const DataContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PlantCard: React.FC<ICardProps> = ({ plant }) => {
    console.log(plant);
    return (
        <StyledCard>
            <DeleteButton />
            <PhotoContainer>
                <img
                    alt="Plant"
                    src="https://img.freepik.com/free-vector/fern-branch-design-element_53876-119927.jpg?w=900&t=st=1678612666~exp=1678613266~hmac=e008aad24a726533f24d1a73cbe4b0873e66e0bc5d7e75154064739347cc7d82"
                />
            </PhotoContainer>
            <DataContainer>
                <h1>{plant.name}</h1>
                <p>{plant.description}</p>
                <p>Should be watered every: {plant.waterFreq} day(s)</p>
            </DataContainer>
        </StyledCard>
    );
};

export default PlantCard;
