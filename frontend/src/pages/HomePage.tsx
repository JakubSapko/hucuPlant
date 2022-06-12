import { Layout } from "antd";
import { useState, useEffect } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import { useAuthContext } from "../context/AuthContext";
import { DashboardSite, GroupsSite, PlantsSite } from "../sites";

const StyledContent = styled(Layout.Content)`
  height: 100vh;
  overflow-y: scroll;
`;

const StyledSider = styled(Layout.Sider)`
  background-color: #1b6000;
  color: #ed7d3a;
`;


const MainPage = () => {
  const { logOutUser, authTokens } = useAuthContext();
  const [plants, setPlants] = useState<any[]>([]);
  const [site, setSite] = useState<string>("");

  useEffect(() => {
    getPlants();
  }, []);

  const getPlants = async () => {
    let accessToken = authTokens?.access;
    const response = await fetch("http://localhost:8000/api/plants_data/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(accessToken),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setPlants(data);
    } else if (response.statusText === "Unauthorized") {
      logOutUser();
    }
  };

  const switchSite = () => {
    switch (site) {
      case "Plants":
        return <PlantsSite />;
      case "Dashboard":
        return <DashboardSite />;
      case "Groups":
        return <GroupsSite />;
      default:
        return <PlantsSite />;
    }
  };

  return (
    <Layout>
      <StyledSider>
        <SideBar setSite={setSite} />
      </StyledSider>
      <StyledContent>{switchSite()}</StyledContent>
    </Layout>
  );
};

export default MainPage;
