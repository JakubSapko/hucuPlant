import styled from "styled-components";
import photo from "../../static/bonsai.jpeg";

const StyledMainSection = styled.div`
    min-height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 33% 33%;
    font-family: "Poppins", sans-serif;
    max-height: fit-content;
`;

const StyledImg = styled.img`
    grid-row: 1 / span 2;
    grid-column: 2;
    size: auto;
`;
const RightSideTextContainer = styled.div`
    grid-column: 3;
    grid-row: 1;
    font-size: 2rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
`;

const LeftSideTextContainer = styled.div`
    grid-column: 1;
    grid-row: 2;
    font-size: 2rem;
    padding: 1rem;
    height: min-content;
`;

const LeftSideText = styled.div`
    animation-name: slideinLeft;
    animation-duration: 2.5s;

    @keyframes slideinLeft {
        from {
            transform: translateX(-100%);
        }

        to {
            transform: translateX(0%);
        }
    }
`;

const RightSideText = styled.div`
    animation-name: slideinRight;
    animation-duration: 2.5s;

    @keyframes slideinRight {
        from {
            transform: translateX(100%);
        }

        to {
            transform: translateX(0%);
        }
    }
`;

export const EmphasisedText = styled.p`
    color: #659e38;
    display: inline;
`;

export const LandingPageHome = () => {
    return (
        <StyledMainSection>
            <StyledImg src={photo} />
            <RightSideTextContainer>
                <RightSideText>
                    Take your plant care to the next level with{" "}
                    <EmphasisedText>hucuPlant!</EmphasisedText>
                </RightSideText>
            </RightSideTextContainer>
            <LeftSideTextContainer>
                <LeftSideText>
                    With our tool you'll never forget to water your plants
                    properly and managing your little forest will become a{" "}
                    <EmphasisedText> pure pleasure </EmphasisedText>
                </LeftSideText>
            </LeftSideTextContainer>
        </StyledMainSection>
    );
};
