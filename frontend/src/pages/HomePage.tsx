import {useState, useEffect} from "react";
import SideBar from "../components/SideBar";
import { DashboardSite, GroupsSite, PlantsSite } from "../sites";

const MainPage = () => {
  const [site, setSite] = useState<string>("dupa");

  const switchSite = () => {
    switch(site){
      case 'Plants':
        return <PlantsSite/>;
      case 'Dashboard':
        return <DashboardSite/>;
      case 'Groups':
        return <GroupsSite/>;
      default: 
        return <PlantsSite/>;
    }
  }

  return (

    <div className="grid grid-cols-[8rem_1fr] grid-rows-1">
      <SideBar setSite={setSite}/>
      {switchSite()}
      {/* {user && <Button onClick={logOutUser}>Log Out</Button>}
      {user && <p> Hello {user?.username}</p>}
      <p>You are logged to the home page</p>
      
      <ul>
      {plants.map(plant => (
        <li key={plant.id}>{plant.description}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default MainPage;