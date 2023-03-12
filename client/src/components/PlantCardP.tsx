import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { ICardProps } from "../types/plant";
import { DeleteButton } from "./PlantCardUtils/DeleteButton";

const StyledContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: lightyellow;
`;

const CardContent = () => {
    return <StyledContainer>content</StyledContainer>;
};

const CardOptions = () => {
    return <StyledContainer>opcje</StyledContainer>;
};

const CardTabs = {
    CONTENT: <CardContent />,
    OPTIONS: <CardOptions />,
};

const StyledCard = styled.div`
    border-radius: 19px;
    overflow: hidden;
    z-index: 0;
    width: 300px;
    height: 30px;
    max-width: 300px;
    min-height: 350px;
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    background-color: lightgreen;
`;

const StyledHeader = styled.div`
    width: 100%;
    height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const StyledFooter = styled.div`
    width: 100%;
    background-color: lightblue;
    align-self: flex-end;
`;

const CardHeader = () => {
    return (
        <StyledHeader>
            <DeleteButton />
        </StyledHeader>
    );
};

const CardFooter = () => {
    return <StyledFooter>stopy</StyledFooter>;
};

export const PlantCardP: React.FC<ICardProps> = ({ plant }) => {
    const [tab, setTab] = useState<ReactNode>(CardTabs.CONTENT);

    const switchTabs = () => {
        if (tab === CardTabs.CONTENT) {
            setTab(CardTabs.OPTIONS);
            return;
        }
        setTab(CardTabs.CONTENT);
    };

    return (
        <StyledCard onClick={switchTabs}>
            <CardHeader />
            {tab}
            <CardFooter />
        </StyledCard>
    );
};
