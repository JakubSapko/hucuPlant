import React from 'react';
import {RiPlantFill} from "react-icons/ri";
import {BsFillPieChartFill} from "react-icons/bs";
import {MdGroups} from "react-icons/md";

interface IIcon{
    icon: JSX.Element;
}
const SideBar: React.FC = () => {
    return (
    <div className='fixed top-0 left-0 h-screen w-32 m-0 flex flex-col bg-primary text-contrast shadow-lg'>
        <SideBarIcon icon={<RiPlantFill size="28"/>} />
        <SideBarIcon icon={<BsFillPieChartFill size="28"/>}/>
        <SideBarIcon icon={<MdGroups size="28"/>}/>
    </div>
    );
};

const SideBarIcon: React.FC<IIcon> = ({icon}) => {
    return <div className="sidebar-icon">
        {icon}
    </div>
};

export default SideBar;