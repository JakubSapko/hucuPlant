import React, { Dispatch, SetStateAction } from "react";
import { RiPlantFill } from "react-icons/ri";
import { BsFillPieChartFill } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { Button } from "antd";
import { useAuthContext } from "../context/AuthContext";

interface IIcon {
  icon: JSX.Element;
  text: string;
  name: string;
}

interface ISideBarProps {
    setSite: Dispatch<SetStateAction<string>>;
}


const SideBar: React.FC<ISideBarProps> = ({setSite}) => {
  const { logOutUser } = useAuthContext();

  return (
    <div className="fixed col-start1 col-end-1 top-0 left-0 h-screen w-32 m-0 flex flex-col bg-primary text-contrast shadow-lg z-10">
      <SideBarIcon
        icon={<RiPlantFill size="28" />}
        text="Check out your plants!"
        setSite={setSite}
        name="Plants"
      />
      <SideBarIcon icon={<BsFillPieChartFill size="28" />} text="Statistics" setSite={setSite} name="Dashboard"/>
      <SideBarIcon icon={<MdGroups size="28" />} text="Groups" setSite={setSite} name="Groups"/>
      <div className="pl-9 pt-10">
        <Button
          ghost
          className="text-content hover:text-contrast"
          onClick={logOutUser}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

const SideBarIcon: React.FC<IIcon & ISideBarProps> = ({ icon, text, name, setSite }) => {
  return (
    <div className="sidebar-icon group" onClick={() => setSite(name)}>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default SideBar;
