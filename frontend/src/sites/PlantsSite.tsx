import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import styled from "styled-components";

const example = require("../imgs/example.jpeg");
const { Meta } = Card;

// interface IPlant {
//   user: number;
//   id: number;
//   name: string;
//   plant_species: string;
//   description: string;
//   date_added: string;
//   how_often: number;
//   last_watered: number;
//   img: string;
// }

const mockData = [
  {
    user: 1,
    id: 1,
    name: "Test1",
    plant_species: "asd",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quos exercitationem modi, accusamus quas qui iure debitis nemo aliquid quaerat iste aliquam quisquam hic numquam praesentium laudantium fugiat voluptatibus est!",
    date_added: "2022-06-02",
    how_often: 3,
    last_watered: 1,
    img: "",
  },
  {},
];

const StyledCard = styled(Card)`
  border-radius: 10%;
  overflow: hidden;
  z-index: 0;
  position: absolute;
`;

export const PlantsSite: React.FC = () => {
  return (
    <div className="col-start-2 col-end-2 row-auto bg-olive min-h-screen">
      <div className="m-4 z-0">
        <StyledCard
          className="w-72"
          cover={<img alt="plant_name" src={example} />}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta title="Card title" description="This is description" />
        </StyledCard>
      </div>
    </div>
  );
};
