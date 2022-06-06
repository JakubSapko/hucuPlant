import React from "react";
import { RiPlantFill } from "react-icons/ri";
import { BsFillPieChartFill } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { Button } from "antd";
import { useAuthContext } from "../context/AuthContext";

interface IIcon {
  icon: JSX.Element;
  text: string;
}
const SideBar: React.FC = () => {
  const { logOutUser } = useAuthContext();

  return (
    <div className="fixed col-start1 col-end-1 top-0 left-0 h-screen w-32 m-0 flex flex-col bg-primary text-contrast shadow-lg">
      <SideBarIcon
        icon={<RiPlantFill size="28" />}
        text="Check out your plants!"
      />
      <SideBarIcon icon={<BsFillPieChartFill size="28" />} text="Statistics" />
      <SideBarIcon icon={<MdGroups size="28" />} text="Groups" />
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

const SideBarIcon: React.FC<IIcon> = ({ icon, text }) => {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default SideBar;
