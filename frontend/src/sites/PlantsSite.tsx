import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import styled from "styled-components";
import { mockData } from "./plantsMockData";
const { Meta } = Card;


const StyledCard = styled(Card)`
  border-radius: 13%;
  overflow: hidden;
  z-index: 0;
  max-width: 300px;
  /* position: absolute; */
  /* max-height: 600px; */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
`;

export const PlantsSite: React.FC = () => {
  return (
    <Wrapper>
      
     {/* <div className="col-start-2 col-end-2 row-auto bg-olive min-h-screen z-0 h-full max-w-screen flex flex-row justify-around flex-wrap"> */}
        {mockData.map((plant) => {
          return (
            <div className="">
                <StyledCard
                cover={<img alt={plant.name} src={plant.img} />}
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                >
                <Meta title={plant.name} description={plant.description} />
                </StyledCard>
            </div>
          );
        })}
      {/* </div> */}
    </Wrapper>

  );
};
