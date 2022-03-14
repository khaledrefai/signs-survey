import React from 'react';
 import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.rtl.css';
import{Home} from './home'
import{Admin} from './Admin'
import { Routes, Route, Link } from "react-router-dom";

function App() {
 
 
    return (
      <div className="container-fluid">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
        </div>
    );
}

export default App;