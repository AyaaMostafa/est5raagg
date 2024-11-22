import React from 'react';

import UploadImage from './Components/UploadImage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// @ts-ignore
function App() {
  return (
    <Router>
      <Routes>
     
      <Route path="/uploadImage" element={<UploadImage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
