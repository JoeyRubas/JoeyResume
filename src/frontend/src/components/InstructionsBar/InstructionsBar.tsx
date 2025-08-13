import { AppBar, Stack } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import InstructionsDrawer from "./InstructionsDrawer/InstructionsDrawer";

export function InstructionsBar() {
    return (
        <AppBar sx={{ p: 0 }} position='static' data-testid='app-bar' color='default'>
            <Toolbar sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '100%',
            }}>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} data-testid='app-bar-title'>
                    CarMax Technology Academy - Front-End Engineering 2025
                </Typography>
                <Stack alignItems='center' direction='row' spacing={2}>
                    <InstructionsDrawer />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
