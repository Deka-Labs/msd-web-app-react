import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";



import Home from './pages/Home'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

import Map from './pages/cache/Map';
import MyMap from './pages/cache/MyMap';
import Add from './pages/cache/Add';
import Edit from './pages/cache/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />

        <Route path="/cache">
          <Route index element={<Map />} />
          <Route path='my' element={<MyMap />} />
          <Route path='add' element={<Add />} />
          <Route path='edit/:id' element={<Edit />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
