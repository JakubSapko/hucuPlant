import { Layout } from "antd";
import { useState, useEffect } from "react";
import styled from "styled-components";
import SideBar from "../../components/SideBar";
import { useAuthContext } from "../../context/AuthContext";
import { DashboardSite, GroupsSite, PlantsSite, NewPlantSite } from ".";
import { usePlants } from "../../hooks/plants/usePlants";

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

  const data = usePlants();
  console.log(data);

  // const getPlants = async () => {
  //   let accessToken = authTokens?.access;
  //   const response = await fetch("http://localhost:8000/api/data/", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + String(accessToken),
  //     },
  //   });
  //   let data = await response.json();

  //   if (response.status === 200) {
  //     setPlants(data);
  //   } else if (response.statusText === "Unauthorized") {
  //     logoutUser();
  //   }
  // };

  interface ISiteStates {
    [key: string]: JSX.Element
  }

  const SITE_STATES: ISiteStates= {
    dashboard: <DashboardSite/>,
    plants: <PlantsSite/>,
    groups: <GroupsSite/>,
    addplant: <NewPlantSite/>
  }

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
