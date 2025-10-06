import React from 'react';
import {BrowserRouter} from "react-router-dom";
import PublicRoutes from './routing/publicRoutes/PublicRoutes';
import { useState } from 'react'
import './App.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <PublicRoutes/>
      </BrowserRouter>
    </>
  );
};

export default App;