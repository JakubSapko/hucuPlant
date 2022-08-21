import { Layout, Menu } from "antd";
import { MenuItemType } from "rc-menu/lib/interface";
import styled from "styled-components";

const { Header, Content } = Layout;

const StyledHeader = styled(Header)`
  background-color: white;
`;

const StyledTitle = styled.div`
  color: #659e38;
  font-family: "Poppins", sans-serif;
  margin-top: 0.5rem;
  font-size: 2.3rem;
  width: fit-content;
  float: left;
`;

const StyledMenu = styled(Menu)`
    margin-top: 0.5rem;
    border-bottom-style: none;
    float: right;
`


const links: Array<MenuItemType> = [{key: 1, label: "dupa"}];

export const LandingPage: React.FC = () => {
  return (
    <>
      <Layout>
        <StyledHeader>
        <StyledTitle>hucuPlant</StyledTitle>
          <StyledMenu
            mode="horizontal"
            items={links}
          />
        </StyledHeader>
        <Content></Content>
      </Layout>
    </>
  );
};
