import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Grants from './pages/grants';
import Proposals from './pages/proposals';
import Help from './pages/help';
import Loading from './pages/loading';

import Dashboard from './pages/dashboard';
import ProposalsApp from './pages/proposalsApp';
import GrantsApp from './pages/GrantsApp';

import Layout from './layouts/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/loading" element={<Loading />}/>
                <Route element={<Layout />} >
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/proposals" element = {<Proposals />}>
                        <Route path="application" element = {<ProposalsApp/>} />
                    </Route>
                    <Route path="/grants" element = {<Grants />}>
                        <Route path="application" element = {<GrantsApp/>}> </Route>
                    </Route>
                    <Route path="/help" element = {<Help />}> </Route>
                </Route>
            </Routes>
        </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
