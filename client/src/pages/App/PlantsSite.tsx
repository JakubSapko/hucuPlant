import styled from "styled-components";
import { NoDataPlaceholder } from "../../components/NoDataPlaceholder";
import PlantCard from "../../components/PlantCard";
import { PlantCardP } from "../../components/PlantCardP";
import { usePlantsContext } from "../../context/PlantsContext";
import { usePlants } from "../../hooks/plants/usePlants";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
`;

const NoDataWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16rem;
    padding: 2rem;
`;

export const PlantsSite: React.FC = () => {
    const { data } = usePlants();
    return (
        <>
            {data?.length ? (
                <Wrapper>
                    {data.map((plant) => {
                        return <PlantCardP plant={plant} />;
                    })}
                </Wrapper>
            ) : (
                <NoDataWrapper>
                    <NoDataPlaceholder />
                </NoDataWrapper>
            )}
        </>
    );
};

// <>
//     { plants?.length ? {<Wrapper>  plants.map((plant) => {
//         return (
//             <PlantCard plant={plant}/>
//         );
//       })    </Wrapper> : <NoDataWrapper>

//         <NoDataPlaceholder/>
//         </NoDataWrapper>}
//   );
//   </>
