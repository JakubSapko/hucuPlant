import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
  } from "@ant-design/icons";
import { Card } from "antd";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import { ICardProps } from "../types/plant";
import { SettingsPanel } from "./PlantCardPanels/SettingsPanel";

const {Meta} = Card;

const StyledCard = styled(Card)`
border-radius: 13%;
overflow: hidden;
z-index: 0;
max-width: 300px;
`;

interface ITab{
    cover: ReactNode;
    content: string | ReactNode | null;
}

const PlantCard: React.FC<ICardProps> = ({plant}) => {
    const [tab, setTab] = useState<ITab>({
        cover: <img alt={plant.name} src={plant.img}/>,
        content: <Meta title={plant.name} description={plant.description}></Meta>,
    });

    const switchToSettings = () => {
        const settings = {
            cover: null,
            content: <SettingsPanel plant={plant}/>,
        }
        setTab(settings);
    }

    const switchToEdit = () => {
        const edit = {
            cover: null,
            content: "Tu jest edit",
        }
        setTab(edit);
    }

    const switchToOverview = () => {
        const overview = {
            cover: <img alt={plant.name} src={plant.img}/>,
            content: <Meta title={plant.name} description={plant.description}></Meta>,
        }
        setTab(overview);
    }



    return (<StyledCard
        key={plant.id}
        cover={tab.cover}
        actions={[
            <SettingOutlined
              key="settings"
                onClick={() => switchToSettings()}
            />,
            <EditOutlined key="edit"
                onClick={() => switchToEdit()}
            />,
            <EllipsisOutlined key="ellipsis"
                onClick={() => switchToOverview()}
            />,
          ]}
    >
        {tab.content}
    </StyledCard>);
}

export default PlantCard;