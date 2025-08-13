import React from 'react';
import { Outlet } from '@tanstack/react-router';
import {InstructionsBar} from "../../components/InstructionsBar/InstructionsBar";
import { CssBaseline, ThemeProvider } from '@mui/material';
import {theme} from "@kmx/mui-resources";
import Footer from "../../components/Footer/Footer.tsx";
import NavBar from "../../components/NavigationBar/NavigationBar.tsx";
import MainWrapper from "../../components/layout/MainWrapper/MainWrapper.tsx";
import ProjectWrapper from "../../components/layout/ProjectWrapper/ProjectWrapper.tsx";
import AppWrapper from "../../components/layout/AppWrapper/AppWrapper.tsx";
import { showInstructions } from "../../utilities/envUtils.ts";

function RootPage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppWrapper>
                {showInstructions && <InstructionsBar />}
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
