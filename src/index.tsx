import React from 'react';
import ReactDOM from 'react-dom/client';
import ListDetails from './components/ListDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import AddItem from './components/AddItem';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <Routes>
      <Route path='/add' element={<AddItem />}></Route>
      <Route path='/' element={<ListDetails />}></Route>
    </Routes>
  </Router>
);