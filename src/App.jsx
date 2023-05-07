import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

import Home from "./pages/Home/Home";

const App = () => {

  const AppWrapper = () => {
    let routes = useRoutes([
      { path: "/", element: <Home /> },
    ]);
    return routes;
  };

  return (
    <div className="app">
      <Router>
        <AppWrapper />
      </Router>    </div>  
  );
};

export default App;
