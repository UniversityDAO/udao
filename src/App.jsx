import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router} from 'react-router-dom';
import './css/Pages.css';
import Install from './components/Install';
import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';
import Grants from './pages/Grants';
import Help from './pages/Help';
import New_Proposal from './pages/New_Proposal';
import New_Grant from './pages/New_Grant';
import View_Proposal from './pages/View_Proposal';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Dashboard/>}></Route>
        <Route path='/proposals' element={<Proposals/>}></Route>
        <Route path='/grants' element={<Grants/>}></Route>
        <Route path='/help' element={<Help/>}></Route>
        <Route path='/new_proposal' element={<New_Proposal/>}></Route>
        <Route path='/new_grant' element={<New_Grant/>}></Route>
        <Route path='/view_proposal' element={<View_Proposal/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
