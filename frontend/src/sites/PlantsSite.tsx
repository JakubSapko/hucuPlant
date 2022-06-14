import styled from "styled-components";
import PlantCard from "../components/PlantCard";
import { usePlantsContext } from "../context/PlantsContext";


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
`;

export const PlantsSite: React.FC = () => {
  const {plants} = usePlantsContext();
  return (
    <Wrapper>
      {plants?.map((plant) => {
        return (
            <PlantCard plant={plant}/>
        );
      })}
    </Wrapper>
  );
};
