import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from "../../common/theme.ts";
import Footer from "../../components/Footer/Footer.tsx";
import NavBar from "../../components/NavigationBar/NavigationBar.tsx";
import MainWrapper from "../../components/layout/MainWrapper/MainWrapper.tsx";
import ProjectWrapper from "../../components/layout/ProjectWrapper/ProjectWrapper.tsx";
import AppWrapper from "../../components/layout/AppWrapper/AppWrapper.tsx";

function RootPage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppWrapper>
                <ProjectWrapper>
                    <NavBar />
                    <MainWrapper>
                        <Outlet />
                    </MainWrapper>
                    <Footer />
                </ProjectWrapper>
            </AppWrapper>
        </ThemeProvider>
    )
}

export default RootPage;
