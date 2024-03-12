import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {frFR} from "@mui/material/locale"
import {createTheme, ThemeProvider} from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme(
    frFR
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);