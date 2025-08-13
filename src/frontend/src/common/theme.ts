import { createTheme } from "@mui/material/styles";

// Create an app-level theme using standard MUI theming
const theme = createTheme({
    palette: {
        mode: 'light',
    },
    components: {
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    lineHeight: 1.2,
                },
            },
        },
    },
});

export default theme;
