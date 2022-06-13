import { Card } from "antd";
import styled from "styled-components";
import PlantCard from "../components/PlantCard";
import { mockData } from "./plantsMockData";
const { Meta } = Card;


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
`;

export const PlantsSite: React.FC = () => {
  return (
    <Wrapper>
      {mockData.map((plant) => {
        return (
            <PlantCard plant={plant}/>
        );
      })}
    </Wrapper>
  );
};
