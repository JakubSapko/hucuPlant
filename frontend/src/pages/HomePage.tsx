import {useState, useEffect} from "react";
import SideBar from "../components/SideBar";
import { useAuthContext } from "../context/AuthContext";
import { DashboardSite, GroupsSite, PlantsSite } from "../sites";

const MainPage = () => {
  const {logOutUser, authTokens} = useAuthContext();
  const [plants, setPlants] = useState<any[]>([]);
  const [site, setSite] = useState<string>("dupa");

  useEffect(()=> {
    getPlants();
  }, [])

  const getPlants = async () => {
    let accessToken = authTokens?.access;
    const response = await fetch('http://localhost:8000/api/plants_data/', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(accessToken)
      }
    })
    let data = await response.json();

    if (response.status === 200){
      setPlants(data);
    } else if (response.statusText === 'Unauthorized'){
      logOutUser(); 
    }
  }

  const switchSite = () => {
    switch(site){
      case 'Plants':
        return <PlantsSite/>;
      case 'Dashboard':
        return <DashboardSite/>;
      case 'Groups':
        return <GroupsSite/>;
    }
  }

  console.log(plants);
  return (
    <div className="grid grid-cols-[8rem_1fr] grid-rows-1">
      <SideBar/>
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