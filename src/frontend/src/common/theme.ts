import { theme as baseTheme, themeConfig } from '@kmx/mui-resources';
import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

// Create an app-level theme that extends the base theme
const theme = createTheme(
    deepmerge(themeConfig, {
        ...baseTheme,
        components: {
            ...baseTheme.components,
            MuiFormControlLabel: {
                styleOverrides: {
                    label: {
                        lineHeight: 1.2,
                    },
                },
            },
        },
        defaultColorScheme: 'light',
        colorSchemes: { dark: false }
    })
);

export default theme;
