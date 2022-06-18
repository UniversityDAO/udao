
import { Route} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import './App.css';

import Grants from './pages/grants';
import Proposals from './pages/proposals';
import Help from './pages/help';
import Landing from './pages/landing';

import Dashboard from './pages/dashboard';
import ProposalsApp from './pages/proposalsApp';
import GrantsApp from './pages/GrantsApp';

import WithNav from './layouts/WithNav';
import WithoutNav from './layouts/WithoutNav';


function App() {
  // We'll need a react Router here (or in index.js) to navigate between pages
  // essentially our app can be a single-page app that just renders different UI on different route
  // react-router will handle this: reactrouter.com
  return (
    <>
      <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/" element={<Landing />} />
          </Route>
          <Route element={<WithNav />} >
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Proposals" element = {<Proposals/>}> </Route>
            <Route path="/Proposals/Application" element = {<ProposalsApp/>}> </Route>
            <Route path="/Grants/Application" element = {<GrantsApp/>}> </Route>
            <Route path="/Grants" element = {<Grants/>}> </Route>
            <Route path="/Help" element = {<Help />}> </Route>
          </Route>
      </Routes>
    </>
  );
}

export default App;
