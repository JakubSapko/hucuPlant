import { Button } from "antd";
import React, {useState, useEffect} from "react";
import SideBar from "../components/SideBar";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  const {user, logOutUser, authTokens} = useAuthContext();
  const [plants, setPlants] = useState<any[]>([]);

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

  console.log(plants);
  return (
    <div className="flex">
      <SideBar/>
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

export default HomePage;