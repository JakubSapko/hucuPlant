import styled from "styled-components";
import { NoDataPlaceholder } from "../../components/NoDataPlaceholder";
import PlantCard from "../../components/PlantCard";
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
                        return <PlantCard key={plant.id} plant={plant} />;
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
