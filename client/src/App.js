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
            <Route path = "/encounters" element = {<EncounterPage />} />
            <Route path = "/jobs" element = {<JobGuidePage />} />
            <Route path = "/relic" element = {<RelicPage />} />
            <Route path = "/housing" element = {<HousingPage />} />
            <Route path = "/" element = {<HomePage />} />
            <Route path = "/login" element = {<LoginPage />} />
            <Route path="/profile/:userId" element = {<ProfilePage />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
