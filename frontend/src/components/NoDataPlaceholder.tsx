import styled from "styled-components";
import '../index.css'

export const NoDataPlaceholder: React.FC = () => {

    const StyledTitle = styled.h1`
        font-family: 'Josefin Sans', sans-serif;
        font-size: 3rem;
    `;

    const StyledNote = styled.h2`
        font-family: 'Josefin Sans', sans-serif;
        font-size: 1rem;
    `;
    
    const Wrapper = styled.div`
        text-align: center;
    `;

    return <Wrapper>
        <StyledTitle>
            It seems that you have no plants added!
        </StyledTitle>
        <StyledNote>
            Try adding some of your green friends in the side panel.
        </StyledNote>
    </Wrapper>
}