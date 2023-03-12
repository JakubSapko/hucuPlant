import { Layout, Menu } from "antd";
import { MenuItemType } from "rc-menu/lib/interface";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthContext";
import { LandingPageHome } from "./LandingPageHome";
import LandingPageLogIn from "./LandingPageLogin";
import { LandingPageOverview } from "./LandingPageOverview";
import { LandingPageSignUp } from "./LandingPageSignUp";

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
    && .ant-menu-item-selected::after {
        border-bottom: 2px solid #659e38 !important;
    }

    && .ant-menu-item:hover::after {
        border-bottom: 2px solid #659e38 !important;
    }
`;

export const LandingPage = () => {
    const [landingPageSubpage, setLandingPageSubpage] =
        useState<string>("home");

    const { isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    const links: Array<MenuItemType> = [
        {
            key: 1,
            label: "Home",
            style: {
                color: "black",
                transition: "none",
                border: "none",
            },
            onClick: () => {
                setLandingPageSubpage("home");
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
            onClick: () => {
                setLandingPageSubpage("overview");
            },
        },
        {
            key: 3,
            label: "Sign Up",
            style: {
                color: "black",
                transition: "none",
                border: "none",
            },
            onClick: () => {
                setLandingPageSubpage("signup");
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
            onClick: () => setLandingPageSubpage("login"),
        },
    ];

    const linksWhenSignedIn: Array<MenuItemType> = [
        {
            key: 1,
            label: "Home",
            style: {
                color: "black",
                transition: "none",
                border: "none",
            },
            onClick: () => {
                setLandingPageSubpage("home");
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
            onClick: () => {
                setLandingPageSubpage("overview");
            },
        },
        {
            key: 3,
            label: "Sign Up",
            style: {
                color: "black",
                transition: "none",
                border: "none",
            },
            onClick: () => {
                setLandingPageSubpage("signup");
            },
        },
        {
            key: 4,
            label: isAuthenticated ? "App" : "Log In",
            style: {
                color: "black",
                transition: "none",
                border: "none",
            },
            onClick: () => setLandingPageSubpage("login"),
        },
    ];

    const switchSubpage = () => {
        switch (landingPageSubpage) {
            case "home":
                return <LandingPageHome />;
            case "overview":
                return <LandingPageOverview />;
            case "signup":
                return <LandingPageSignUp />;
            case "login":
                return <LandingPageLogIn />;
            default:
                return <LandingPageHome />;
        }
    };

    return (
        <Layout style={{ minHeight: "100%" }}>
            <StyledHeader>
                <StyledTitle>hucuPlant</StyledTitle>
                <StyledMenu
                    mode="horizontal"
                    items={links}
                    style={{ float: "right" }}
                />
            </StyledHeader>
            <Content
                style={{
                    backgroundColor: "white",
                    minHeight: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                {switchSubpage()}
            </Content>
        </Layout>
    );
};
