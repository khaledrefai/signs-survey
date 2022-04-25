import React from 'react';
 import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.rtl.css';
import{Home} from './home'
import{Admin} from './Admin'
import { Routes, Route } from "react-router-dom";
import { Avg } from './Avg';

function App() {
 
 
    return (
      <div className="container-fluid">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="average" element={<Avg />} />
      </Routes>
        </div>
    );
}

export default App;