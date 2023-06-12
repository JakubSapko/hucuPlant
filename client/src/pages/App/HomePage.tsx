import { Layout } from "antd";
import { useState, useEffect } from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar";
import { useAuthContext } from "../../context/AuthContext";
import { DashboardSite, GroupsSite, PlantsSite, NewPlantSite } from ".";
import { usePlants } from "../../hooks/plants/usePlants";
import { AccountConfigurationSite } from "./AccountConfigurationSite";

const StyledContent = styled(Layout.Content)`
    height: 100vh;
    overflow-y: scroll;
`;

const StyledSider = styled(Layout.Sider)`
    background-color: #52822e;
    color: #ed7d3a;
`;

const MainPage = () => {
    const [site, setSite] = useState<string>("plants");

    interface ISiteStates {
        [key: string]: JSX.Element;
    }

    const SITE_STATES: ISiteStates = {
        dashboard: <DashboardSite />,
        plants: <PlantsSite />,
        groups: <GroupsSite />,
        addplant: <NewPlantSite />,
        configure: <AccountConfigurationSite />,
    };

    return (
        <Layout>
            <StyledSider>
                <SideBar setSite={setSite} />
            </StyledSider>
            <StyledContent>{SITE_STATES[site]}</StyledContent>
        </Layout>
    );
};

export default MainPage;
