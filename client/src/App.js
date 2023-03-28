import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import HousingPage from 'scenes/housingPage';
import RelicPage from 'scenes/relicPage';
import JobGuidePage from 'scenes/jobGuidePage';
import EncounterPage from 'scenes/encounterPage';


import { useMemo } from 'react';
import {useSelector} from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  const isAuth = Boolean(useSelector((state) => state.token));


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme ={theme}>
          <CssBaseline/>
          <Routes>
            <Route path = "/encounters" element={isAuth ? <EncounterPage /> : <Navigate to="/login" />} />
            <Route path = "/jobs" element={isAuth ? <JobGuidePage /> : <Navigate to="/login" />} />
            <Route path = "/relic" element={isAuth ? <RelicPage /> : <Navigate to="/login" />} />
            <Route path = "/housing" element={isAuth ? <HousingPage /> : <Navigate to="/login" />} />
            <Route path = "/login" element = {<LoginPage />} />
            <Route path = "/" element={isAuth ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
