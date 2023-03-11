import React, { Dispatch, SetStateAction } from "react";
import { RiPlantFill } from "react-icons/ri";
import { BsFillPieChartFill } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { GiPlantRoots } from "react-icons/gi";
import { Button } from "antd";
import styled from "styled-components";
import { useAuthContext } from "../context/AuthContext";

interface IIcon {
  icon: JSX.Element;
  text: string;
  name: string;
}

interface ISideBarProps {
  setSite: Dispatch<SetStateAction<string>>;
}

const StyledButton = styled(Button)`
  border: none;
  color: #f2e8cf !important;
  &:hover {
    color: #ed7d3a !important;
  }
  padding-left: 4.5rem;
  margin-top: 1.5rem;
`;

const SideBar: React.FC<ISideBarProps> = ({ setSite }) => {
  const { logoutUser } = useAuthContext();
  console.log("test");
  return (
    <div>
      <SideBarIcon
        icon={<RiPlantFill size="28" />}
        text="Check out your plants!"
        setSite={setSite}
        name="plants"
      />
      <SideBarIcon
        icon={<GiPlantRoots size="28" />}
        text="Add a new plant"
        setSite={setSite}
        name="addplant"
      />
      <SideBarIcon
        icon={<BsFillPieChartFill size="28" />}
        text="Statistics"
        setSite={setSite}
        name="dashboard"
      />
      <SideBarIcon
        icon={<MdGroups size="28" />}
        text="Groups"
        setSite={setSite}
        name="groups"
      />
      <StyledButton ghost onClick={() => logoutUser()}>
        Log Out
      </StyledButton>
    </div>
  );
};

const SideBarIcon: React.FC<IIcon & ISideBarProps> = ({
  icon,
  text,
  name,
  setSite,
}) => {
  return (
    <div className="sidebar-icon group" onClick={() => setSite(name)}>
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default SideBar;
