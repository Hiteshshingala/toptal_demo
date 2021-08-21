  
import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Routers from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routers />
      <ToastContainer autoClose={1500} />
    </BrowserRouter>
  );
}

export default App;