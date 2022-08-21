import { Layout, Menu } from "antd";
import { MenuItemType } from "rc-menu/lib/interface";
import React from "react";
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
`;

const links: Array<MenuItemType> = [
  {
    key: 1,
    label: "Home",
    style: {
      color: "black",
      transition: "none",
      border: "none",
    },
  },
  {
    key: 2,
    label: "Overview",
    style: {
      color: "black",
      transition: "none",
      border: "none",
    },
  },
  {
    key: 3,
    label: "Signup",
    style: {
      color: "black",
      transition: "none",
      border: "none",
    },
  },
  {
    key: 4,
    label: "Log In",
    style: {
      color: "black",
      transition: "none",
      border: "none",
    },
  },
];

type ContentChildren = {
    children?: React.ReactElement
}
export const LandingPageLayout = (props: ContentChildren) => {
  return (
    <>
      <Layout>
        <StyledHeader>
          <StyledTitle>hucuPlant</StyledTitle>
          <StyledMenu mode="horizontal" items={links} style={{float: 'right'}} />
        </StyledHeader>
        <Content style={{backgroundColor: "white"}}>
            {props.children}
        </Content>
      </Layout>
    </>
  );
};
