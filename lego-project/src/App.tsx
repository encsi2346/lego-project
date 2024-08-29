import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import Layout from "@/components/Layout";
import RegisterPage from "@/pages/RegisterPage";
import axios from "axios";
import ProfilePage from "@/pages/ProfilePage";
import CreationNewPage from "@/pages/CreationNewPage";
import CreationViewPage from "@/pages/CreationViewPage";
import {useSelector} from 'react-redux';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {createTheme} from '@mui/material/styles';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {Suspense, useMemo} from 'react';
import useLocaleLoader from "@/hooks/useLocaleLoader";
import {themeSettings} from "@/theme";

axios.defaults.baseURL = 'http://localhost:3001/api';
axios.defaults.withCredentials = true;

const App = () => {
    const locale = useLocaleLoader();

    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <div className={mode === 'light' ? 'background-light' : 'background-dark'}>
            <Suspense fallback={null}>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                        <BrowserRouter>
                            <CssBaseline/>
                            <Routes>
                                <Route path="/" element={<Layout/>}>
                                    <Route index element={<LandingPage/>}/>
                                    <Route path="/login" element={<LoginPage/>}/>
                                    <Route path="/register" element={<RegisterPage/>}/>
                                    <Route path="/account" element={<ProfilePage/>}/>
                                    <Route path="/creations/new" element={<CreationNewPage/>}/>
                                    <Route path="/creations/:id" element={<CreationViewPage/>}/>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </LocalizationProvider>
                </ThemeProvider>
            </Suspense>
        </div>
    );
};

export default App
