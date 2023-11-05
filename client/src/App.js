import {BrowserRouter as Router, Navigate, Routes, Route} from 'react-router-dom'
import { CssBaseline, ThemeProvider } from "@mui/material";
import blueTheme from 'theme';
import Home from 'pages/home'
import Login from 'pages/login'
import Profile from 'pages/profile'
import Nav from 'pages/nav'
import { useSelector } from 'react-redux';
import ProfilePage from 'pages/profile';

function App() {

  const isLogged = Boolean(useSelector(state => state.token))
  return (

    <div className="app">
     <Router>
     <ThemeProvider theme={blueTheme}>
          <CssBaseline />
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/home*' element={isLogged ? <Home /> : <Navigate to="/" />} />
        <Route path='/profile/:userId' element={isLogged ? <ProfilePage /> : <Navigate to="/" />} />
      </Routes>
      </ThemeProvider>
     </Router>
    </div>
    
  );
}

export default App;
