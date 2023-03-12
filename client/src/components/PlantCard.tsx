import { EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import { ICardProps } from "../types/plant";
import { DeleteButton } from "./PlantCardUtils/DeleteButton";
import { SettingsPanel } from "./PlantCardUtils/SettingsPanel";

const { Meta } = Card;

const StyledCard = styled(Card)`
    border-radius: 19px;
    overflow: hidden;
    z-index: 0;
    max-width: 300px;
    min-height: 350px;
`;

interface ITab {
    cover: ReactNode;
    content: string | ReactNode | null;
}

const PlantCard: React.FC<ICardProps> = ({ plant }) => {
    const [tab, setTab] = useState<ITab>({
        cover: (
            <img
                alt="Plant"
                src="https://img.freepik.com/free-vector/fern-branch-design-element_53876-119927.jpg?w=900&t=st=1678612666~exp=1678613266~hmac=e008aad24a726533f24d1a73cbe4b0873e66e0bc5d7e75154064739347cc7d82"
            />
        ),

        content: (
            <Meta title={plant.name} description={plant.description}></Meta>
        ),
    });

    const switchToSettings = () => {
        const settings = {
            cover: null,
            content: <SettingsPanel plant={plant} />,
        };
        setTab(settings);
    };

    const switchToOverview = () => {
        const overview = {
            cover: (
                <img
                    alt="Plant"
                    src="https://img.freepik.com/free-vector/fern-branch-design-element_53876-119927.jpg?w=900&t=st=1678612666~exp=1678613266~hmac=e008aad24a726533f24d1a73cbe4b0873e66e0bc5d7e75154064739347cc7d82"
                />
            ),
            content: (
                <Meta title={plant.name} description={plant.description}></Meta>
            ),
        };
        setTab(overview);
    };

    return (
        <StyledCard
            key={plant.name}
            cover={tab.cover}
            actions={[
                <EllipsisOutlined
                    key="ellipsis"
                    onClick={() => switchToOverview()}
                />,
                <SettingOutlined
                    key="settings"
                    onClick={() => switchToSettings()}
                />,
            ]}
            extra={<DeleteButton />}
        >
            {tab.content}
        </StyledCard>
    );
};

export default PlantCard;
