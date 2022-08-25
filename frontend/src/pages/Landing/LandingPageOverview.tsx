import styled from "styled-components";
import { EmphasisedText } from "./LandingPageHome";

const StyledTitle = styled.div`
    font-family: "Poppins", sans-serif;
    font-size: 2rem;
`



export const LandingPageOverview: React.FC = () => {

    return <>
        <StyledTitle> A brief introduction on <EmphasisedText>why</EmphasisedText> </StyledTitle>
        <>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui rerum praesentium ullam provident dolores, eveniet, numquam mollitia quisquam, culpa ducimus dicta deserunt repellat corrupti voluptatem vel deleniti error vitae. Incidunt?</>
    </>
}