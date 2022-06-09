
import { BrowserRouter, Route} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css';

import Grants from './pages/grants';
import Proposals from './pages/proposals';
import Help from './pages/help';
import Landing from './pages/landing';

import Dashboard from './pages/dashboard';
import Navbar from './components/Navbar/navbar';

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element = {<Landing />}> </Route>
          <Route path="/Dashboard" element = {<Dashboard/>}> </Route>
          <Route path="/Proposals" element = {<Proposals/>}> </Route>
          <Route path="/Grants" element = {<Grants/>}> </Route>
          <Route path="/Help" element = {<Help />}> </Route>
      </Routes>
    </>
  );
}

export default App;
