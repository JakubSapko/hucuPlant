import styled from "styled-components";
const plant_img = require('../../static/bonsai.jpeg');

const StyledMainSection = styled.div`
    min-height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 33% auto;
    font-family: "Poppins", sans-serif;
    max-height: fit-content;
`;

const StyledImg = styled.img`
  grid-column: 2;
  size: auto;  
`
const RightSideText = styled.div`
  grid-column: 3;
  grid-row: 1;
  font-size: 2rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
`

const LeftSideText = styled.div`
  grid-column: 1;
  grid-row: 2;
  font-size: 2rem;
  padding: 1rem;
  height: min-content;
`;

const EmphasisedText = styled.p`
  color: #659e38;
`;

export const LandingPageHome = () => {
  return (
    <StyledMainSection>
      <StyledImg src={plant_img}/>
      <RightSideText>Take your plant care to the next level with <EmphasisedText>hucuPlant!</EmphasisedText></RightSideText>
      <LeftSideText>With our tool you'll never forget to water your plants properly and managing your little forest will become a <EmphasisedText> pure pleasure </EmphasisedText></LeftSideText>
    </StyledMainSection>
  );
};
